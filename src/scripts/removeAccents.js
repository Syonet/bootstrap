/**
 * removeAccents
 * -------------
 * Filtro que remove acentuação da string de entrada.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "removeAccents", function() {
		function replace( str ) {
			var acentos = [
				[ /[\300-\306]/g, "A" ],
				[ /[\340-\346]/g, "a" ],
				[ /[\310-\313]/g, "E" ],
				[ /[\350-\353]/g, "e" ],
				[ /[\314-\317]/g, "I" ],
				[ /[\354-\357]/g, "i" ],
				[ /[\322-\330]/g, "O" ],
				[ /[\362-\370]/g, "o" ],
				[ /[\331-\334]/g, "U" ],
				[ /[\371-\374]/g, "u" ],
				[ /[\321]/g, "N" ],
				[ /[\361]/g, "n" ],
				[ /[\307]/g, "C" ],
				[ /[\347]/g, "c" ]
			];

			acentos.forEach(function( pair ) {
				str = str.replace( pair[ 0 ], pair[ 1 ] );
			});

			return str;
		}

		return function doReplace( input, prop, recurse ) {
			if ( Array.isArray( input ) && ( recurse == null || recurse ) ) {
				input.forEach(function( val, i ) {
					input[ i ] = doReplace( val, prop, false );
				});

				return input;
			}

			if ( input[ prop ] ) {
				input[ prop ] = replace( String( input[ prop ] ) );
			} else {
				input = replace( String( input ) );
			}

			return input;
		};
	});

}( jQuery, angular );