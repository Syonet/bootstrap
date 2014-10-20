/**
 * syoPopover
 * ----------
 * Diretiva para criar um popover que abrirá ao interagir com o elemento (clique, mouseover, etc).
 */
!function( $, ng ) {
	"use strict";

	var instances = [];
	var module = ng.module( "syonet.popover", [] );

	var findByConfig = function( config ) {
		var i = 0;
		for ( ; i < instances.length; i++ ) {
			if ( instances[ i ].config === config ) {
				return instances[ i ];
			}
		}
	};

	module.run(function( $rootScope, $window ) {
		// Fecha todos os popovers abertos ao clicar em algum lugar ou perder o foco da janela
		$( $window ).on( "click blur", function( evt ) {
			if ( evt.type === "blur" && evt.target !== $window ) {
				return;
			}

			instances.forEach(function( instance ) {
				instance.close();
			});

			!$rootScope.$$phase && $rootScope.$apply();
		});

		$( $window ).on( "resize scroll", function() {
			instances.forEach(function( instance ) {
				instance.reposition();
			});
		});
	});

	module.directive( "syoPopover", function( $document, $compile ) {
		var definition = {};

		definition.scope = true;
		definition.restrict = "A";
		definition.link = function( scope, element, attrs ) {
			var popover, controller;
			var currentEvent = {
				in: "click",
				out: getOutEvent( "click" )
			};

			element.parents().on( "scroll", function( evt ) {
				evt.stopPropagation();
				controller.close();
			});

			attrs.$observe( "syoPopover", function( config ) {
				var mustBind = true;
				config = scope.$eval( config );

				controller = findByConfig( config );
				if ( controller ) {
					popover = controller.element;
				}

				if ( !popover ) {
					scope.$config = config;

					// Cria o elemento, compila, obtem o controller e adiciona ao array de instâncias
					popover = $( "<syo-popover-element config='$config'>" );
					popover = $compile( popover )( scope );
					controller = popover.controller( "syoPopoverElement" );
					instances.push( controller );

					// Coloca o popover no DOM
					$document.find( "body" ).append( popover );
				} else {
					// O evento mudou?
					if ( currentEvent.in !== config.event ) {
						// Sim, então vamos remover os listeners que adicionamos
						element.off( currentEvent.in, toggle );
						element.off( currentEvent.out, toggle );
					} else {
						// Determina que não é necessário bindar os eventos
						mustBind = false;
					}
				}

				if ( mustBind ) {
					// Binda o evento de entrada
					element.on( currentEvent.in, toggle );

					// Binda o evento de saída caso seja necessário
					if ( currentEvent.in !== currentEvent.out ) {
						element.on( currentEvent.out, toggle );
					}
				}
			});

			function toggle( evt ) {
				var isEventIn = evt.type === currentEvent.in;

				// Para a propagação
				evt.stopPropagation();

				// Se o controller está apontando para outro elemento, vamos abrir o popover.
				// Faremos o controller apontar para o elemento atual mais pra frente
				if ( controller.target !== element ) {
					// Se o evento for de abertura do popover, faremos isso
					if ( isEventIn ) {
						controller.open();
					}
				} else if ( currentEvent.in === currentEvent.out ) {
					// Eventos iguais, faz toggle (aberto? fecha; fechado? abre)
					!controller.$isOpen ? controller.open() : controller.close();
				} else {
					// Eventos diferentes, abre se for evento de entrada, ou o contrário
					isEventIn ? controller.open() : controller.close();
				}

				// Manda ele apontar pro nosso elemento atual
				controller.target = element;

				// Executa um digest
				scope.$apply();
			}
		};

		return definition;

		// -------------------------------------------------------------------------------------------------------------

		// Retorna qual evento o elemento de origem deverá responder pra fechar o popover.
		function getOutEvent( eventIn ) {
			if ( eventIn === "mouseenter" ) {
				return "mouseleave";
			}

			return eventIn;
		}
	});

	module.controller( "SyoPopoverController", function SyoPopoverController( $scope, $element ) {
		var ctrl = this;

		ctrl.config = $scope.config;
		ctrl.element = $element;
		ctrl.$isOpen = false;

		ctrl.open = function() {
			if ( ctrl.$isOpen ) {
				return;
			}

			ctrl.$isOpen = true;

			if ( ng.isFunction( ctrl.config.onOpen ) ) {
				ctrl.config.onOpen( ctrl.config.scope, ctrl );
			}
		};

		ctrl.close = function() {
			if ( !ctrl.$isOpen ) {
				return;
			}

			ctrl.$isOpen = false;
			if ( ng.isFunction( ctrl.config.onClose ) ) {
				ctrl.config.onClose( ctrl.config.scope, ctrl );
			}
		};

		ctrl.reposition = function() {
			$scope.$emit( "reposition" );
		};
	});

	module.directive( "syoPopoverElement", function( $rootScope, $compile, $templatePromise, $timeout ) {
		var definition = {};

		definition.replace = true;
		definition.restrict = "E";
		definition.controller = "SyoPopoverController";
		definition.controllerAs = "$popover";
		definition.scope = {
			config: "="
		};

		definition.template =
			"<div ng-class='[ \"syo-popover\", \"syo-popover-\" + config.position ]' ng-show='$popover.$isOpen'>" +
				"<div class='syo-popover-arrow'></div>" +
				"<div class='syo-popover-titlebar'>" +
					"<div class='syo-popover-title'>{{ config.title }}</div>" +
					"<div class='syo-popover-close' ng-click='$popover.close()'>" +
						"<i class='icon-remove-circle'></i>" +
					"</div>" +
				"</div>" +
			"</div>";

		definition.link = function( scope, element, attr, $popover ) {
			var loaded;
			var config = scope.config;

			// Cria um escopo e estende com as suas variáveis locais
			var popoverScope = config.scope = ( config.scope || $rootScope ).$new();
			ng.extend( popoverScope, config.locals );

			// Utilizado pra reposicionar a partir do controller
			scope.$on( "reposition", reposition );

			scope.$watch( "config.position", reposition );
			scope.$watch( "$popover.target", reposition );
			scope.$watch( "$popover.$isOpen", function( open ) {
				var tooltip, content;

				if ( open === undefined ) {
					return;
				}

				// O conteúdo já foi carregado?
				if ( open && !loaded ) {
					loaded = true;

					// Cria uma diretiva com o conteúdo de uma progressbar, só até o template terminar de baixar
					content = $( "<syo-popover-content><div syo-progressbar='100'></div></syo-popover-content>" );
					content = $compile( content )( scope );
					element.append( content );

					$templatePromise( config.template, config.templateUrl ).then(function( template ) {
						// Remove o conteúdo antigo
						content.remove();

						// Inclui o conteúdo vindo do template
						content = $( "<syo-popover-content>" ).html( template );
						content = $compile( content )( popoverScope );
						element.append( content );

						// Reposiciona
						reposition();
					});
				}

				if ( open ) {
					// Verifica se há uma diretiva syoTooltip presente no elemento atual.
					// Se houver, fecha o mesmo para que não sobreponha ao popover
					tooltip = $popover.target.controller( "syoTooltip" );
					if ( tooltip ) {
						tooltip.close();
					}

					$timeout( reposition );
				}
			});

			// ---------------------------------------------------------------------------------------------------------

			function reposition() {
				// Variáveis utilizadas no cálculo de posicionamento no inicio/fim do elemento
				var atPos, myPos, atStart, positionValue;
				var position = {};

				// Se não há posição, utiliza top, que é o padrão
				config.position = ( config.position || "top" );
				positionValue = config.position.split( "-" );

				// Não posiciona se estiver fechado.
				if ( !$popover.$isOpen ) {
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

				position.of = $popover.target;
				position.within = $popover.target;

				// @FIXME collision = flip não funciona no Firefox Android :'(
				position.collision = "none";

				// Para setar a posição, deve-se aguardar até que o digest do elemento termine
				$timeout(function() {
					var maxWidth, pos;

					element.position( position );
					pos = element.position();

					// Calcula se o posicionamento colocou o elemento pra fora da tela, mas
					// apenas quando estamos usando left/right. Caso sim, então o elemento será
					// alterado para ter um max-width que o permita ficar 100% na tela.
					if ( positionValue[ 0 ] === "left" ) {
						if ( pos.left < 0 ) {
							maxWidth = element.outerWidth() + pos.left;
						}
					} else if ( positionValue[ 0 ] === "right" ) {
						if ( element.outerWidth() + pos.left > $( window ).width() ) {
							maxWidth = $( window ).width() + pos.left;
						}
					}

					// Se tem um maxWidth calculado, seta este e reposiciona
					if ( maxWidth ) {
						element.css( "max-width", maxWidth );
						element.position( position );
					}
				});
			}
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