(function() {
	"use strict";
	
	var optionsPrefix = "syoDataGridOptions";
	
	module( "Destroy", {
		setup: function() {
			$( "#grid-head-body" ).syoDataGrid();
		}
	});
	test( "destroy - classes", function() {
		expect( 34 );
		
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
	test( "destroy - events:click", function() {
		expect( 5 );
		
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
	test( "destroy - events:mouseenter", function() {
		expect( 5 );
		
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
	test( "destroy - events:mouseleave", function() {
		expect( 5 );
		
		var $dataGrid = $( "#grid-head-body" );
		
		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:eq(1)" ).trigger( "mouseleave" );
		$dataGrid.syoDataGrid( "destroy" );
		
		$dataGrid.find( "div:last tr" ).each(function() {
			strictEqual( $( this ).attr( "class" ), undefined, "No TR should have any class" );
		});
	});
}());