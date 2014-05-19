/**
 * syoDatepicker
 * -------------
 * Diretiva que instancia um jQuery UI Datepicker no elemento.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoDatepicker", function() {
		var definition = {};

		definition.restrict = "A";
		definition.require = "?ngModel";

		definition.link = function( $scope, $element, $attr, ngModel ) {
			var $button;
			var options = $scope.$eval( $attr.syoDatepicker );
			var oldFn = options.onSelect;

			if ( ngModel ) {
				// Formata a data sempre em dd/mm/yy ou apenas mm/yy
				ngModel.$parsers.push(function() {
					return $.datepicker.formatDate( "dd/mm/yy", $element.datepicker( "getDate" ) );
				});

				options.onSelect = function( date, inst ) {
					// Garante que o model seja atualizado apropriadamente
					ngModel.$setViewValue( date );
					$scope.$apply();

					// ...e ainda chama a função onSelect antiga!
					if ( typeof oldFn === "function" ) {
						oldFn.call( this, date, inst );
					}
				};
			}

			// Instancia o datepicker
			$element.datepicker( options );

			// Quando há um botão para exibir o datepicker...
			$button = $element.next( ".ui-datepicker-trigger" );
			if ( $button.length ) {
				$button.before( " " );
				$button.addClass( "syo-button" );

				// Coloca o botão dentro do seu container, caso o input esteja em um input row
				if ( $element.parent().is( ".syo-input-row" ) ) {
					$button.wrap( "<div class='syo-input-row-addon'></div>" );
				}
			}
		};

		return definition;
	});

}( jQuery, angular );