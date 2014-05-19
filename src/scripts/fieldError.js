/**
 * syoFieldError
 * -------------
 * Diretiva para rapidamente criar um erro de campo de formulário padrão da Syonet.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoFieldError", function() {
		return {
			restrict: "EA",
			transclude: true,
			replace: true,
			template:
				"<span class='syo-field-help syo-error'>" +
					"<i class='icon-exclamation-circle'></i> " +
					"<span ng-transclude></span>" +
				"</span>"
		};
	});

}( jQuery, angular );