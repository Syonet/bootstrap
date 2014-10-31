!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoTouchTest", [
		function() {
			function isTouch() {
				return "ontouchstart" in window ||
						!!( window.DocumentTouch && document instanceof window.DocumentTouch );
			}

			return function( $scope, $element ) {
				$element.toggleClass( "touch", isTouch() );
			};
		}
	]);

}( jQuery, angular );