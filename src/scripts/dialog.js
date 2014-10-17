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

	var defaults = {
		autoOpen: false,
		modal: false,
		closeText: "Fechar"
	};

	syo.directive( "syoDialog", function() {
		var definition = {};

		definition.restrict = "E";
		definition.scope = true;
		definition.transclude = true;
		definition.replace = true;
		definition.controller = "syoDialogController";
		definition.controllerAs = "$dialog";
		definition.template = "<div class='syo-dialog-content'></div>";

		definition.link = function( scope, element, attrs, $dialog, transcludeFn ) {
			// Seta um controller se estiver disponível
			if ( attrs.controller ) {
				element.attr( "ng-controller", attrs.controller );
			}

			// Se não há uma promise setada no escopo (significando que a dialog está sendo inicializada de uma view),
			// então vamos fazer o transclude pra setar o conteúdo da dialog
			if ( !scope.$$promise ) {
				transcludeFn(function( children ) {
					$dialog._setContent( children );
				});
			}
		};

		return definition;
	});

	syo.controller( "syoDialogController", function( $scope, $element, $attrs, $q, $compile ) {
		var ctrl = this;
		var initialOptions = $attrs.options;

		ctrl.open = function() {
			return ctrl.option().then(function( options ) {
				$element.dialog( "widget" ).css({
					"max-width": options.maxWidth
				});

				$element.dialog( "open" );
			});
		};

		ctrl.close = function() {
			return ctrl.promise.then(function() {
				$element.dialog( "close" );
			});
		};

		ctrl.destroy = function() {
			$scope.$destroy();
		};

		ctrl.option = function() {
			var args = [].slice.call( arguments );

			// Adiciona o nome do método 'option' pra chamar no elemento que tem a dialog
			args.unshift( "option" );

			return ctrl.promise.then(function() {
				var ret = $element.dialog.apply( $element, args );
				return ret instanceof $ ? undefined : ret;
			});
		};

		ctrl.promise = ( $scope.$$promise || $q.when( null ) ).then(function() {
			ctrl.$resolved = true;
		});

		ctrl._setContent = function( template ) {
			var options = $scope.$eval( initialOptions );
			$element.append( template );
			$compile( $element )( $scope );

			// Se há um alias pro controller, seta ele no escopo agora, após o compile
			if ( $attrs.controller && $attrs.controllerAs ) {
				$scope[ $attrs.controllerAs ] = $element.controller();
			}

			// Remove o prefixo "on" dos callbacks da dialog
			[ "BeforeClose", "Close", "Open" ].forEach(function( cb ) {
				var uncapitalized = cb[ 0 ].toLowerCase() + cb.substr( 1 );
				options[ uncapitalized ] = options[ "on" + cb ];
				delete options[ "on" + cb ];
			});

			$element.dialog( options );
		};

		$scope.$on( "$destroy", function() {
			// Destroi a instância da dialog antes de destruir o elemento
			$element.dialog( "destroy" );
			$element.remove();
		});
	});

	syo.provider( "$dialog", function() {
		var $dialogProvider = {};

		$dialogProvider.defaults = defaults;

		$dialogProvider.$get = [
			"$compile",
			"$templatePromise",
			"$rootScope",
			"$document",
			function( $compile, $templatePromise, $rootScope, $document ) {
				var create = function createDialog( options ) {
					var scope, dialog, element;
					options = options || {};

					if ( !options.template && !options.templateUrl ) {
						throw new Error( "Deve ser passada a opção 'template' ou a opção 'templateUrl'!" );
					}

					// Cria um novo escopo intermediário
					scope = ( options.scope || $rootScope ).$new();

					// Estende as opções padrão com os valores passados
					scope.options = extend( {}, defaults, options );

					// Estende o escopo com as variáveis locais
					extend( scope, options.locals );

					// Busca o template
					scope.$$promise = $templatePromise(
						options.template,
						options.templateUrl
					).then(function( template ) {
						// Seta o template e (consequentemente) inicializa a dialog
						dialog._setContent( template );
					});

					// Cria o elemento da dialog e seta os atributos principais
					element = $( "<syo-dialog>" );
					element.attr({
						options: "options",
						controller: options.controller,
						"controller-as": options.controllerAs
					});

					$document.find( "body" ).append( element );
					element = $compile( element )( scope );

					// Recupera o controller da dialog
					dialog = element.controller( "syoDialog" );
					return dialog;
				};

				return {
					create: create
				};
			}
		];

		return $dialogProvider;
	});

}( jQuery, angular );