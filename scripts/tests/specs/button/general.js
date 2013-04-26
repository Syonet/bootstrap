(function( $ ) {
	"use strict";

	module("Geral");

	test( "markup - button", 1, function() {
		var button = $("#button").syoButton();
		ok( button.is(".syo-button"), "elemento é .syo-button" );
	});

	test( "markup - buttonset", 2, function() {
		var buttonset = $("#buttonset").syoButton();

		ok( buttonset.is(".syo-buttonset"), "elemento é .syo-buttonset" );
		strictEqual( buttonset.find(".syo-button").length, 3,
			"todos botões filhos são .syo-button" );
	});

})( jQuery );