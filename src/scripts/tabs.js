/**
 * syoTabs
 * -------
 * Diretiva que instancia um jQuery UI Tabs.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoTabs", [
		"$window",
		function( $window ) {
			return function( $scope, $element, $attr ) {
				var init, bound;

				function resizeTabs() {
					// Reforça heightStyle = 'fill' pra garantir que sempre ocupará 100% da altura mesmo
					$element.tabs( "option", "heightStyle", "fill" );
				}

				$attr.$observe( "syoTabs", function( val ) {
					var options, heightStyle;
					val = $scope.$eval( val );

					if ( init ) {
						options = $element.tabs( "option" );

						$element.tabs( "option", ng.extend( options, val ) );
						$element.tabs( "refresh" );

						$element.tabs( "option", "active", options.active );

						heightStyle = options.heightStyle;
					} else {
						$element.tabs( val );
						$element.on( "tabsactivate", function() {
							!$scope.$root.$$phase && $scope.$apply();
						});

						init = true;
						heightStyle = val.heightStyle;
					}

					// Adiciona ou remove o evento, dependendo do heightStyle do elemento
					if ( !bound && heightStyle === "fill" ) {
						$( $window ).on( "resize", resizeTabs );
						bound = true;
					} else if ( bound && heightStyle !== "fill" ) {
						$( $window ).off( "resize", resizeTabs );
						bound = false;
					}
				});

				// Ao destruir o escopo, remove também o evento
				$scope.$on( "$destroy", function() {
					if ( bound ) {
						$( $window ).off( "resize", resizeTabs );
					}
				});
			};
		}
	]);

}( jQuery, angular );