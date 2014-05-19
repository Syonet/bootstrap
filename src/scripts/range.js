/**
 * range
 * -----
 * Filtro que retorna um array do tamanho especificado, útil para utilizar com ng-repeat de forma
 * arbitrária.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "range", function() {
		return function( input, arg ) {
			var i;
			var out = [];
			arg = +arg || 0;

			for ( i = 0; i < arg; i++ ) {
				out.push( i );
			}

			return out;
		};
	});

}( jQuery, angular );