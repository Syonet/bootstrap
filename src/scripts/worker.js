/**
 * $worker
 * -------
 * Provider para instanciar Web Workers.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).factory( "$worker", [
		"$window",
		"$document",
		function( $window, $document ) {
			var cache = "";
			try {
				cache = $document.find( "#cache-version" );
				if ( cache.is( "meta" ) ) {
					cache = cache.attr( "content" );
				} else {
					cache = cache.val();
				}
			} catch ( e ) {}

			function getUrl( script, useCache ) {
				// Remove qualquer query string
				script = script.replace( /\?.*$/, "" );

				// Se podemos usar cache, então usa, pô!
				if ( cache && useCache ) {
					script += "?cache=" + cache;
				}

				return script;
			}

			return {
				create: function( url, useCache ) {
					return new $window.Worker( getUrl( url, useCache !== false ) );
				}
			};
		}
	]);

}( jQuery, angular );