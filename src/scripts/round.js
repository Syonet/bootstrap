/**
 * round
 * -----
 * Arredonda um numero para um determinado número de casas decimais.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "round", function() {
		return function( input, decimals, alwaysShowDecimals ) {
			decimals = +decimals || 0;
			input = +input || 0;

			if ( !alwaysShowDecimals && ( input - Math.floor( input ) === 0 ) ) {
				return String( input );
			}

			return input.toFixed( decimals );
		};
	});

}( jQuery, angular );