!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "toArray", function() {
		return function( input ) {
			return input != null ? Array.prototype.slice.call( input ) : [];
		};
	});

}( jQuery, angular );