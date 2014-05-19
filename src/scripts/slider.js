/**
 * syoSlider
 * ---------
 * Diretiva que instancia um jQuery UI Slider.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoSlider", [
		function() {
			var definition = {};

			function getOptions( $attrs ) {
				return {
					range: $attrs.range,
					min: +$attrs.min || 0,
					max: +$attrs.max || 100,
					step: +$attrs.step || 1
				};
			}

			definition.restrict = "EA";
			definition.replace = true;
			definition.template = "<div></div>";
			definition.require = "ngModel";

			definition.link = function( $scope, $element, $attrs, ngModel ) {
				var options = getOptions( $attrs );
				var enforcedMin = +$attrs.enforcedMin || options.min;
				var enforcedMax = +$attrs.enforcedMax || options.max;

				$element.slider( options );

				ngModel.$render = function() {
					$element.slider( options.range === true ? "values" : "value", ngModel.$viewValue );
				};

				$element.on( "slide", function( e, ui ) {
					if ( ui.value < enforcedMin ) {
						return false;
					}

					if ( ui.value > enforcedMax ) {
						return false;
					}

					$scope.$apply(function() {
						ngModel.$setViewValue( options.range === true ? ui.values : ui.value );
					});
				});
			};

			return definition;
		}
	]);

}( jQuery, angular );