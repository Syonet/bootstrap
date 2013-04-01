(function( $ ) {
	"use strict";

	module( "Geral", {
		setup: function() {
			this.pagination = $("#pagination").syoPagination();
		},
		teardown: function() {
			this.pagination.syoPagination("destroy");
		}
	});

	test( "markup", 3, function() {
		ok( this.pagination.is(".syo-pagination"), "elemento é .syo-pagination" );
		strictEqual( this.pagination.has("> ul").length, 1, "elemento tem um <ul> filho" );

		this.pagination.syoPagination( "option", "inline", true );
		ok( this.pagination.is(".syo-pagination-inline"), "tem classe específica quando opção inline = true" );
	});

})( jQuery );