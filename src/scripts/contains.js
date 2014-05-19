/**
 * contains
 * --------
 * Filtro que retorna um boolean sugerindo a existência de um elemento passado por argumento em um
 * array de entrada.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "contains", function() {
		return function( input, arg ) {
			if ( !Array.isArray( input ) || arg === undefined ) {
				return false;
			}

			return input.indexOf( arg ) > -1;
		};
	});

}( jQuery, angular );