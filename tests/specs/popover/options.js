(function( $ ) {
	"use strict";

	module( "Opções", {
		setup: function() {
			this.button = $("#button").syoPopover();
			this.popover = this.button.syoPopover("widget");
			this.title = $("#popover-title");
			this.content = $("#popover-content");
		},
		destroy: function() {
			this.button.syoPopover("destroy");
		}
	});

	test( "title", function() {
		this.button.syoPopover( "option", "title", "Teste" );
		strictEqual( this.popover.find(".syo-popover-title").text(), "Teste", "deve setar o título no popover" );

		this.button.syoPopover( "option", "title", this.title );
		strictEqual( this.popover.find(".syo-popover-title").text(), "Teste", "seta o título a partir do HTML de um objeto jQuery" );

		this.button.syoPopover( "option", "title", this.title.get( 0 ) );
		strictEqual( this.popover.find(".syo-popover-title").text(), "Teste", "seta o título a partir do HTML de um elemento DOM" );
	});

	test( "content", 2, function() {
		this.button.syoPopover( "option", "content", "Conteudo" );
		strictEqual( this.popover.find(".syo-popover-content").text(), "Conteudo", "deve setar o conteúdo no popover" );

		this.button.syoPopover( "option", "content", this.content );
		strictEqual( this.popover.find(".syo-popover-content").has( this.content ).length, 1, "seta um objeto jQuery como conteúdo do popover" );
	});

})( jQuery );