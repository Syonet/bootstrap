(function( $ ) {
	"use strict";

	$.widget( "ui.syoPopover", {
		version: "@VERSION",
		options: {
			title: "",
			content: "",
			position: "top"
		},

		classes: {
			widget:     "syo-popover",
			titlebar:   "syo-popover-titlebar",
			title:      "syo-popover-title",
			close:      "syo-popover-close",
			arrow:      "syo-popover-arrow",
			content:    "syo-popover-content",
			hidden:     "syo-hidden"
		},

		_create: function() {
			this.refresh();
			this._setupEvents();
		},

		_setOption: function( key, value ) {
			if ( key === "position" ) {
				if ( [ "top", "right", "bottom", "left" ].indexOf( value ) === -1 ) {
					value = "top";
				}

				this._super( key, value );
				this._position();
				return;
			}

			if ( key === "content" ) {
				value = value || "";
				if ( value instanceof $ || value instanceof HTMLElement ) {
					value = $( value ).eq( 0 ).removeClass( this.classes.hidden );
				}
			}

			this._super( key, value );
			this.refresh();
		},

		_setupEvents: function() {
			var widget = this;

			// Abre/fecha no click do elemento
			$( this.element ).on( "click." + this.widgetEventPrefix, function( e ) {
				if ( widget.isOpen() ) {
					widget.close( e );
				} else {
					widget.open( e );
				}
			});

			// Fecha no click do closethick
			$( this.popover ).on(
				"click." + this.widgetEventPrefix,
				"." + this.classes.close,
				$.proxy( this.close, this )
			);

			// Fecha no tap do title
			$( this.popover ).on(
				"tap." + this.widgetEventPrefix,
				"." + this.classes.titlebar,
				$.proxy( this.close, this )
			);
		},

		_getTitle: function() {
			if ( this.options.title instanceof $ || this.options.title.nodeType ) {
				return $( this.options.title ).html();
			} else if ( !this.options.title ) {
				return "";
			}

			return this.options.title.toString();
		},

		_position: function() {
			var position = {},
				myPos = this.element.offset(),
				posClass = this.options.position;

			switch ( this.options.position ) {
				case "top":
					position.at = "center top-20";
					position.my = "center bottom";
					break;

				case "right":
					position.at = "right+20 center";
					position.my = "left center";
					break;

				case "bottom":
					position.at = "center bottom+20";
					position.my = "center top";
					break;

				case "left":
					position.at = "left-20 center";
					position.my = "right center";
					break;
			}

			position.of = this.element;
			position.within = this.element;

			position = this.popover.position( position ).offset();

			// Adiciona a classe certa, de acordo com a posição do popover em relação ao botão
			if ( this.options.position === "top" || this.options.position === "bottom" ) {
				posClass = position.top > myPos.top ? "bottom" : "top";
			} else {
				posClass = position.left > myPos.left ? "right" : "left";
			}

			// Setando a classe desta forma "reseta" a propriedade,
			// limpando a classe de posição anterior
			this.popover.attr(
				"class",
				this.classes.widget + " " + this.classes.widget + "-" + posClass
			);
		},

		isOpen: function() {
			return this.popover.is(":visible");
		},

		open: function() {
			this.popover.fadeIn( 300 );

			// Reposiciona o popover com o elemento
			this._position();
		},

		close: function( e ) {
			// Evita que aconteça um "double tap" em touch devices
			if ( e instanceof $.Event ) {
				e.stopPropagation();
				e.preventDefault();
			}

			this.popover.fadeOut( 300 );
		},

		refresh: function() {
			// Se ainda não existe o popover, cria ele
			if ( !this.popover ) {
				this.popover = $( "<div />", {
					class: this.classes.widget
				}).insertAfter( this.element );

				this.popover.append(
					"<div class='" + this.classes.arrow + "'></div>" +
					"<div class='" + this.classes.titlebar + "'>" +
						"<div class='" + this.classes.title + "'></div>" +
						"<div class='" + this.classes.close + "'>" +
							"<i class='icon-remove-sign'></i>" +
						"</div>" +
					"</div>" +
					"<div class='" + this.classes.content + "'></div>"
				);
			}

			this.popover
				// Seta o titulo no popover
				.find( "." + this.classes.title )
					.html( this._getTitle() ).end()

				// Seta o conteúdo
				.find( "." + this.classes.content )
					.empty()
					.append( this.options.content );
		},

		// Sobrescreve o método pai 'widget', do jQuery UI, e retorna o que interessa
		widget: function() {
			return this.popover;
		},

		_destroy: function() {
			this.popover.remove();
		}
	});

})( jQuery );