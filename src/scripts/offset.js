!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "offset", function() {
		return function( input, offset ) {
			offset = +offset || 0;
			offset = offset < 0 ? 0 : offset;
			return !Array.isArray( input ) ? input : input.slice( offset );
		};
	});

}( jQuery, angular );