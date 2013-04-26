(function( $ ) {
	"use strict";

	module( "Métodos", {
		setup: function() {
			this.element = $("#popover").syoPopover();
			this.popover = this.element.syoPopover("widget");
		},
		teardown: function() {
			this.element.syoPopover("destroy");
		}
	});

	test( "open", 1, function() {
		this.element.syoPopover("open");
		ok( this.popover.is(":visible"), "deve exibir o popover" );
	});

	test( "close", 1, function() {
		this.element.syoPopover("close");

		ok( !this.popover.is(":visible"), "deve fechar o popover" );
	});

	test( "isOpen", 2, function() {
		ok( !this.element.syoPopover("isOpen"),
			"deve retornar false quando o popover não está aberto" );

		this.element.syoPopover("open");
		ok( this.element.syoPopover("isOpen"),
			"deve retornar true quando o popover está aberto" );
	});

})( jQuery );