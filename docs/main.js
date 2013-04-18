(function( $ ) {
	"use strict";

	var main, mainPos, sidebar, firstSection;

	$( document ).ready(function() {
		// Inicializa o Google Prettify
		$("pre.prettyprint").addClass("linenums");
		window.prettyPrint && window.prettyPrint();

		// Inicializa algumas vars...
		main            = $("[role='main']");
		mainPos         = main.offset().top;
		sidebar         = $("#sidebar");
		firstSection    = main.find("article:first");

		// Instancia os plugins jQuery UI
		$("[data-widget]").each(function() {
			var data = $( this ).data();
			$( this )[ data.widget ]( data );
		});

		// Realiza alguns fixes relativos aos plugins jQuery UI
		jQueryUIAdjusts();

		// Ajusta o posicionamento do menu lateral
		sidebarScrolling.call( window );
		$( window ).scroll( sidebarScrolling );
	});

	function sidebarScrolling() {
		var top = $( this ).scrollTop();

		if ( top > mainPos ) {
			firstSection.css( "padding-top", 45 );
			sidebar.css( "top", top - mainPos + 45 );
		} else {
			firstSection.css( "padding-top", 0 );
			sidebar.css( "top", 15 );
		}
	}

	function jQueryUIAdjusts() {
		$(".open-dialog").button({
			icons: {
				primary: "ui-icon-newwin"
			}
		}).click(function() {
			$(".dialog").dialog("open");
		});

		// Exemplos para o autocomplete
		$(".input-autocomplete").autocomplete( "option", "source", [
			"C", "C#", "C++", "COBOL",
			"Java", "JavaScript", "Lua", "Perl",
			"PHP", "Python", "Ruby"
		]);

		$(".pagination-component").syoPagination( "disable", 3 );

		// Elementos que abrem o popover
		$(".popover-trigger").click(function() {
			$(".popover-component").syoPopover( "option", {
				element:    this,
				position:   $( this ).data("position")
			}).syoPopover("open");
		});
	}

})( jQuery );