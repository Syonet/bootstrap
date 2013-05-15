(function() {
	"use strict";

	module( "Features" );
	test( "data-disabled attribute on TR", function() {
		expect( 1 );

		var $tr = $( "#grid-head-body div:last tr:first" ).attr( "data-disabled", "true" );
		$("#grid-head-body").syoDataGrid();

		$tr.trigger("mouseenter");
		ok( !$tr.hasClass( "syo-datagrid-state-hover" ), "The events in the new TR should not be bound" );
	});
}());