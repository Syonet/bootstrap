(function() {
	"use strict";
	
	module( "Features" );
	test( "data-disabled attribute on TR", 2, function() {
		
		var $tr = $( "#grid-head-body div:last tr:first" ).attr( "data-disabled", "true" );
		$("#grid-head-body").syoDataGrid();
		
		ok( $tr.hasClass( "syo-datagrid-state-default" ), "The default class should be set on the new TR" );
		
		$tr.trigger("mouseenter");
		ok( !$tr.hasClass( "syo-datagrid-state-hover" ), "The events in the new TR should not be bound" );
	});
	test( "Should allow one instantiation per element in the jQuery collection", 2, function() {
		
		var $fixture = $( "#qunit-fixture" );
		var HTML = $fixture.html();
		
		$fixture.empty();
		
		$fixture.append( HTML.replace( "id=\"grid-head-body\"", "id=\"grid-1\"" ) );
		$fixture.append( HTML.replace( "id=\"grid-head-body\"", "id=\"grid-2\"" ) );
		
		$( "#grid-1, #grid-2" ).syoDataGrid();
		
		strictEqual( $( "#grid-1 .syo-datagrid-header" ).length, 1, "grid should be set to the first element" );
		strictEqual( $( "#grid-2  .syo-datagrid-header" ).length, 1, "grid should be set to the second element" );
	});
}());