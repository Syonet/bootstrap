(function() {
	"use strict";

	function hasWidgetClass( $tr ) {
		return ( $tr.attr( "class" ) || "" ).indexOf( "syo-datagrid" ) === -1;
	}

	module( "Destroy", {
		setup: function() {
			$( "#grid-head-body" ).syoDataGrid();
		}
	});
	test( "classes", function() {
		expect( 2 );

		var data;
		var assertions = true;
		var $dataGrid = $( "#grid-head-body" );

		$dataGrid.syoDataGrid();
		data = $.extend( {}, $dataGrid.data( "syoSyoDataGrid" ) );
		$dataGrid.syoDataGrid("destroy");

		ok( !$dataGrid.hasClass( "syo-datagrid" ), "O elemento principal não pode ter classes do syoDataGrid" );

		// Faz loop pelos componentes do DataGrid, procurando por alguma classe do widget
		$.each( data.components, function( key, $component ) {
			$component.each(function() {
				assertions = assertions && hasWidgetClass( $( this ) );
			});
		});

		ok( assertions, "Nenhum elemento deve ter classes do syoDataGrid" );
	});
	test( "evento click", function() {
		expect( 1 );

		var assertions = true;
		var $dataGrid = $( "#grid-head-body" );

		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:first" ).trigger( "click" );
		$dataGrid.syoDataGrid( "destroy" );

		$dataGrid
			.find( "div:last tr" )
			.each(function() {
				assertions = assertions && hasWidgetClass( $( this ) );
			});

		ok( assertions, "Nenhum elemento deve ter classes do syoDataGrid" );
	});
	test( "evento mouseenter", function() {
		expect( 1 );

		var assertions = true;
		var $dataGrid = $( "#grid-head-body" );

		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:eq(1)" ).trigger( "mouseenter" );
		$dataGrid.syoDataGrid( "destroy" );

		$dataGrid.find( "div:last tr" ).each(function() {
				assertions = assertions && hasWidgetClass( $( this ) );
			});

		ok( assertions, "Nenhum elemento deve ter classes do syoDataGrid" );
	});
	test( "evento mouseleave", function() {
		expect( 1 );

		var assertions = true;
		var $dataGrid = $( "#grid-head-body" );

		$dataGrid.syoDataGrid();
		$dataGrid.find( "div:last tr:eq(1)" ).trigger( "mouseleave" );
		$dataGrid.syoDataGrid( "destroy" );

		$dataGrid.find( "div:last tr" ).each(function() {
			assertions = assertions && hasWidgetClass( $( this ) );
		});

		ok( assertions, "Nenhum elemento deve ter classes do syoDataGrid" );
	});
}());