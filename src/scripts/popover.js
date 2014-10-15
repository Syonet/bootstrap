/**
 * syoPopover
 * ----------
 * Diretiva para criar um popover que abrirá ao interagir com o elemento (clique, mouseover, etc).
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	var module = ng.module( "syonet.popover", [] );
	var extend = ng.extend;

	module.directive( "syoPopover", [
		"$compile",
		"$rootScope",
		"$timeout",
		"$templatePromise",
		"$window",
		function( $compile, $rootScope, $timeout, $templatePromise, $window ) {
			var popovers = [];
			var definition = {};

			// Para cada popover que abre com click, devemos fechar quando houver click noutro lugar da janela
			$( $window ).on( "click blur", function() {
				popovers.forEach(function( popover ) {
					popover.close();
				});
			});

			definition.restrict = "A";
			definition.scope = {};

			definition.link = function( scope, element, attr ) {
				/* jshint shadow: true, unused: false */
				var $popover, popoverScope, controller, model;
				var loadedContent = false;
				var currentEvent = {
					in: "click",
					out: getOutEvent( "click" )
				};

				attr.$observe( "syoPopover", function( config ) {
					var mustBind = true;
					config = scope.$parent.$eval( config );

					// Se position não foi pasado, seta como top (padrão)
					config.position = config.position || "top";

					if ( !$popover ) {
						$popover = $( "<syo-popover-element></syo-popover-element>" );
						$popover.attr( "title", "title" );
						$popover.attr( "position", "position" );
						$popover.attr( "element", "element" );

						if ( !config.template && !config.templateUrl  ) {
							throw new Error( "Deve ser passada a opção 'template' ou a opção 'templateUrl'!" );
						}

						// Usa o escopo passado ou cria um novo a partir do raiz
						popoverScope = ( config.scope || $rootScope ).$new();
						popoverScope.element = element;

						// Estende o escopo com variáveis locais a partir da configuração
						ng.extend( popoverScope, config.locals );

						// Compila o popover agora e deixa pra setar o conteúdo apenas quando for abrir
						$popover = $compile( $popover )( popoverScope );
						controller = $popover.controller( "syoPopoverElement" );
						controller.callbacks.open = config.onOpen;
						controller.callbacks.close = config.onClose;
						controller.popoverScope = popoverScope;

						popoverScope.$popover = controller;
					} else {
						if ( scope.event !== currentEvent.in ) {
							element.off( currentEvent.in );
							element.off( currentEvent.out );
						} else {
							mustBind = false;
						}
					}

					extend( popoverScope, config );
					model = String( config.model );
					popoverScope.event = String( popoverScope.event || "click" );

					currentEvent.in = popoverScope.event;
					currentEvent.out = getOutEvent( currentEvent.in );

					// Se devemos bindar os eventos de abrir/fechar o popover, fazemos isso agora
					if ( mustBind ) {
						if ( currentEvent.in !== currentEvent.out ) {
							element.on( currentEvent.in, open );
							element.on( currentEvent.out, close );
						} else {
							element.on( currentEvent.in, function( evt ) {
								popovers.push( controller );
								controller.isOpen() ? close( evt ) : open( evt );
							});
						}
					}
				});

				// Eventos DOM
				// ---------------------------------------------------------------------------------
				element.parents().on( "scroll", close );
				$( $window ).on( "scroll", reposition );
				element.parents().add( $window ).on( "resize", reposition );

				// Scope Watches
				// ---------------------------------------------------------------------------------
				// Aguarda o elemento ficar visível/invísivel
				scope.$watch(function popoverVisibilityWatcher() {
					// Retorna true apenas pra não cair no if do listener
					return $popover ? element.is( ":visible" ) : true;
				}, function( visible ) {
					if ( !visible ) {
						controller.close();
					}
				});

				// Aguarda o elemento ser reposicionado
				scope.$watch(function popoverOffsetWatcher() {
					return element.offset();
				}, function( newOffset, oldOffset ) {
					if ( !ng.equals( newOffset, oldOffset ) ) {
						reposition();
					}
				}, true );

				scope.$on( "$destroy", function() {
					controller.destroy();
				});

				// Funções utilitárias
				// ---------------------------------------------------------------------------------
				// Abre o popover. Se o conteúdo do mesmo ainda não foi atribuido, faz isso agora
				function open( evt ) {
					var $content, tooltip;
					evt.stopPropagation();

					if ( !loadedContent ) {
						loadedContent = true;
						$content = $( "<syo-popover-content><div syo-progressbar='100'></div></syo-popover-content>" );
						$content = $compile( $content )( popoverScope );
						$content.appendTo( $popover );

						$templatePromise( popoverScope.template, popoverScope.templateUrl ).then(function( template ) {
							var oldContent = $content;
							$content =  $( "<syo-popover-content></syo-popover-content>" );
							$content = $compile( $content.html( template ) )( popoverScope );

							oldContent.remove();
							$content.appendTo( $popover );

							// Reposiciona e aguarda até o próximo digest pra reposicionar o elemento (de novo).
							reposition();
							$timeout(function() {
								reposition();
							});
						});
					}

					// Verifica se há uma diretiva syoTooltip presente no elemento atual.
					// Se houver, fecha o mesmo para que não sobreponha ao popover.
					tooltip = element.controller( "syoTooltip" );
					if ( tooltip ) {
						tooltip.close();
					}

					// Devemos bindar o controller a alguma propriedade do escopo pai?
					if ( model ) {
						// Se o escopo pai já tem um controller de syoPopover que não é o do popover atual,
						// então devemos forçar o close de tal popover e setar o nosso.
						if (
								popoverScope.$parent[ model ] instanceof controller.constructor &&
								popoverScope.$parent[ model ] !== controller
						) {
							popoverScope.$parent[ model ].close();
						}

						popoverScope.$parent[ model ] = controller;
					}

					controller.open();
				}

				function reposition() {
					controller && controller.position();
				}

				// Fecha o popover.
				function close( evt ) {
					evt.stopPropagation();
					controller.close();
				}
			};

			// Retorna qual evento o elemento de origem deverá responder pra fechar o popover.
			function getOutEvent( eventIn ) {
				if ( eventIn === "mouseenter" ) {
					return "mouseleave";
				}

				return eventIn;
			}

			return definition;
		}
	]);

	module.controller( "SyoPopoverController", [
		"$scope",
		"$element",
		"$timeout",
		function( $scope, $element, $timeout ) {
			var open = false;

			this.popoverScope = null;
			this.callbacks = {};

			this.isOpen = function() {
				return open;
			};

			this.open = function() {
				if ( open ) {
					return;
				}

				// Executa callback on open
				if ( ng.isFunction( this.callbacks.open ) ) {
					this.callbacks.open( this.popoverScope, this );
				}

				open = true;
				$element.show();
				this.position();
			};

			this.close = function() {
				if ( !open ) {
					return;
				}

				// Executa callback on close
				if ( ng.isFunction( this.callbacks.close ) ) {
					this.callbacks.close( this.popoverScope, this );
				}

				open = false;
				$element.hide();
			};

			this.position = function() {
				// Variáveis utilizadas no cálculo de posicionamento no inicio/fim do elemento
				var atPos, myPos, atStart;
				var position = {};

				// Se não há posição, utiliza top, que é o padrão
				var positionValue = ( $scope.position || "top" ).split( "-" );

				if ( !open ) {
					return;
				}

				switch ( positionValue[ 0 ] ) {
					case "top":
						position.at = "center top-15";
						position.my = "center bottom";
						break;

					case "right":
						position.at = "right+15 center";
						position.my = "left center";
						break;

					case "bottom":
						position.at = "center bottom+15";
						position.my = "center top";
						break;

					case "left":
						position.at = "left-15 center";
						position.my = "right center";
						break;
				}

				if ( positionValue[ 1 ] ) {
					atStart = positionValue[ 1 ] === "start";

					if ( /^top|bottom$/.test( positionValue[ 0 ] ) ) {
						atPos = atStart ? "left" : "right";
						myPos = atStart ? "left-5" : "right+5";
					} else {
						atPos = atStart ? "top" : "bottom";
						myPos = atStart ? "top-5" : "bottom+5";
					}

					position.at = position.at.replace( "center", atPos );
					position.my = position.my.replace( "center", myPos );
				}

				position.of = $scope.element;
				position.within = $scope.element;

				// @FIXME collision = flip não funciona no Firefox Android :'(
				position.collision = "none";

				// Para setar a posição, deve-se aguardar até que o digest do elemento termine
				$timeout(function() {
					var maxWidth, pos;

					$element.position( position );
					pos = $element.position();

					// Calcula se o posicionamento colocou o elemento pra fora da tela, mas
					// apenas quando estamos usando left/right. Caso sim, então o elemento será
					// alterado para ter um max-width que o permita ficar 100% na tela.
					if ( positionValue[ 0 ] === "left" ) {
						if ( pos.left < 0 ) {
							maxWidth = $element.outerWidth() + pos.left;
						}
					} else if ( positionValue[ 0 ] === "right" ) {
						if ( $element.outerWidth() + pos.left > $( window ).width() ) {
							maxWidth = $( window ).width() + pos.left;
						}
					}

					// Se tem um maxWidth calculado, seta este e reposiciona
					if ( maxWidth ) {
						$element.css( "max-width", maxWidth );
						$element.position( position );
					}
				});
			};

			this.destroy = function() {
				$scope.$destroy();
				$element.remove();
			};
		}
	]);

	module.directive( "syoPopoverElement", function() {
		var definition = {};

		definition.replace = true;
		definition.restrict = "E";
		definition.scope = {
			title: "=",
			position: "=",
			onClose: "=",
			element: "="
		};

		definition.template =
			"<div class='syo-popover syo-popover-{{ position }}'>" +
				"<div class='syo-popover-arrow'></div>" +
				"<div class='syo-popover-titlebar'>" +
					"<div class='syo-popover-title'>{{ title }}</div>" +
					"<div class='syo-popover-close' ng-click='$popover.close()'>" +
						"<i class='icon-remove-circle'></i>" +
					"</div>" +
				"</div>" +
			"</div>";

		definition.controller = "SyoPopoverController";
		definition.controllerAs = "$popover";

		definition.link = function( scope, element, attr ) {
			attr.$set( "title", "" );
			$( "body" ).append( element );
		};

		return definition;
	});

	module.directive( "syoPopoverContent", function() {
		return {
			restrict: "E",
			replace: true,
			transclude: true,
			template: "<div class='syo-popover-content' ng-transclude></div>"
		};
	});

}( jQuery, angular );