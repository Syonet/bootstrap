(function( $ ) {
	"use strict";

	var classes = {};
	classes.widget = "syo-datagrid";
	classes.header = classes.widget + "-header";
	classes.rowContainer = classes.widget + "-rowcont";
	classes.body = classes.widget + "-body";
	classes.helper = classes.widget + "-helper";
	classes.bodyWithHelper = classes.widget + "-with-helper";

	function getComponents( $element ) {
		return {
			// Header
			header: $element.children( "div:eq(0)" ),

			// Body
			body: $element.children( "div:eq(1)" ),

			// Rows Container
			rowContainer: $element.find( "> div:eq(1) > div" ),

			// Rows
			rows: $element.find( "> div:eq(1) tbody > tr" ),

			// Footer helper
			helper: $element.children( "div:gt(1)" )
		};
	}

	function isRowDisabled( $row ) {
		return !!$row.data( "disabled" );
	}

	function getStateClass( state ) {
		var i, len;
		var ret = [];
		state = state.split( " " );

		for ( i = 0, len = state.length; i < len; i++ ) {
			ret.push( classes.widget + "-state-" + state[ i ] );
		}

		return ret.join( " " );
	}

	$.widget( "ui.syoDataGrid", {
		version: "@VERSION",
		options: {
			// Callbacks
			activate: null,
			beforeActivate: null
		},

		// Criação/adaptação da estrutura do syoDataGrid
		_create: function() {
			this.refresh();
			this._setupEvents();
		},

		_setupEvents: function() {
			this._on( this.components.rows, {
				mouseenter: this._hover,
				mouseleave: this._hover,
				click: this._activate
			});
		},

		_activate: function( e ) {
			var eventData, $oldActiveRow;
			var $row = $( e.currentTarget );
			var clickedClass = getStateClass( "clicked" );

			if ( isRowDisabled( $row ) ) {
				return;
			}

			e.stopPropagation();
			e.preventDefault();

			$oldActiveRow = this.components.rows.filter( clickedClass );

			eventData = {
				oldItem: $oldActiveRow,
				newItem: $row
			};

			// Possibilita cancelar a ativação da linha
			if ( this._trigger( "beforeActivate", null, eventData ) === false ) {
				return;
			}

			// Remove classe do elemento ativo anteriormente,
			// adiciona classe no novo elemento ativo
			$oldActiveRow.removeClass( clickedClass );
			$row.addClass( clickedClass );

			this._trigger( "activate", null, eventData );
		},

		_hover: function( e ) {
			var $row = $( e.currentTarget );
			var hoverClass = getStateClass( "hover" );

			if ( isRowDisabled( $row ) ) {
				return;
			}

			if ( e.type === "mouseenter" ) {
				$row.addClass( hoverClass );
			} else {
				$row.removeClass( hoverClass );
			}
		},

		refresh: function() {
			this.components = getComponents( this.element );
			this.element.addClass( classes.widget );

			// Adiciona dinamicamente as classes nos componentes do DataGrid
			$.each( this.components, function( key, $component ) {
				if ( classes[ key ] ) {
					$component.addClass( classes[ key ] );
				}
			});

			// Se tem algum footer, adiciona uma classe mais
			this.components.body.toggleClass(
				classes.bodyWithHelper,
				this.components.helper.length
			);
		},

		_destroy: function() {
			this.element.removeClass( classes.widget );

			this.components.each(function( key, $component ) {
				$component.removeClass( classes[ key ] );
			});

			// Se tem algum footer, remove a classe extra
			this.components.body.removeClass( classes.bodyWithHelper );
		}
	});

})( jQuery );