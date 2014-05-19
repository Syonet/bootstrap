/**
 * $localStorage
 * -------------
 * API para interagir com o localStorage no Angular.js.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).service( "$localStorage", [
		"$window",
		function( $window ) {
			var localStorage = $window.localStorage;
			var $factory = {
				removeAll: function() {
					localStorage.clear();
					return $factory;
				},
				remove: function( key ) {
					localStorage.removeItem( key );
					return $factory;
				},
				put: function( key, value ) {
					if ( ng.isObject( key ) ) {
						ng.forEach( key, function( v, k ) {
							$factory.put( k, v );
						});

						return $factory;
					} else {
						localStorage.setItem( key, JSON.stringify( value ) );
					}

					return $factory;
				},
				get: function( key ) {
					var val = localStorage.getItem( key );
					return val == null ? undefined : JSON.parse( val );
				}
			};

			return $factory;
		}
	]);

}( jQuery, angular );