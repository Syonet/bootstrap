!function( $, ng ) {
	"use strict";

	var syo = ng.module( "syonet" );
	syo.directive( "syoDatetime", function() {
		var definition = {};
		var maskValidation = new RegExp(
			"^\\s*(?:" +
				// dd/MM/yyyy, dd/MM/yy, dd/MM, MM/yy, MM/yyyy
				"(dd/MM|MM/(?:yy){1,2}|dd/MM/(?:yy){1,2})|" +
				// HH:mm
				"(HH:mm)|" +
				// Os 2 acima combinados
				"((?:dd/MM|MM/(?:yy){1,2}|dd/MM/(?:yy){1,2})\\s+(?:HH:mm))" +
			")\\s*$"
		);

		definition.restrict = "E";
		definition.require = "?ngModel";
		definition.replace = true;
		definition.template =
			"<div class='syo-datetime'>" +
				"<input type='text' class='syo-datetime-input date-input'>" +
				"<input type='text' class='syo-datetime-input time-input'>" +
			"</div>";

		definition.scope = {
			mask: "@"
		};

		definition.link = function( scope, element, attrs, ngModel ) {
			var dateMask, timeMask;
			var date = new Date();
			var maskParts = scope.mask.match( maskValidation );
			var dateInput = element.find( ".date-input" );
			var timeInput = element.find( ".time-input" );

			if ( !maskParts ) {
				throw new Error( "Máscara de data/hora incorreta!" );
			}

			// Temos um mascara de data e hora?
			if ( maskParts[ 3 ] ) {
				maskParts[ 3 ] = maskParts[ 3 ].split( /\s+/ );
				maskParts[ 1 ] = maskParts[ 3 ][ 0 ];
				maskParts[ 2 ] = maskParts[ 3 ][ 1 ];
			} else {
				// Não temos mascara de data e hora
				// Oculta input de data, se a mascara não tem data
				dateInput.toggle( !maskParts[ 1 ] );

				// ...e o equivalente pra hora
				timeInput.toggle( !maskParts[ 2 ] );
			}

			dateMask = maskParts[ 1 ];
			timeMask = maskParts[ 2 ];

			dateInput.val( maskParts[ 1 ].toLowerCase().replace( /y/g, "a" ) );
			timeInput.val( maskParts[ 2 ].replace( /H|m/g, "-" ) );

			dateInput.add( timeInput ).on( "focus mouseup", function( e ) {
				var input = this;

				// Determina qual o char separador deste input
				var char = input === dateInput[ 0 ] ? "/" : ":";

				setTimeout(function() {
					var selectionEnd, backRef;
					var val = input.value;
					var selectionStart = input.selectionStart;

					if ( val[ selectionStart ] === char ) {
						selectionStart = 0;
					} else {
						backRef = val.lastIndexOf( char, input.selectionStart );
						selectionStart = backRef === -1 ? 0 : backRef + 1;
					}

					// Vai até o primeiro char separador ou até o fim do input
					selectionEnd = val.indexOf( char, selectionStart );
					selectionEnd = selectionEnd === -1 ? val.length : selectionEnd;

					input.setSelectionRange( selectionStart, selectionEnd );
				});
			}).on( "keydown", function( e ) {
				var key = e.keyCode;
				var arrow = getArrow( key );

				e.preventDefault();
				e.stopPropagation();


			});
		};

		return definition;
	});

	function getArrow( key ) {
		var i = [ 37, 38, 39, 40 ].indexOf( key );
		return [ "left", "up", "right", "down" ][ i ];
	}

}( jQuery, angular );