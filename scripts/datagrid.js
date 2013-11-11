(function( $, window ) {
	"use strict";

	var instances = [];
	var $template = $(
		"<div class='syo-datagrid'>" +
			"<table class='syo-datagrid-header'><colgroup></colgroup></table>" +
			"<div class='syo-datagrid-body'><table><colgroup></colgroup></table></div>" +
			"<table class='syo-datagrid-helper'><colgroup></colgroup></table>" +
		"</div>"
	);

	$( window ).on( "resize", function() {
		instances.forEach(function( instance ) {
			instance._resize.call( instance );
		});
	});

	$.widget( "syo.syoDataGrid", {
		version: "@VERSION",
		originalPosition: null,
		options: {
			// Callbacks
			activate: null,
			beforeActivate: null
		},

		// Criação/adaptação da estrutura do grid
		_create: function() {
			var parent;

			if ( !this.element.is( "table" ) ) {
				throw new Error( "Não se pode utilizar o syoDatagrid em um elemento que não seja uma tabela" );
			}

			this.grid = $template.clone();
			this.grid.insertAfter( this.element );

			parent = this.element.parent();
			this.originalPosition = {
				parent: parent,
				index: parent.children().index( this.element ) - 1
			};

			this.element.appendTo( $( "body" ) );

			this.refresh();
			this._setupEvents();
			instances.push( this );
		},

		// Retorna o widget
		widget: function() {
			return this.grid;
		},

		// Instancia os eventos do grid
		_setupEvents: function() {
			var events = {};
			events[ "click .syo-datagrid-body tbody tr" ] = this._activate;

			this._on( this.grid, events );
		},

		_activate: function( e ) {
			var eventData, $oldActiveRow;
			var $row = $( e.currentTarget );

			e.stopPropagation();
			e.preventDefault();

			$oldActiveRow = this.grid.find( ".syo-datagrid-body tbody tr.syo-active" );
			eventData = {
				oldItem: $oldActiveRow[ 0 ] || null,
				newItem: $row[ 0 ]
			};

			// Possibilita cancelar a ativação da linha
			if ( this._trigger( "beforeActivate", null, eventData ) === false ) {
				return;
			}

			// Remove classe do elemento ativo anteriormente,
			// adiciona classe no novo elemento ativo
			$oldActiveRow.removeClass( "syo-active" );
			$row.addClass( "syo-active" );

			this._trigger( "activate", null, eventData );
		},

		_resize: function() {
			var i, len;
			var $gridCols = this.grid.find( "colgroup col" );
			var $cols = this.element.children( "colgroup" ).find( "col" );

			// Exibe apenas pra poder verificar dimensões de cada coluna
			this.element.show();
			for ( i = 0, len = $cols.length - 1; i < len; i++ ) {
				$gridCols.filter( ":nth-child(" + ( i + 1 ) + ")" )
						.outerWidth( $cols.eq( i ).width() );
			}

			this.element.hide();
		},

		refresh: function() {
			var i, len;
			var $colgroups = this.grid.find( "colgroup" ).empty();
			var $cols = this.element.children( "colgroup" ).find( "col" );

			this.grid.find( ".syo-datagrid-header" )
				.children( ":not(colgroup)" ).remove().end()
				.append( this.element.children( "thead" ).clone() );

			this.grid.find( ".syo-datagrid-body table" )
				.children( ":not(colgroup)" ).remove().end()
				.append( this.element.children( "tbody" ).clone() );

			if ( this.element.children( "tfoot" ).length ) {
				this.grid.find( ".syo-datagrid-body" ).addClass( "syo-datagrid-with-helper" );
				this.grid.find( ".syo-datagrid-helper" )
					.children( ":not(colgroup)" ).remove().end()
					.append( this.element.children( "tfoot" ).clone() );
			} else {
				this.grid.find( ".syo-datagrid-helper" ).hide();
				this.grid.find( ".syo-datagrid-body" ).removeClass( "syo-datagrid-with-helper" );
			}

			for ( i = 0, len = $cols.length - 1; i < len; i++ ) {
				$colgroups.append( "<col>" );
			}

			this.element.hide();
			this._resize();
		},

		_destroy: function() {
			this.grid.remove();

			this.element.insertAfter(
				this.originalPosition.parent.children()
					.eq( this.originalPosition.index )
			);
			this.element.show();

			instances.splice( instances.indexOf( this ), 1 );
		}
	});

})( jQuery, window );