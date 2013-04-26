(function( $ ) {
	"use strict";

	module( "Geral", {
		setup: function() {
			this.element = $("#popover").syoPopover();
			this.popover = this.element.syoPopover("widget");
		},
		teardown: function() {
			this.element.syoPopover("destroy");
		}
	});

	test( "markup", 5, function() {
		ok( this.popover.is(".syo-popover"), "elemento é .syo-popover" );
		strictEqual( this.popover.find(".syo-popover-titlebar").length, 1,
			"tem uma barra de título" );
		strictEqual( this.popover.find(".syo-popover-titlebar > .syo-popover-title").length, 1,
			"tem elemento próprio para o título" );
		strictEqual( this.popover.find(".syo-popover-titlebar > .syo-popover-close").length, 1,
			"tem icone para fechar o popover" );
		strictEqual( this.popover.find(".syo-popover-content").length, 1,
			"tem elemento próprio para o conteúdo" );
	});

})( jQuery );