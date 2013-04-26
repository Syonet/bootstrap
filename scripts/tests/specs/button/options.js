(function( $ ) {
	"use strict";

	module( "Opções", {
		setup: function() {
			this.button = $("#button").syoButton();
			this.buttonset = $("#buttonset").syoButton({
				multi: true
			});
		},
		teardown: function() {
			this.button.syoButton("destroy");
			this.buttonset.syoButton("destroy");
		}
	});

	test( "multi", 2, function() {
		this.buttonset.find(".syo-button").trigger("click");
		strictEqual( this.buttonset.find(".syo-button.syo-active").length, 3,
			"quando opção = true, deve poder ativar mais de um botão ao mesmo tempo" );

		this.buttonset.syoButton( "option", "multi", false );
		this.buttonset.find(".syo-button").trigger("click");
		strictEqual( this.buttonset.find(".syo-button.syo-active").length, 1,
			"quando opção = false, deve poder ativar apenas um botão ao mesmo tempo" );
	});

	test( "toggling", 3, function() {
		this.button.trigger("click");
		ok( this.button.is(".syo-active"), "quando opção = true, o botão deve ficar ativado" );

		this.button.syoButton( "option", "toggling", false );
		ok( !this.button.is(".syo-active"),
			"quando opção setada para false, deve desativar o botão" );

		var btns = this.buttonset.find(".syo-button").trigger("click");
		this.buttonset.syoButton( "option", "toggling", false );

		ok(
			btns.eq( 0 ).is(".syo-active") && ( btns.filter(".syo-active:gt(0)" ).length === 0 ),
			"ao setar opção para false em buttonset, deve manter apenas o primeiro botão ativado"
		);
	});

})( jQuery );