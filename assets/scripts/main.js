(function( $ ) {
	"use strict";

	$( document ).ready(function() {

		// Inicializa o sistema de demonstração de códigos
		initPrettify();

		// Instancia os plugins jQuery UI via property data-widget
		initAutoWidget();

		// Executa processos adicionais aos componentes Javascript
		enhanceJSComponents();

		// Monta a documentação dos icones, separado em categorias
		buildIcons();
	});

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

		// Tags "pre" são usadas com HTML entities escape mas devem respeitar a identação padrão da página
		$( "pre.prettyprint" ).each(function() {
			var $pre = $( this );
			$pre.html( trim( $pre.html() ) );
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
			var activeElement = $( ".popover-component" ).syoPopover( "option", "element" );
			if ( activeElement === this && $( ".popover-component" ).syoPopover( "isOpen" ) ) {
				$( ".popover-component" ).syoPopover( "close" );
			} else {
				$( ".popover-component" ).syoPopover( "option", {
					element: this,
					position: $( this ).data("position")
				}).syoPopover( "open" );
			}
		});
	}

	function buildIcons() {
		var xhr;
		var $container = $( "#icons-container" );

		if ( !$container.length ) {
			return;
		}

		xhr = $.get( "assets/json/icons.json" );

		xhr.done(function( data ) {
			$.each( data, function( cat, catObj ) {
				var $header = $( "<div class='syo-header syo-header-ruler'><h3></h3></div>" );
				var $list = $( "<ul class='icons' />" );

				$header.find( "h3" ).append( cat );
				$header.find( "h3" ).append( " <small>" + catObj.description + "</small>" );
				$header.appendTo( $container );

				$.each( catObj.icons, function( i, icon ) {
					var $icon = $( "<i />" ).addClass( "icon-" + icon );
					$( "<li />" ).append( $icon ).append( " icon-" + icon ).appendTo( $list );
				});

				$list.appendTo( $container );
			});
		});

		$( "#icon-search" ).keyup(function() {
			var val = this.value.replace( /\s/, "-" );
			var regex = new RegExp( "^icon-.*?" + val + ".*$", "i" );
			var $li = $container.find( "li" ).hide();

			$li.filter(function() {
				return regex.test( $.trim( this.textContent ) );
			}).show();
		});
	}

	function trim( html ) {
		var regex;

		// Usa o maior numero como indentação inicial, para na iteração descobrir com
		// facilidade qual linha tem a menor indentação.
		var indentation = Number.MAX_VALUE;

		// Replace de tabs por 4 espaços + split em cada linha
		var lines = html.replace( /\t/g, "    " ).split( "\n" );

		lines.forEach(function( line ) {
			var match;

			// Ignora linhas em branco
			if ( !line || /^\s+$/.test( line ) ) {
				return;
			}

			match = line.match( /^\s+/ );
			indentation = Math.min( match ? match[ 0 ].length : 0, indentation );
		});

		regex = new RegExp( "^\\s{" + indentation + "}" );
		html = lines.map(function( line ) {
			return line.replace( regex, "" );
		}).join( "\n" ).trim();

		return html;
	}

}( jQuery ));
