/**
 * syoProgressbar
 * --------------
 * Diretiva para criar e controlar a porcentagem de uma progressbar do Syonet Bootstrap.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoProgressbar", function() {
		var definition = {};

		definition.replace = true;
		definition.template =
			"<div class='syo-progressbar'>" +
				"<div class='syo-progressbar-value'></div>" +
			"</div>";

		definition.link = function( $scope, $element, $attr ) {
			$attr.$observe( "syoProgressbar", function( val ) {
				val = $scope.$eval( val );
				val = parseFloat( val );
				$element.find( ".syo-progressbar-value" ).css( "width", Math.min( val || 0, 100 ) + "%" );
			});
		};

		return definition;
	});

}( jQuery, angular );