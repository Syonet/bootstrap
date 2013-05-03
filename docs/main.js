(function( $ ) {
	"use strict";
	
	$( document ).ready(function() {
		
		// Inicializa o sistema de demonstração de códigos
		initPrettify();
		
		// Instancia os plugins jQuery UI via property data-widget
		initAutoWidget();
		
		// Executa processos adicionais aos componentes Javascript
		enhanceJSComponents();
		
		// Ajusta o posicionamento do menu lateral
		initStandaloneAffix();
		
	});
	
	function initStandaloneAffix() {
		$( window ).scroll(function() {
			var main = $( "[role='main']" );
			var mainPos = main.offset().top;
			var sidebar = $( "#sidebar" );
			var firstSection = main.find( "article:first" );
			var top = $( window ).scrollTop();
			
			if ( top > mainPos ) {
				firstSection.css( "padding-top", 45 );
				sidebar.css( "top", top - mainPos + 45 );
			} else {
				firstSection.css( "padding-top", 0 );
				sidebar.css( "top", 15 );
			}
		});
	}
	
	function initPrettify() {
		// Faz o escape de todo o código HTML do prettyprint para não precisar escrever no código
		// o escape das tags dos elementos html.
		$( "div.prettyprint" ).each(function() {
			var $div, $pre, encodedHTML; 
			
			$div = $( this );
			encodedHTML = $div
				.html()
				.replace( /&/g, "&amp;" )
				.replace( /"/g, "&quot;" )
				.replace( /'/g, "&#39;" )
				.replace( /</g, "&lt;" )
				.replace( />/g, "&gt;" );
			
			encodedHTML = trim( encodedHTML );
			
			$pre = $( "<pre class='prettyprint'></pre>" )
				.html( encodedHTML )
				.insertAfter( $div ); // Deve respeitar a localização do elemento original
			$div.remove();
			$pre.show();
			
		});
		
		// Inicializa o Google Prettify
		if ( window.prettyPrint ) {
			$( "pre.prettyprint" ).addClass( "linenums" );
			window.prettyPrint();
		}
	}
	
	function initAutoWidget() {
		$("[data-widget]").each(function() {
			var data = $( this ).data();
			$( this )[ data.widget ]( data );
		});
	}
	
	function enhanceJSComponents() {
		$( ".open-dialog" ).button({
			icons: {
				primary: "ui-icon-newwin"
			}
		}).click(function() {
			$( ".dialog" ).dialog( "open" );
		});
		
		$( ".input-autocomplete" ).autocomplete( "option", "source", [
			"C", "C#", "C++", "COBOL",
			"Java", "JavaScript", "Lua", "Perl",
			"PHP", "Python", "Ruby"
		]);
		
		// Elementos que abrem o popover
		$( ".popover-trigger" ).click(function() {
			$( ".popover-component" ).syoPopover( "option", {
				element: this,
				position: $( this ).data("position")
			}).syoPopover( "open" );
		});
	}
	
	function trim( html ) {
		var identationIndex, lines;
		
		if ( html[ 0 ] === "\n" ) {
			html = html.substring( 1 );
		}
		
		lines = html.split( "\n" );
		
		$.each( lines, function( index, line ) {
			var charIndex = 0;
			
			if ( identationIndex === undefined ) {
				identationIndex = 0;
				for ( ; charIndex < line.length; charIndex++ ) {
					if ( line[ charIndex ] === "\t" ) {
						identationIndex += 1;
					} else {
						break;
					}
				}
			}
			
			lines[ index ] = line.substring( identationIndex ).replace( /\t/g, "    " );
		});
		
		return lines.join( "\n" );
	}
	
	window.trim = trim;

}( jQuery ));
