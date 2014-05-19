/**
 * syoClick
 * --------
 * Diretiva para links que faz eval de uma express�o no escopo atual e depois acessa o atributo href
 * do elemento. Se a express�o retornar uma promise, ent�o syoClick ir� aguardar a promise ser
 * resolvida.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoClick", [ "$timeout", function( $timeout ) {
		return function( $scope, $element, $attr ) {
			// Bloqueia ou n�o a execu��o do clique.
			// Se o processamento de uma promise � necess�rio, a reexecu��o do clique
			// depender� do t�rmino do evento anterior.
			var lock = false;

			function gotoHref() {
				$timeout(function() {
					// Se tem alguma coisa no atributo href, tenta acessar o elemento nativo
					if ( $element.attr( "href" ) ) {
						$element.get( 0 ).click();
					}
				});
			}

			$element.on( "click", function( e ) {
				var result;

				if ( lock ) {
					lock = false;
					return true;
				}

				// @TODO Passar $event
				result = $scope.$eval( $attr.syoClick );
				e.preventDefault();

				if ( typeof result.then === "function" ) {
					lock = true;

					result.then(function() {
						gotoHref();
					});
				} else if ( result !== false ) {
					lock = true;
					gotoHref();
				}
			});
		};
	}]);

}( jQuery, angular );