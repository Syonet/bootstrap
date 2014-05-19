/**
 * syoOverlay
 * ----------
 * Diretiva para criar um overlay do Syonet Bootstrap rapidamente, podendo exibi-lo/ocultá-lo usando
 * data binding do Angular.js.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoOverlay", function() {
		return {
			replace: true,
			transclude: true,
			restrict: "EA",
			template: "<div class='syo-overlay'><div class='syo-overlay-content' ng-transclude></div></div>",
			link: function( $scope, $element, $attr ) {
				var $focused = $();

				$scope.$watch( $attr.syoOverlay, function( newVal, oldVal ) {
					if ( !oldVal ) {
						$focused = $( ":focus" ).blur();
					} else if ( !newVal ) {
						$focused.focus();
					}

					$element.toggleClass( "syo-active", !!newVal );
				});
			}
		};
	});

}( jQuery, angular );