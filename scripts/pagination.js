(function( $ ) {
	"use strict";

	$.widget( "ui.syoPagination", {
		version: "@VERSION",
		options: {
			active: 0,
			size: 1,
			inline: false,

			// Callbacks
			activate: null,
			beforeActivate: null
		},

		// Classes CSS
		widgetClass:        "syo-pagination",
		widgetInlineClass:  "syo-pagination-inline",
		activeClass:        "syo-active",
		disabledClass:      "syo-disabled",

		// Criação da estrutura do syoPagination
		_create: function() {
			this.element.attr( "role", "navigation" ).addClass( this.widgetClass );
			this.list = $("<ul />").appendTo( this.element );

			// Instancia os eventos
			this._setupEvents();

			// Seta o widget como inline, caso necessário
			this._toggleInline( this.options.inline );

			// Cria os LIs de fato
			this.refresh();
		},

		_setupEvents: function() {
			var widget = this;

			this.list.on( "click", "> li", function( e ) {
				e.stopPropagation();
				e.preventDefault();

				if ( $( this ).hasClass( widget.disabledClass ) ) {
					return;
				}

				widget._activate( widget.items.index( this ) );
			});
		},
		_setOption: function( key, value ) {
			if ( key === "active" ) {
				this._activate( value );
				return;
			}

			if ( key === "size" ) {
				// Faz o cast correto para number
				value = +value;

				if ( isNaN( value ) ) {
					return;
				}

				this._super( key, value );
				this.refresh();
			} else {
				this._super( key, value );
			}

			if ( key === "inline" ) {
				this._toggleInline( value );
			}
		},

		_toggleInline: function( toggle ) {
			this.element.toggleClass( this.widgetInlineClass, toggle );
		},

		_findItem: function( selector ) {
			return typeof selector === "number" ? this.items.eq( selector ) : $();
		},

		_activate: function( index ) {
			var active = this._findItem( index );

			// Tentando ativar o item já ativo da paginação, ou tentando ativar um item inexistente
			if ( !active || index === this.active ) {
				return;
			}

			// Monta o objeto para passar para o jQuery UI Widget
			var event = {
				target: active,
				currentTarget: active,
				preventDefault: $.noop
			}, clicked = $( event.currentTarget );

			// Monta o objeto que será passado para o evento
			var eventData = {
				oldItem: this._findItem( this.options.active ),
				newItem: clicked
			};

			event.preventDefault();

			// Permite cancelar a ativação do item
			if ( this._trigger( "beforeActivate", event, eventData ) === false ) {
				return;
			}

			this.options.active = this.active = index;
			this._toggleActive( eventData );
		},
		_toggleActive: function( data ) {
			data.oldItem.attr( "aria-selected", "false" ).removeClass( this.activeClass );
			data.newItem.attr( "aria-selected", "true" ).addClass( this.activeClass );

			this._trigger( "activate", null, data );
		},

		refresh: function() {
			var li;
			var i = 0;

			// Limpa a lista da paginação
			this.list.empty();
			this.items = $();

			for ( ; i < this.options.size; i++ ) {
				li = $( "<li />", {
					"aria-selected": "false",
					"aria-hidden": "false"
				});

				li.append(
					$("<a href='#' />").text( i + 1 )
				).appendTo( this.list );

				this.items = this.items.add( li );
			}

			// Variável helper pra resetar o estado de itens ativos
			this.active = -1;

			// Retorna à página 0
			this._activate( 0 );
		},

		_toggleDisable: function( item, disabled ) {
			var i, len, $item;
			item = item ? ( $.isArray( item ) ? item : [ item ] ) : [];

			// Se não foi passado nada, então habilita/desabilita todos itens
			if ( !item.length ) {
				for ( i = 0, len = this.items.length; i < len; i++ ) {
					item.push( i );
				}
			}

			for ( i = 0, len = item.length; i < len; i++ ) {
				$item = this.items.eq( item[ i ] )
					.attr( "aria-hidden", disabled ? "true" : "false" )
					.toggleClass(  this.disabledClass, disabled );

				if ( disabled ) {
					$item.attr( "aria-selected", "false" );
				}
			}
		},
		enable: function( item ) {
			this._toggleDisable( item, false );
		},
		disable: function( item ) {
			this._toggleDisable( item, true );
		},

		_destroy: function() {
			this.list.remove();
			this.element.removeAttr("role").removeClass( this.widgetClass );
		}
	});

})( jQuery );