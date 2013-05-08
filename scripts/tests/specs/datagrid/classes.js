(function() {
	"use strict";
	
	module( "Classes", {
		setup: function() {
			$( "#grid-head-body, #grid-full" ).syoDataGrid();
		}
	});
	test( "Classes padrões - sem evento", function() {
		expect( 9 );
		
		var $el = $( "#grid-head-body" );
		var $trs = $el.children( "div:last" ).find( "tr" );
		
		$trs.each(function() {
			ok( $( this ).hasClass( "syo-datagrid-state-default" ), "All TRs should have default state" );
		});
		
		ok( $el.hasClass( "syo-datagrid" ), "Classe padrão do container principal" );
		ok( $el.children( "div:eq(0)" ).hasClass( "syo-datagrid-header" ), "Classe padrão do header" );
		ok( $el.children( "div:eq(1)" ).hasClass( "syo-datagrid-body" ), "Classe padrão do body" );
		ok( $el.find( "div:eq(1) > div:first" ).hasClass( "syo-datagrid-rowcont" ),
				"Classe padrão do container das linhas" );
	});
	test( "Classes padrões - evento:mouseenter", function() {
		expect( 5 );
		
		var $el = $( "#grid-head-body" );
		var $trs = $el.children( "div:last" ).find( "tr" );
		var $tr = $trs.slice( 0, 1 );
		
		$tr.trigger( "mouseenter" );
		ok( $tr.hasClass( "syo-datagrid-state-hover" ), "Classe hover" );
		$tr.siblings().each(function() {
			ok( $( this ).hasClass( "syo-datagrid-state-default" ),
					"Todos os elementos siblings devem possuir a classe padrão" );
		});
		
	});
	test( "Classes padrões - evento:mouseleave", function() {
		expect( 5 );
		
		var $el = $( "#grid-head-body" );
		var $trs = $el.children( "div:last" ).find( "tr" );
		var $tr = $trs.slice( 0, 1 );
		
		$tr.trigger( "mouseleave" );
		ok( $tr.hasClass( "syo-datagrid-state-default" ), "Classe padrão");
		$tr.siblings().each(function() {
			ok( $( this ).hasClass( "syo-datagrid-state-default" ), "Todos os siblings devem possuir a classe padrão" );
		});
	});
	test( "Não deve escutar os eventos em trs dentro do tfoot, ele não deve ser usado para manipulação", function() {
		expect( 2 );
		
		var hoverClass = "syo-datagrid-state-hover";
		var $bodyTR = $( "#grid-full tbody tr:first" );
		var $footerTR = $( "#grid-full tfoot tr:first" );
		
		$bodyTR.trigger( "mouseenter" );
		ok( $bodyTR.hasClass( hoverClass ), "Confirma que a classe padrão está funcionando para testar lá embaixo" );
		
		$footerTR.trigger( "mouseenter" );
		ok( !$footerTR.hasClass( hoverClass ) );
		
	});
	test( "Classes padrões - evento:click", function() {
		expect( 5 );
		
		var $el = $( "#grid-head-body" );
		var $trs = $el.children( "div:last" ).find( "tr" );
		var $tr = $trs.slice( 0, 1 );
		
		$tr.trigger( "click" );
		ok( $tr.hasClass( "syo-datagrid-state-clicked" ), "Classe de estado de click" );
		$tr.siblings().each(function() {
			ok( $( this ).hasClass( "syo-datagrid-state-default" ),
					"Todos os siblings devem possuir a classe padrãos" );
		});
	});
}());