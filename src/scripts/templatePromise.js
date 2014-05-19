/**
 * $templatePromise
 * ----------------
 * Provider para retornar uma promise para um template HTML ou para uma URL de um template.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).factory( "$templatePromise", [
		"$q",
		"$http",
		"$templateCache",
		function( $q, $http, $templateCache ) {
			return function( templateStr, templateUrl ) {
				return templateStr ? $q.when( templateStr ) : $http.get( templateUrl, {
					cache: $templateCache
				}).then(function( result ) {
					return result.data;
				});
			};
		}
	]);

}( jQuery, angular );