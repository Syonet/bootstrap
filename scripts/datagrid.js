(function( $, window ) {
	"use strict";

	var instances = [];
	var $template = $(
		"<div class='syo-datagrid'>" +
			"<table class='syo-table syo-table-hover syo-datagrid-header'></table>" +
			"<div class='syo-datagrid-body-wrapper'>" +
				"<div class='syo-datagrid-overflow'><div></div></div>" +
				"<div class='syo-datagrid-body'>" +
					"<table class='syo-table syo-table-hover'></table>" +
				"</div>" +
			"</div>" +
			"<table class='syo-table syo-table-hover syo-datagrid-helper'></table>" +
		"</div>"
	);

	$( window ).on( "resize", function() {
		instances.forEach(function( instance ) {
			instance.refresh( false );
		});
	});

	$.widget( "syo.syoDataGrid", {
		version: "@VERSION",
		originalPosition: null,
		components: null,
		options: {
			// Callbacks
			activate: null,
			beforeActivate: null
		},

		// Criação/adaptação da estrutura do grid
		_create: function() {
			if ( !this.element.is( "table" ) ) {
				throw new Error( "Não se pode utilizar o syoDatagrid em um elemento que não seja uma tabela" );
			}

			this.grid = $template.clone();
			this.grid.insertAfter( this.element );
			this.components = {
				header:      this.grid.find( ".syo-datagrid-header" ),
				bodyWrapper: this.grid.find( ".syo-datagrid-body" ),
				body:        this.grid.find( ".syo-datagrid-body table" ),
				overflow:    this.grid.find( ".syo-datagrid-overflow" ),
				helper:      this.grid.find( ".syo-datagrid-helper" )
			};

			this.originalPosition = {
				parent: this.element.parent(),
				index: this.element.index()
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
			this._on( this.grid, {
				"click .syo-datagrid-body tbody tr": this._activate,
				"mousewheel .syo-datagrid-body": this._scroll,
				"wheel .syo-datagrid-body": this._scroll
			});

			this._on( this.components.overflow, {
				scroll: this._scroll
			});
		},

		_scroll: function( e ) {
			var overflow = this.components.overflow[ 0 ];
			if ( e.type === "wheel" || e.type === "mousewheel" ) {
				e.preventDefault();

				// Multiplicar por 40 não é exatamente a melhor coisa a se fazer, mas como está até
				// na MDN, então vamos usar como "safe" por hora.
				// https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel
				// => "Listening to this event across browser"
				overflow.scrollTop -= ( e.originalEvent.wheelDeltaY || e.originalEvent.deltaY * -40 );
			}

			this.components.bodyWrapper.scrollTop( overflow.scrollTop );
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

		_handleOverflow: function( overflowWidth ) {
			var $cells = $( ".syo-datagrid-grip" );

			if ( overflowWidth > 1 ) {
				if ( !$cells.length ) {
					this.components.header.find( "thead" ).each(function() {
						var $tr = $( "tr", this );
						var $cell = $( document.createElement( "th" ) )
										.attr( "rowspan", $tr.length )
										.appendTo( $tr.first() );

						$cells = $cells.add( $cell );
					});

					this.components.body.find( "tbody" ).each(function() {
						var $tr = $( "tr", this );
						var $cell = $( document.createElement( "td" ) )
										.attr( "rowspan", $tr.length )
										.appendTo( $tr.first() );

						$cells = $cells.add( $cell );
					});

					$cells.addClass( "syo-datagrid-grip" );
				}

				$cells.removeClass( "syo-hidden" ).innerWidth( overflowWidth );
			} else {
				$cells.addClass( "syo-hidden" ).width( 0 );
			}
		},

		refresh: function( replace ) {
			var bodyHeight, overflow, overflowWidth;
			var $colgroup = this.element.find( "colgroup" );
			var $thead = this.element.find( "thead" );
			var $tbody = this.element.find( "tbody" );
			var $tfoot = this.element.find( "tfoot" );

			if ( replace == null || replace ) {
				this.components.header.empty();
				this.components.header
					.append( $colgroup.clone() )
					.append( $thead.clone() );

				this.components.body.empty();
				this.components.body
					.append( $colgroup.clone() )
					.append( $tbody.clone() );

				this.components.bodyWrapper.toggleClass( "syo-datagrid-with-helper", !!$tfoot.length );
				this.components.helper.empty();
				this.components.helper
					.append( $colgroup.clone() )
					.append( $tfoot.clone() );

				this.element.addClass( "syo-hidden" );
			}

			bodyHeight = this.components.body.css( "height" );
			overflow = this.components.overflow;
			overflow.find( "div" ).css({
				height: bodyHeight,
				width: "100%"
			});

			overflowWidth = overflow[ 0 ].offsetWidth - overflow[ 0 ].clientWidth + 1;
			overflow.width( overflowWidth );

			// Pode ser que o min-width tenha ganho do cálculo via JS
			this._handleOverflow( overflowWidth > 1 ? overflow.width() : 0 );
		},

		_destroy: function() {
			var $sibling = this.originalPosition.parent.children().prev();
			if ( $sibling.length ) {
				this.element.insertAfter( $sibling );
			} else {
				this.element.appendTo( this.originalPosition.parent() );
			}

			this.element.removeClass( "syo-hidden" );
			this.grid.remove();

			instances.splice( instances.indexOf( this ), 1 );
		}
	});

})( jQuery, window );