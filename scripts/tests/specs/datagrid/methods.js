(function() {
	"use strict";

	module( "Métodos" );
	test( "refresh", function() {
		expect( 1 );

		var $table = $( "#grid-head-body" ).syoDataGrid();
		var $widget = $( "#grid-head-body" ).syoDataGrid( "widget" );

		$table.find( "tbody" ).append( "<tr class='test-refresh-tr'><td></td></tr>" );
		$table.syoDataGrid( "refresh" );

		$widget.find( ".test-refresh-tr" ).trigger( "click" );
		ok(
			$widget.find( ".test-refresh-tr" ).hasClass( "syo-active" ),
			"Os eventos na nova TR devem ser adicionados"
		);

		$table.syoDataGrid( "destroy" );
	});

}());