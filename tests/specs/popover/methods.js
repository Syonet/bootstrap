(function( $ ) {
	"use strict";

	module( "Métodos", {
		setup: function() {
			this.button = $("#button").syoPopover();
			this.popover = this.button.syoPopover("widget");
		},
		destroy: function() {
			this.button.syoPopover("destroy");
		}
	});

	/**
	 * 1. Porque nós não incluímos o CSS (onde está o display: none do popover), escondemos ele manualmente.
	 */

	test( "open", 1, function() {
		var context = this;

		this.popover.hide(); /* 1 */
		this.button.syoPopover("open");

		stop();
		setTimeout(function() {
			ok( context.button.syoPopover("isOpen"), "deve exibir o popover" );
			start();
		}, 300);
	});

	test( "close", 1, function() {
		var context = this;
		this.button.syoPopover("close");

		stop();
		setTimeout(function() {
			ok( !context.button.syoPopover("isOpen"), "deve fechar o popover" );
			start();
		}, 300);
	});

	test( "isOpen", 2, function() {
		this.popover.hide();  /* 1 */
		ok( !this.button.syoPopover("isOpen"), "deve retornar false quando o popover não está aberto" );

		this.popover.show();
		ok( this.button.syoPopover("isOpen"), "deve retornar true quando o popover está aberto" );
	});

})( jQuery );