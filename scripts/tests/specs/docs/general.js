(function() {
	"use strict";
	
	module( "Trim" );
	test( "Deve remover a identação do HTML", function() {
		var html = "\t\t\t<div>\n\t\t\t\t<b>\n\t\t\t\t</b>\n\t\t\t</div>";
		var result = window.trim( html );
		
		strictEqual( result, "<div>\n\t<b>\n\t</b>\n</div>" );
	});
	test( "Deve desconsiderar caracteres de quebra de linha antes da identação", function() {
		var html = "\n<h1>...</h1>";
		var result = window.trim( html );
		
		strictEqual( result, "<h1>...</h1>" );
	});
}());