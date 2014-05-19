/**
 * $urlbuilder
 * -----------
 * Construtor de URLs, convertendo um objeto na query string.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).factory( "$urlbuilder", function() {
		function encodeUriQuery( val, pctEncodeSpaces ) {
			return encodeURIComponent( val )
					.replace( /%40/gi, "@" )
					.replace( /%3A/gi, ":" )
					.replace( /%24/g, "$" )
					.replace( /%2C/gi, "," )
					.replace( /%20/g, ( pctEncodeSpaces ? "%20" : "+" ) );
		}

		return function( url, params ) {
			var parts = [];

			if ( !params ) {
				return url;
			}

			Object.keys( params ).sort().forEach(function( key ) {
				var value = params[ key ];
				if ( value == null ) {
					return;
				}

				if ( !Array.isArray( value ) ) {
					value = [ value ];
				}

				value.forEach(function( v ) {
					if ( ng.isObject( v ) ) {
						v = ng.toJson( v );
					}

					parts.push( encodeUriQuery( key ) + "=" + encodeUriQuery( v ) );
				});
			});

			url += parts.length ? ( ( url.indexOf( "?" ) > -1 ? "&" : "?" ) + parts.join( "&" ) ) : "";
			return url;
		};
	});

}( jQuery, angular );