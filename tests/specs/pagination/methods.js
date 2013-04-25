(function( $ ) {
	"use strict";

	module( "Métodos", {
		setup: function() {
			this.pagination = $("#pagination").syoPagination({
				items: 3
			});
		},
		teardown: function() {
			this.pagination.syoPagination("destroy");
		}
	});

	test( "disable", 3, function() {
		this.pagination.syoPagination( "disable", 1 );
		ok( this.pagination.find("li").eq( 1 ).is(".syo-disabled"),
			"deve desabilitar o indice passado por parâmetro" );
		this.pagination.syoPagination("refresh");

		this.pagination.syoPagination( "disable", [ 0, 1 ] );
		strictEqual( this.pagination.find("li.syo-disabled").length, 2,
			"deve desabilitar a lista de indices passada por parâmetro" );
		this.pagination.syoPagination("refresh");

		this.pagination.syoPagination( "disable" );
		strictEqual( this.pagination.find("li.syo-disabled").length, 3,
			"deve desabilitar todos os itens, se não passar parâmetro" );
	});

	test( "enable", 3, function() {
		this.pagination.syoPagination("disable");

		this.pagination.syoPagination( "enable", 1 );
		ok( this.pagination.find("li").eq( 1 ).is(":not(.syo-disabled)"),
			"deve habilitar o indice passado por parâmetro" );
		this.pagination.syoPagination("refresh").syoPagination("disable");

		this.pagination.syoPagination( "enable", [ 0, 1 ] );
		strictEqual( this.pagination.find("li:not(.syo-disabled)").length, 2,
			"deve habilitar a lista de indices passada por parâmetro" );
		this.pagination.syoPagination("refresh").syoPagination( "disable" );

		this.pagination.syoPagination( "enable" );
		strictEqual( this.pagination.find("li:not(.syo-disabled)").length, 3,
			"deve habilitar todos os itens, se não passar parâmetro" );
	});

	test( "refresh", function() {
		var before = this.pagination.find("li:eq(0)");

		this.pagination
			.syoPagination( "option", "active", 2 )
			.syoPagination("refresh");

		ok( !this.pagination.find("li:eq(0)").is( before ),
			"deve recriar a lista ao chamar o método" );
		strictEqual( this.pagination.syoPagination( "option", "active" ), 0,
			"a página ativa deve ser a primeira" );
	});

})( jQuery );