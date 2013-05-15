(function() {
	"use strict";

	module( "Destroy", {
		setup: function() {
			$( "#grid-head-body" ).syoDataGrid();
		}
	});
	test( "destroy - classes", function() {
		expect( 2 );

		var data;
		var assertions = true;
		var $dataGrid = $( "#grid-head-body" );

		$dataGrid.syoDataGrid();
		data = $.extend( {}, $dataGrid.data( "syoSyoDataGrid" ) );
		$dataGrid.syoDataGrid("destroy");

		ok( !$dataGrid.hasClass( "syo-datagrid" ), "The main container should not have the widget class" );

		// Faz loop pelos componentes do DataGrid, procurando por alguma classe do widget
		$.each( data.components, function( key, $component ) {
			$component.each(function() {
				assertions = assertions && ( $( this ).attr( "class" ) || "" ).indexOf( "syo-datagrid" ) == -1;
			});
		});

		ok( assertions, "No elements should have widget classes" );
	});
	test( "destroy - events: click", function() {
		expect( 1 );

		var assertions = true;
		var $dataGrid = $( "#grid-head-body" );

		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:first" ).trigger( "click" );
		$dataGrid.syoDataGrid( "destroy" );

		$dataGrid
			.find( "div:last tr" )
			.each(function() {
				assertions = assertions && ( $( this ).attr( "class" ) || "" ).indexOf( "syo-datagrid" ) == -1;
			});

		ok( assertions, "No TRs should have widget classes" );
	});
	test( "destroy - events: mouseenter", function() {
		expect( 1 );

		var assertions = true;
		var $dataGrid = $( "#grid-head-body" );

		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:eq(1)" ).trigger( "mouseenter" );
		$dataGrid.syoDataGrid( "destroy" );

		$dataGrid.find( "div:last tr" ).each(function() {
				assertions = assertions && ( $( this ).attr( "class" ) || "" ).indexOf( "syo-datagrid" ) == -1;
			});

		ok( assertions, "No TRs should have widget classes" );
	});
	test( "destroy - events: mouseleave", function() {
		expect( 1 );

		var assertions = true;
		var $dataGrid = $( "#grid-head-body" );

		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:eq(1)" ).trigger( "mouseleave" );
		$dataGrid.syoDataGrid( "destroy" );

		$dataGrid.find( "div:last tr" ).each(function() {
			assertions = assertions && ( $( this ).attr( "class" ) || "" ).indexOf( "syo-datagrid" ) == -1;
		});

		ok( assertions, "No TRs should have widget classes" );
	});
}());