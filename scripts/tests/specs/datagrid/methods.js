(function() {
	"use strict";

	module( "Métodos" );
	test( "Método 'refresh'", function() {
		expect( 1 );

		$( "#grid-head-body" ).syoDataGrid();

		$( "#grid-head-body div:last table tbody" ).append( "<tr id='test-refresh-tr'><td></td></tr>" );
		$( "#grid-head-body" ).syoDataGrid( "refresh" );

		$( "#test-refresh-tr" ).trigger( "mouseenter" );
		ok( $( "#test-refresh-tr" ).hasClass( "syo-datagrid-state-hover" ),
				"The events in the new TR should be bound" );
	});

}());