(function( $ ) {
	"use strict";
	
	module( "Eventos", {
		setup: function() {
			this.popover = $( "#popover" ).syoPopover();
		},
		teardown: function() {
			this.popover.syoPopover( "destroy" );
		}
	});
	
	test( "não deve executar o evento 'tap' no title sem que o aparelho suporte mobile", function() {
		$( "#popover" ).syoPopover( "open" );
		ok( $( "#popover" ).is( ":visible" ), "Confirma que está inicializando com visibilidade" );
		
		$( ".syo-popover-titlebar" ).trigger( "tap" );
		ok( $( "#popover" ).is( ":visible" ), "Deve continuar visível" );
	});
	
}( jQuery ));
