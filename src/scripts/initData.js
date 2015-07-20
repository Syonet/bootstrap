!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoInitData", function() {
		return {
			restrict: "E",
			replace: true,
			template: "<input type='hidden'>",
			link: function( $scope, $element, $attr ) {
				var key = $attr.key;
				var value = $attr.value;

				// Não há chave, não seta nada.
				if ( !key ) {
					return;
				}

				// Tenta interpretar como JSON. Se não houver sucesso, pelo menos seta como string.
				try {
					value = value ? JSON.parse( value ) : null;
				} catch ( e ) {}

				// Seta a chave no escopo
				$scope[ key ] = value;
			}
		};
	});
}( jQuery, angular );