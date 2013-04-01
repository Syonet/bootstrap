(function( $ ) {
	"use strict";

	module( "Eventos", {
		setup: function() {
			this.pagination = $("#pagination").syoPagination({
				size: 3
			});
		},
		teardown: function() {
			this.pagination.syoPagination("destroy");
		}
	});

	test( "activate", 4, function() {
		this.pagination.syoPagination( "option", "activate", function( e, ui ) {
			ok( true, "callback deve ser chamado ao setar a opção active" );

			strictEqual( e.type, "syopaginationactivate", "Tipo do evento deve ser syopaginationactivate" );

			ok( ui.oldItem.is(":not(.syo-active)"), "deve receber por parâmetro o item anteriormente ativo" );
			ok( ui.newItem.is(".syo-active"), "deve receber por parâmetro o item agora ativo" );
		}).syoPagination( "option", "active", 1 );
	});

	test( "beforeActivate", 4, function() {
		this.pagination.syoPagination( "option", "beforeActivate", function( e, ui ) {
			ok( true, "callback deve ser chamado ao setar a opção active" );

			strictEqual( e.type, "syopaginationbeforeactivate", "Tipo do evento deve ser syopaginationbeforeactivate" );

			ok( ui.oldItem.is(".syo-active"), "deve receber por parâmetro o item ativo antes de chamar activate" );
			ok( ui.newItem.is(":not(.syo-active)"), "deve receber por parâmetro o item que será ativado" );

			return false;
		}).syoPagination( "option", "active", 1 );
	});

})( jQuery );