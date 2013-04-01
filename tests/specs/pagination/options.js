(function( $ ) {
	"use strict";

	module( "Opções", {
		setup: function() {
			this.pagination = $("#pagination").syoPagination();
		},
		teardown: function() {
			this.pagination.syoPagination("destroy");
		}
	});

	test( "size", 1, function() {
		this.pagination.syoPagination( "option", "size", 3 );
		strictEqual( this.pagination.find("ul > li").length, 3, "deve criar o número de itens certo" );
	});

})( jQuery );