(function() {
	"use strict";
	
	module( "Methods" );
	test( "Method 'refresh'", function() {
		expect( 2 );
		
		$( "#grid-head-body" ).syoDataGrid();
		
		$( "#grid-head-body div:last table tbody" ).append( "<tr id='test-refresh-tr'><td></td></tr>" );
		$( "#grid-head-body" ).syoDataGrid( "refresh");
		
		ok( $( "#test-refresh-tr" ).hasClass( "syo-datagrid-state-default" ),
				"The default class should be set on the new TR" );
		
		$( "#test-refresh-tr" ).trigger( "mouseenter" );
		ok( $( "#test-refresh-tr" ).hasClass( "syo-datagrid-state-hover" ),
				"The events in the new TR should be bound" );
	});
	
}());