(function( $ ) {
	"use strict";

	module( "Métodos", {
		setup: function() {
			this.button = $("#button").syoButton();
			this.buttonset = $("#buttonset").syoButton();
		},
		teardown: function() {
			this.button.syoButton("destroy");
			this.buttonset.syoButton("destroy");
		}
	});

	test( "disable", 3, function() {
		this.buttonset.syoButton( "disable", 1 );
		ok( this.buttonset.find(".syo-button").eq( 1 ).is(".syo-disabled"),
			"deve desabilitar o indice passado por parâmetro" );
		this.buttonset.syoButton("refresh");

		this.buttonset.syoButton( "disable", [ 0, 1 ] );
		strictEqual( this.buttonset.find(".syo-button.syo-disabled").length, 2,
			"deve desabilitar a lista de indices passada por parâmetro" );
		this.buttonset.syoButton("refresh");

		this.buttonset.syoButton( "disable" );
		strictEqual( this.buttonset.find(".syo-button.syo-disabled").length, 3,
			"deve desabilitar todos os itens, se não passar parâmetro" );
	});

	test( "enable", 3, function() {
		this.buttonset.syoButton("disable");

		this.buttonset.syoButton( "enable", 1 );
		ok( this.buttonset.find(".syo-button").eq( 1 ).is(":not(.syo-disabled)"),
			"deve habilitar o indice passado por parâmetro" );
		this.buttonset.syoButton("refresh").syoButton("disable");

		this.buttonset.syoButton( "enable", [ 0, 1 ] );
		strictEqual( this.buttonset.find(".syo-button:not(.syo-disabled)").length, 2,
			"deve habilitar a lista de indices passada por parâmetro" );
		this.buttonset.syoButton("refresh").syoButton( "disable" );

		this.buttonset.syoButton( "enable" );
		strictEqual( this.buttonset.find(".syo-button:not(.syo-disabled)").length, 3,
			"deve habilitar todos os itens, se não passar parâmetro" );
	});

	test( "refresh", function() {
		this.buttonset.find(".syo-button:eq(0)").trigger("click");
		this.buttonset.syoButton( "disable", 1 ).syoButton("refresh");

		strictEqual( this.buttonset.find(".syo-button.syo-disabled").length, 0,
			"não deve manter nenhum item desabilitado" );
		strictEqual( this.buttonset.find(".syo-button.syo-active").length, 0,
			"não deve manter nenhum item ativado" );
	});

})( jQuery );