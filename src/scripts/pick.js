/**
 * pick
 * ----
 * Filtro que retorna um objeto contendo apenas a chave informada por argumento.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "pick", function() {
		return function( input, arg ) {
			var out;

			// Sem filtro, retorna tudo.
			if ( !arg ) {
				return input;
			}

			out = {};
			out[ arg ] = input[ arg ];
			return out;
		};
	});

}( jQuery, angular );