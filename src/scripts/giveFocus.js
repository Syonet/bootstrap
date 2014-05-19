/**
 * syoGiveFocus
 * ------------
 * Diretiva para dar foco a um elemento utilizando data-binding.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoGiveFocus", function( $parse, $timeout ) {
		return function( scope, element, attrs ) {
			var model = $parse( attrs.syoGiveFocus );

			scope.$watch( model, function( value ) {
				if ( value ) {
					$timeout(function() {
						element[ 0 ].focus();
					});
				}
			});

			// Ao fazer blur, seta para false a propriedade, se ela for setável
			element.on( "blur", function() {
				try {
					scope.$apply( model.assign( scope, false ) );
				} catch ( e ) {}
			});
		};
	});

}( jQuery, angular );