(function( $ ) {
	"use strict";
	
	module( "Opções", {
		setup: function() {
			this.element = $( "#popover" ).syoPopover();
			this.popover = this.element.syoPopover( "widget" );
			this.title = $( "#popover-title" );
		},
		teardown: function() {
			this.element.syoPopover( "destroy" );
		}
	});
	
	test( "title", function() {
		expect( 3 );
		
		this.element.syoPopover( "option", "title", "Teste" );
		strictEqual( this.popover.find( ".syo-popover-title" ).text(), "Teste", "deve setar o título no popover" );
		
		this.element.syoPopover( "option", "title", this.title );
		strictEqual( this.popover.find( ".syo-popover-title" ).text(), "Teste", "seta o título a partir do HTML de " +
				"um objeto jQuery" );
		
		this.element.syoPopover( "option", "title", this.title.get( 0 ) );
		strictEqual( this.popover.find( ".syo-popover-title" ).text(), "Teste", "seta o título a partir do HTML de " +
				"um elemento DOM" );
	});
	
	/**
	 * 1. Porque nós não incluímos o CSS, onde define que o popover virá com display: none, temos
	 * que ocultar manualmente aqui.
	 */
	
	test( "show", function() {
		expect( 1 );
		
		var popover = this.popover.hide(); /* 1 */
		this.element
			.syoPopover( "option", "show", 300 )
			.syoPopover("open");
			
		ok( popover.is( ":animated" ), "popover deve ser animado ao abrir" );
		popover.stop().hide();
	});
	
	test( "hide", function() {
		expect( 1 );
		
		var popover = this.popover.show(); /* 1 */
		this.element
			.syoPopover( "option", "hide", 300 )
			.syoPopover( "close" );
			
		ok( popover.is( ":animated" ), "popover deve ser animado ao fechar" );
		popover.stop().show();
	});
	
}( jQuery ));
