(function() {
	"use strict";
	
	var optionsPrefix = "syoDataGridOptions";
	
	module( "Destroy", {
		setup: function() {
			$( "#grid-head-body" ).syoDataGrid();
		}
	});
	test( "destroy - classes", 34, function() {
		var $dataGrid = $( "#grid-head-body" );
		
		$dataGrid.syoDataGrid();
		ok( $dataGrid.data( optionsPrefix ) !== undefined, "The options should be set" );
		
		$dataGrid.syoDataGrid("destroy");
		strictEqual( $dataGrid.attr( "class" ), "", "The main container should have no class" );
		$dataGrid
			.find( "*" )
			.each(function() {
				strictEqual( $( this ).attr("class"), undefined, "No element should have any class" );
			});
		strictEqual( $dataGrid.data( optionsPrefix ), undefined, "Options data should be undefined" );
	});
	test( "destroy - events:click", 5, function() {
		var $dataGrid = $( "#grid-head-body" );
		
		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:first" ).trigger( "click" );
		$dataGrid.syoDataGrid( "destroy" );
		
		$dataGrid
			.find( "div:last tr" )
			.each(function() {
				strictEqual( $(this).attr( "class" ), undefined, "No TR should have any class" );
			});
	});
	test( "destroy - events:mouseenter", 5, function() {
		var $dataGrid = $( "#grid-head-body" );
		
		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:eq(1)" ).trigger( "mouseenter" );
		$dataGrid.syoDataGrid( "destroy" );
		
		$dataGrid
			.find( "div:last tr" )
			.each(function() {
				strictEqual( $( this ).attr( "class" ), undefined, "No TR should have any class" );
			});
	});
	test( "destroy - events:mouseleave", 5, function() {
		var $dataGrid = $( "#grid-head-body" );
		
		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:eq(1)" ).trigger( "mouseleave" );
		$dataGrid.syoDataGrid( "destroy" );
		
		$dataGrid.find( "div:last tr" ).each(function() {
			strictEqual( $( this ).attr( "class" ), undefined, "No TR should have any class" );
		});
	});
}());