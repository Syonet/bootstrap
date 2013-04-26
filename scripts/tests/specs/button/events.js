(function( $ ) {
	"use strict";

	module( "Eventos", {
		setup: function() {
			this.button = $("#button").syoButton();
		},
		teardown: function() {
			this.button.syoButton("destroy");
		}
	});

	test( "toggle", 3, function() {
		this.button.syoButton( "option", "toggle", function( e, ui ) {
			ok( true, "callback deve ser chamado ao clicar o botão" );

			strictEqual( e.type, "syobuttontoggle", "Tipo do evento deve ser syobuttontoggle" );
			strictEqual( ui.active, true, "deve receber por parâmetro se o item está agora " +
				"ativado ou desativado (quando toggling = true)");

		}).trigger("click");
	});

	test( "beforeToggle", 3, function() {
		this.button.syoButton( "option", "beforeToggle", function( e, ui ) {
			ok( true, "callback deve ser chamado ao clicar o botão" );
			strictEqual( e.type, "syobuttonbeforetoggle",
				"Tipo do evento deve ser syobuttonbeforetoggle" );
			strictEqual( ui.active, false, "deve receber por parâmetro se o item estava ativado " +
				"ou desativado (quando toggling = true)" );

			return false;
		}).trigger("click");
	});

})( jQuery );