(function( $ ) {
	"use strict";

	$.widget( "ui.syoButton", {
		version: "@VERSION",
		options: {
			multi: true,
			toggling: true,
			buttons: ":button, :submit, :reset, a",

			// Callbacks
			beforeToggle: null,
			toggle: null
		},

		// "Cache" utilizado basicamente pra quando é buttonset
		buttons:                null,
		buttonset:              false,

		// Classes utilizadas pelo plugin
		// @TODO utilizar as classes de estado do jQuery UI mesmo
		widgetButtonClass:      "syo-button",
		activeClass:            "syo-active",
		disabledClass:          "syo-disabled",
		widgetButtonsetClass:   "syo-buttonset",

		_create: function() {
			if ( this.element.is( this.options.buttons ) ) {
				this.buttons = this.element;
			} else {
				this.buttonset = true;

				this.element.addClass("syo-buttonset");
				this.buttons = this.element.children( this.options.buttons );
			}

			this.buttons.on( "tap.syobutton click.syobutton", $.proxy( this._toggle, this ) );
			this.refresh();
		},

		_setOption: function( key, value ) {
			// Se desabilitando opção "toggling"
			if ( key === "toggling" && !value ) {
				if ( this.buttonset ) {
					// Desativa do 2º botão em diante
					this.element.find( "." + this.activeClass )
						.slice( 1 )
						.removeClass( this.activeClass );
				} else {
					this.element.removeClass( this.activeClass );
				}
			}

			this._super( key, value );
		},

		_toggle: function( e ) {
			var eventData = { };

			// Tem que ter preventDefault() por causa do jQuery Mobile.
			e.preventDefault();
			e.stopPropagation();

			eventData.active = this.options.toggling ?
				$( e.currentTarget ).hasClass( this.activeClass ) :
				null;

			// Permite cancelar o toggle
			if ( this._trigger( "beforeToggle", e, eventData ) === false ) {
				return;
			}

			if ( this.options.toggling ) {
				// Habilita múltiplos itens ativos ao mesmo tempo num buttonset?
				if ( this.buttonset && !this.options.multi ) {
					this.buttons.removeClass( this.activeClass );
				}

				$( e.currentTarget ).toggleClass( this.activeClass );
				eventData.active = !eventData.active;
			}

			this._trigger( "toggle", e, eventData );
		},

		_toggleDisable: function( item, disabled ) {
			var i, len, $item;
			item = item ? ( $.isArray( item ) ? item : [ item ] ) : [];

			// Se não foi passado nada, então habilita/desabilita todos itens
			if ( !item.length ) {
				for ( i = 0, len = this.buttons.length; i < len; i++ ) {
					item.push( i );
				}
			}

			for ( i = 0, len = item.length; i < len; i++ ) {
				$item = this.buttons.eq( item[ i ] )
					.attr( "aria-hidden", disabled ? "true" : "false" )
					.toggleClass(  this.disabledClass, disabled );

				if ( disabled ) {
					$item.attr( "aria-selected", "false" );
				}
			}
		},
		disable: function( item ) {
			this._toggleDisable( item, true );
		},
		enable: function( item ) {
			this._toggleDisable( item, false );
		},

		refresh: function() {
			if ( this.buttonset ) {
				// Esconde tudo que não for botão
				this.element.children( ":not(" + this.options.buttons + ")" ).hide();
			}

			this.buttons
				.removeClass( [ this.activeClass, this.disabledClass ].join(" ") )
				.addClass( this.widgetButtonClass );
		},

		_destroy: function() {
			if ( this.buttonset ) {
				this.element.removeClass( this.widgetButtonsetClass );
			}

			this.buttons
				.unbind(".syobutton")
				.removeClass( this.widgetButtonClass );
		}
	});

})( jQuery );