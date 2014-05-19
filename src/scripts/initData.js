/**
 * syoInitData
 * -----------
 * Diretiva para facilmente setar vari�veis no escopo atual. �til para dados inicializados com a p�gina.
 *
 * @docs-link
 */
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

				// N�o h� chave, n�o seta nada.
				if ( !key ) {
					return;
				}

				// Tenta interpretar como JSON. Se n�o houver sucesso, pelo menos seta como string.
				try {
					value = value ? JSON.parse( value ) : null;
				} catch ( e ) {}

				// Seta a chave no escopo
				$scope[ key ] = value;
			}
		};
	});
}( jQuery, angular );