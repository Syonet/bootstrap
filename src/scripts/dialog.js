/**
 * $dialog
 * -------
 * Provider para criar um jQuery UI Dialog programaticamente.
 *
 * syoDialog
 * ---------
 * Diretiva que instancia um jQuery UI Dialog no elemento atual, podendo opcionalmente bindar um
 * objeto de controle no escopo atual.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	var syo = ng.module( "syonet" );
	var extend = ng.extend;

	function Dialog() {
		var $element, promise;
		var that = this;

		this._setPromise = function( _promise ) {
			promise = _promise.then(function( _element ) {
				$element = _element;
			});

			return that;
		};

		this.open = function() {
			promise = promise.then(function() {
				var options = that.option();

				// Garante que max-width e max-height fiquem consistentes
				var widget = $element.dialog( "widget" ).css({
					"max-width": options.maxWidth
				});

				$element.dialog( "open" );
			});

			return that;
		};

		this.close = function() {
			promise = promise.then(function() {
				$element.dialog( "close" );
			});

			return that;
		};

		this.option = function() {
			var retVal;
			var args = Array.prototype.slice.call( arguments );

			args.unshift( "option" );
			retVal = $element.dialog.apply( $element, args );

			return retVal instanceof $ ? that : retVal;
		};

		this.destroy = function() {
			$element.dialog( "destroy" );
			$element.remove();
		};
	}

	Dialog.defaults = {
		autoOpen: false,
		modal: false
	};

	Dialog.options = {
		ngModel: "@",
		title: "=",
		modal: "&",
		autoOpen: "&",
		draggable: "&",
		height: "@",
		maxHeight: "@",
		width: "@",
		maxWidth: "@",
		onOpen: "&",
		onClose: "&",
		onBeforeClose: "&"
	};

	syo.directive( "syoDialog", [ "$q", function( $q ) {
		var definition = {};

		function getOptions( $scope ) {
			return {
				title: $scope.title,
				modal: $scope.modal(),
				height: $scope.height,
				maxHeight: $scope.maxHeight,
				width: $scope.width,
				maxWidth: $scope.maxWidth,
				draggable: $scope.draggable(),
				autoOpen: $scope.autoOpen(),
				open: function() {
					var ret = $scope.onOpen();
					return typeof ret === "function" ? ret() : ret;
				},
				beforeClose: function() {
					var ret = $scope.onBeforeClose();
					return typeof ret === "function" ? ret() : ret;
				},
				close: function() {
					var ret = $scope.onClose();
					return typeof ret === "function" ? ret() : ret;
				},
				closeText: "Fechar"
			};
		}

		definition.restrict = "E";
		definition.replace = true;
		definition.transclude = true;
		definition.template = "<div><div ng-transclude></div></div>";
		definition.scope = Dialog.options;

		definition.link = function( $scope, $element, $attrs ) {
			var options = getOptions( $scope );
			$element.dialog( options );

			// Se o escopo atual não tem um provider ainda, cria um e já passa o elemento
			$scope.$provider = ( $scope.$provider || new Dialog()._setPromise( $q.when( $element ) ) );
			$scope.$parent[ $scope.ngModel ] = $scope.$provider;

			// Fornece uma maneira mais fácil de fechar o dialog a partir do HTML
			// Tem que exportar pro $parent ou não fica acessível do conteúdo do dialog
			$scope.$parent.$close = $scope.$provider.close;
		};

		return definition;
	}]);

	syo.provider( "$dialog", [ function() {
		var $dialogProvider = {};

		$dialogProvider.defaults = Dialog.defaults;

		$dialogProvider.$get = [
			"$compile",
			"$templatePromise",
			"$rootScope",
			"$document",
			function( $compile, $templatePromise, $rootScope, $document ) {
				function createDialog( options ) {
					var promise, $element;
					var scope = ( options.scope || $rootScope ).$new();

					if ( !options.template && !options.templateUrl ) {
						throw new Error( "Deve ser passada a opção 'template' ou a opção 'templateUrl'!" );
					}

					options = extend( {}, Dialog.defaults, options );
					extend( scope, options );

					scope.$provider = new Dialog();
					promise = $templatePromise( options.template, options.templateUrl ).then(function( template ) {
						$element = ng.element( "<syo-dialog></syo-dialog>" );

						// Seta todos os atributos possíveis na diretiva.
						ng.forEach( Dialog.options, function( binding, prop ) {
							$element.attr(
								prop.replace( /([A-Z])/g, "-$1" ).toLowerCase(),
								binding[ 0 ] === "@" ? scope[ prop ] : prop
							);
						});

						$element.html( template );

						$document.find( "body" ).eq( 0 ).append( $element );
						$element = $compile( $element )( scope );

						return $element;
					});

					scope.$provider._setPromise( promise );
					return scope.$provider;
				}

				return {
					create: createDialog
				};
			}
		];

		return $dialogProvider;
	}]);

}( jQuery, angular );