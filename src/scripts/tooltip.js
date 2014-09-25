!function( $, ng ) {
	"use strict";

	var module = ng.module( "syonet.tooltip", [] );

	module.value( "syoTooltipConfig", {
		timeout: 300
	});

	module.controller( "SyoTooltipController", function() {
		var ctrl = this;

		ctrl.close = function() {
			if ( ctrl.target ) {
				ctrl.target.trigger( "mouseleave" );
			}
		};
	});

	module.directive( "syoTooltip", function( syoTooltipConfig ) {
		var definition = {};
		var tooltipTpl = $( "<span>" ).addClass( "syo-tooltip" );

		definition.controller = "SyoTooltipController";
		definition.controllerAs = "$tooltip";

		definition.link = function( scope, element, attr, $tooltip ) {
			var timeout;
			var tooltip = tooltipTpl.clone();

			element.append( tooltip );
			element.on( "mouseenter", "[title]", function( evt ) {
				var target = $( evt.currentTarget );
				var title = target.attr( "title" );

				if ( !title ) {
					return;
				}

				evt.preventDefault();
				evt.stopPropagation();

				// Guarda e remove o title
				target.data( "title", title ).attr( "title", "" );

				timeout = setTimeout(function() {
					var rect = target[ 0 ].getBoundingClientRect();
					timeout = null;

					// Se não há nenhum elemento pai, não exibe o tooltip.
					if ( !target.parent().length ) {
						return;
					}

					$tooltip.target = target;
					tooltip.addClass( "syo-tooltip-visible" ).text( title ).css({
						top: rect.bottom,
						left: rect.left - ( target.cssUnit( "margin-left" )[ 0 ] / 2 ) + ( rect.width / 2 )
					});

					target.on( "$destroy", function destroyCb() {
						$tooltip.close();
						target.off( "$destroy", destroyCb );
					});
				}, syoTooltipConfig.timeout );
			});

			element.on( "mouseleave", "[title]", function( evt ) {
				var target = $( evt.currentTarget );

				target.attr( "title", target.data( "title" ) );

				if ( timeout ) {
					clearTimeout( timeout );
					timeout = null;
					return;
				}

				$tooltip.target = null;
				tooltip.removeClass( "syo-tooltip-visible" );
			});
		};

		return definition;
	});
}( jQuery, angular );