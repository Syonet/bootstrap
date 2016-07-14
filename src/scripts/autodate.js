!function( ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "autodate", [ "$filter", function( $filter ) {
		var date = $filter( "date" );

		return function( input, adjunct ) {
			var day = date( input, "dd/MM/yyyy" );
			var hour = date( input, "HH:mm" );

			// Hora zerada não retorna nada
			if ( hour === "00:00" ) {
				return day;
			}

			return day + ( adjunct ? " às" : "" ) + " " + hour;
		};
	}]);

}( angular );