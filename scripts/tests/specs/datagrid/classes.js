(function() {
	"use strict";
	
	module( "Classes", {
		setup: function() {
			$( "#grid-head-body" ).syoDataGrid();
		}
	});
	test( "Default classes - no event", 9, function() {
		var $el = $( "#grid-head-body" ),
			$trs = $el.children( "div:last" ).find( "tr" );
		
		$trs.each(function() {
			ok( $( this ).hasClass( "syo-datagrid-state-default" ), "All TRs should have default state" );
		});
		
		ok( $el.hasClass( "syo-datagrid" ), "Main container default class" );
		ok( $el.children( "div:eq(0)" ).hasClass( "syo-datagrid-header" ), "Header default class" );
		ok( $el.children( "div:eq(1)" ).hasClass( "syo-datagrid-body" ), "Body default class" );
		ok( $el.find( "div:eq(1) > div:first" ).hasClass( "syo-datagrid-rowcont" ), "Rows container default class" );
	});
	test( "Default classes - event:mouseenter", function() {
		var $el = $( "#grid-head-body" ),
			$trs = $el.children( "div:last" ).find( "tr" ),
			$tr = $trs.slice( 0, 1 );
		
		$tr.trigger( "mouseenter" );
		ok( $tr.hasClass( "syo-datagrid-state-hover" ), "Hover class" );
		$tr.siblings().each(function() {
			ok( $( this ).hasClass( "syo-datagrid-state-default" ), "All siblings should have the default class" );
		});
		
	});
	test("Default classes - event:mouseleave", function() {
		var $el = $( "#grid-head-body" ),
			$trs = $el.children( "div:last" ).find( "tr" ),
			$tr = $trs.slice( 0, 1 );
		
		$tr.trigger( "mouseleave" );
		ok( $tr.hasClass( "syo-datagrid-state-default" ), "Default class");
		$tr.siblings().each(function() {
			ok( $( this ).hasClass( "syo-datagrid-state-default" ), "All siblings should have the default class" );
		});
	});
	test("Default classes - event:click", function() {
		var $el = $( "#grid-head-body" ),
			$trs = $el.children( "div:last" ).find( "tr" ),
			$tr = $trs.slice( 0, 1 );
		
		$tr.trigger("click");
		ok( $tr.hasClass( "syo-datagrid-state-clicked" ), "Clicked class" );
		$tr.siblings().each(function() {
			ok( $( this ).hasClass( "syo-datagrid-state-default" ), "All siblings should have the default class" );
		});
	});
}());