!function( ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoResponsiveClass", [ "$window", function( $window ) {
		var definition = {};
		var classesDefs = [];
		var matchMedia = {
			tiny: function() {
				return $window.matchMedia( "(max-width: 767px)" );
			},
			small: function() {
				return $window.matchMedia( "(min-width: 768px) and (max-width: 979px)" );
			},
			smallAbove: function() {
				return $window.matchMedia( "(min-width: 768px)" );
			},
			smallBelow: function() {
				return $window.matchMedia( "(max-width: 979px)" );
			},
			medium: function() {
				return $window.matchMedia( "(min-width: 980px) and (max-width: 1199px)" );
			},
			mediumAbove: function() {
				return $window.matchMedia( "(min-width: 980px)" );
			},
			mediumBelow: function() {
				return $window.matchMedia( "(max-width: 1199px)" );
			},
			large: function() {
				return $window.matchMedia( "(min-width: 1200px) and (max-width: 1599px)" );
			},
			largeAbove: function() {
				return $window.matchMedia( "(min-width: 1200px)" );
			},
			xlarge: function() {
				return $window.matchMedia( "(min-width: 1600px)" );
			}
		};
		var normalize = function( value ) {
			var ret = {};

			if ( ng.isArray( value ) ) {
				ret.all = value.join( " " );
			} else if ( typeof value === "string" ) {
				ret.all = value;
			} else if ( ng.isObject( value ) ) {
				ng.forEach( value, function( val, key ) {
					if ( ng.isArray( val ) ) {
						ret[ key ] = val.join( " " );
					} else if ( typeof val === "string" ) {
						ret[ key ] = val;
					}
				});
			}

			// Seta as chaves padrão como string vazia, caso não existam
			ret.all = ret.all || "";
			ng.forEach( matchMedia, function( fn, key ) {
				ret[ key ] = ret[ key ] || "";
			});

			return ret;
		};

		// Adiciona os listeners, apenas uma vez cada.
		// Evita que tenhamos 5x o mesmo listener pra 5 elementos na página usando a diretiva,
		// caso o código estivesse dentro do método link.
		ng.forEach( matchMedia, function( fn, key ) {
			fn().addListener(function( mediaQuery ) {
				classesDefs.forEach(function( def ) {
					// Se não há nenhuma classe disponível para
					if ( !def[ key ] ) {
						return;
					}

					if ( mediaQuery.matches ) {
						def.element.addClass( def[ key ] );
					} else {
						def.element.removeClass( def[ key ] );
					}
				});
			});
		});

		definition.link = function( scope, element, attr ) {
			var def = {};
			def.element = element;
			classesDefs.push( def );

			scope.$watch(function() {
				return scope.$eval( attr.syoResponsiveClass );
			}, function( newVal, oldVal ) {
				newVal = normalize( newVal );
				oldVal = normalize( oldVal );

				// Remove todas as classes de antes
				ng.forEach( oldVal, function( classes ) {
					element.removeClass( classes );
				});

				// Atualiza as classes de media query
				ng.extend( def, newVal );

				// Garante que a chave especial 'element' não seja sobrescrita no
				// objeto da definição
				def.element = element;

				// Adiciona todas as classes que baterem na media query
				ng.forEach( matchMedia, function( fn, key ) {
					if ( fn().matches ) {
						element.addClass( def[ key ] );
					}
				});

				// Adiciona as classes válidas pra todos as media queries.
				element.addClass( def.all );
			}, true );
		};

		return definition;
	}]);
}( angular );