(function() {
	"use strict";

	module( "Métodos" );
	test( "refresh", function() {
		expect( 1 );

		$( "#grid-head-body" ).syoDataGrid();

		$( "#grid-head-body div:last table tbody" ).append( "<tr id='test-refresh-tr'><td></td></tr>" );
		$( "#grid-head-body" ).syoDataGrid( "refresh" );

		$( "#test-refresh-tr" ).trigger( "mouseenter" );
		ok(
			$( "#test-refresh-tr" ).hasClass( "syo-datagrid-state-hover" ),
			"Os eventos na nova TR devem ser adicionados"
		);
	});

}());