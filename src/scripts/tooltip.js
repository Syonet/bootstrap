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
					var position, positionConfig;
					timeout = null;

					// Se não há nenhum elemento pai, não exibe o tooltip.
					if ( !target.parent().length || target.is( ":hidden" ) ) {
						return;
					}

					position = target.attr( "syo-tooltip-position" );
					positionConfig = {
						of: target,
						collision: "fit"
					};

					switch ( position ) {
						case "top":
							positionConfig.my = "center bottom";
							positionConfig.at = "center top-5px";
							break;

						case "left":
							positionConfig.my = "right center";
							positionConfig.at = "left-5px center";
							break;

						case "right":
							positionConfig.my = "left center";
							positionConfig.at = "right+5px center";
							break;

						default:
							position = "bottom";
							positionConfig.my = "center top";
							positionConfig.at = "center bottom+5px";
							break;
					}

					$tooltip.target = target;

					// Remove todas as classes de posicionamento
					tooltip.removeClass([ "top", "left", "right", "bottom" ].map(function( cls ) {
						return "syo-tooltip-" + cls;
					}).join( " " ) );

					tooltip.addClass( "syo-tooltip-visible syo-tooltip-" + position ).text( title );
					tooltip.position( positionConfig );

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