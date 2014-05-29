/* jshint unused: false */
/**
 * $urlbuilder
 * -----------
 * Construtor de URLs, convertendo um objeto na query string.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	var syo = ng.module( "syonet" );
	syo.factory( "$url", function() {
		var urlRegex = new RegExp(
			"^" +
				// Protocolo, sem incluir ://
				"(?:(https?|ftp)?://)?" +
				// Usuário e senha
				"(?:([^\\s:]+)(?::([^\\s@]*))?@)?" +
				// Host
				"([a-z0-9\\.-]+)?" +
				// Porta
				"(?::(\\d{1,}))?" +
				// Path
				"(/[^\\s\\?\\#]*)?" +
				// Query string
				"(?:\\?([^\\s\\#]+))?" +
				// Hash
				"(?:#(\\S*))?" +
			"$",
			"i"
		);

		function encodeUriQuery( val, pctEncodeSpaces ) {
			return encodeURIComponent( val )
					.replace( /%40/gi, "@" )
					.replace( /%3A/gi, ":" )
					.replace( /%24/g, "$" )
					.replace( /%2C/gi, "," )
					.replace( /%20/g, ( pctEncodeSpaces ? "%20" : "+" ) );
		}

		function URL( url ) {
			var original = url;

			if ( !( this instanceof URL ) ) {
				return new URL( url );
			}

			if ( url instanceof URL ) {
				original = url.toString();
			} else if ( typeof url !== "string" ) {
				original = "";
			}

			this._store = URL.parse( original );
		}

		URL.parse = function( url ) {
			var query = {};
			var match = url.match( urlRegex );

			if ( !match ) {
				throw new Error( "URL inválida!" );
			}

			// Itera sobre os parâmetros da query string
			if ( match[ 7 ] ) {
				match[ 7 ].split( "&" ).forEach(function( param ) {
					var name, value;
					param = param.split( "=" ).map( decodeURIComponent );
					name = param[ 0 ];
					value = param[ 1 ];

					// Se um parâmetro com este nome já existe, então vamos usar um array de valores
					if ( query.hasOwnProperty( name ) ) {
						value = ng.isArray( query[ name ] ) ?
							query[ name ].concat( value ) :
							[ query[ name ], value ];
					}

					query[ name ] = value;
				});
			}

			return {
				href: url,
				protocol: match[ 1 ],
				user: match[ 2 ],
				password: match[ 3 ],
				host: match[ 4 ],
				port: +match[ 5 ] || 0,
				path: match[ 6 ],
				query: query,
				hash: match[ 8 ]
			};
		};

		/**
		 * Getter/setter pra protocolo
		 *
		 * @param   {String} [value]
		 * @returns {*}
		 */
		URL.prototype.protocol = function( value ) {
			if ( typeof value !== "string" ) {
				return this._store.protocol;
			}

			this._store.protocol = value;
			return this;
		};

		/**
		 * Getter/setter pra usuário
		 *
		 * @param   {String} [value]
		 * @returns {*}
		 */
		URL.prototype.user = function( value ) {
			if ( value === undefined ) {
				return this._store.user;
			}

			this._store.user = value;
			return this;
		};

		/**
		 * Getter/setter pra senha
		 *
		 * @param   {String} [value]
		 * @returns {*}
		 */
		URL.prototype.password = function( value ) {
			if ( value === undefined ) {
				return this._store.password;
			}

			this._store.password = value;
			return this;
		};

		/**
		 * Getter/setter pra host
		 *
		 * @param   {String} [value]
		 * @returns {*}
		 */
		URL.prototype.host = function( value ) {
			if ( value === undefined ) {
				return this._store.host;
			}

			this._store.host = value;
			return this;
		};

		/**
		 * Getter/setter pra porta
		 *
		 * @param   {Number} [value]
		 * @returns {*}
		 */
		URL.prototype.port = function( value ) {
			if ( value === undefined ) {
				return this._store.port;
			}

			this._store.port = value;
			return this;
		};

		/**
		 * Getter/setter pra path
		 *
		 * @param   {String} [value]
		 * @returns {*}
		 */
		URL.prototype.path = function( value ) {
			if ( typeof value !== "string" ) {
				return this._store.path;
			}

			this._store.path = value;
			return this;
		};

		/**
		 * Getter/setter pra query string.
		 *
		 * @param   {String|Object} [key]
		 * @param   {*} [value]
		 * @returns {*}
		 */
		URL.prototype.query = function( key, value ) {
			var query = this._store.query;
			var keyStr = typeof key === "string" && key !== "";

			if ( ng.isObject( key ) ) {
				ng.extend( query, key );
				return this;
			} else if ( keyStr && value != null ) {
				query[ key ] = value;
				return this;
			}

			return keyStr ? query[ key ] : query;
		};

		/**
		 * Getter/setter pra hash
		 *
		 * @param   {String} [value]
		 * @returns {*}
		 */
		URL.prototype.hash = function( value ) {
			if ( typeof value !== "string" ) {
				return this._store.hash;
			}

			this._store.hash = value;
			return this;
		};

		URL.prototype.toString = function() {
			var url = "";
			var querystring = [];
			var store = this._store;

			if ( store.host ) {
				url += store.protocol ? store.protocol + "://" : "";
				if (store.user) {
					url += store.user;
					url += store.password ? ":" + store.password : "";
					url += "@";
				}

				url += store.host;
				url += store.port ? ":" + store.port : "";
			}

			url += store.path || "/";

			Object.keys( store.query ).sort().forEach(function( key ) {
				var value = store.query[ key ];

				// Pula valores vazios
				if ( value == null ) {
					return;
				}

				// Transforma o valor em um array, caso ainda não seja
				if ( !ng.isArray( value ) ) {
					value = [ value ];
				}

				value.forEach(function( v ) {
					if ( ng.isObject( v ) ) {
						v = ng.toJson( v );
					}

					querystring.push( encodeUriQuery( key ) + "=" + encodeUriQuery( v ) );
				});
			});
			url += querystring.length ? "?" + querystring.join("&") : "";
			url += store.hash ? "#"+ store.hash : "";

			return url;
		};

		return URL;
	});

}( jQuery, angular );