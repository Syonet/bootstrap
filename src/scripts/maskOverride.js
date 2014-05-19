/**
 * syoMaskOverride
 * ---------------
 * Diretiva para ser utilizada em conjunto com a diretiva ui-mask, cujo valor setado no ng-model
 * é bugado, removendo caracteres que não são da máscara (ex. 9-99 vira 999 no ui-mask puro).
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoMaskOverride", [ "$parse", function( $parse ) {
		var definition = {};

		definition.restrict = "A";
		definition.require = "ngModel";
		definition.priority = 10;

		definition.link = function( $scope, $element, $attr, ngModel ) {
			var viewValue, oldFn;

			if ( !$attr.uiMask ) {
				return;
			}

			oldFn = ngModel.$setViewValue;
			ngModel.$setViewValue = function( val ) {
				oldFn.call( this, val );

				viewValue = ngModel.$viewValue;
				ngModel.$parsers.push(function() {
					return viewValue;
				});
				oldFn.call( this, val );
				ngModel.$parsers.pop();
			};
		};

		return definition;
	}]);

}( jQuery, angular );