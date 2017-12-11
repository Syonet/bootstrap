!function( ng, _ ) {
	"use strict";

	ng.module( "syonet" ).factory( "$translationStorage", function() {
		var values = {
			PTBR: {},
			ES: {}
        };
        var merge = function( PTBR, ES ) {
            values.PTBR = _.merge( values.PTBR, PTBR );
            values.ES = _.merge( values.ES, ES );
        };
        var get = function( valor ) {
            return values[ valor.replace( "-", "" ) ];
        };
		var service = {
			merge: merge,
			get: get
		};
		return service;
	});

}( angular, _ );