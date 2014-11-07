!function( $, ng ) {
	"use strict";

	var NOTIFICATION_TOP_KEY = "notificationTop";

	var module = ng.module( "syonet.notification", [] );

	module.directive( "syoNotification", function( $document ) {
		var definition = {};
		var container = $document.find( "body" );

		definition.template =
			"<div class='syo-notification'>" +
				"<div ng-transclude></div> " +
				"<a href='#' ng-click='$event.preventDefault(); $notification.close()'>Fechar</a>" +
			"</div>";
		definition.replace = true;
		definition.transclude = true;
		definition.scope = {
			timeout: "@"
		};

		definition.controller = "NotificationController";
		definition.controllerAs = "$notification";

		definition.link = function( scope, element, attr, $notification ) {
			allocateNotification( element );

			// Garante que o timeout da notificação nunca seja menor que 0 ms
			scope.timeout = Math.max( +scope.timeout, 0 );

			// Se houver um timeout, fecharemos automaticamente a notificação.
			if ( !isNaN( scope.timeout ) && scope.timeout > 0 ) {
				// Fecha automaticamente após o timeout
				setTimeout( $notification.close, scope.timeout );
			}

			// -------------------------------------------------------------------------------------

			scope.$on( "close", function() {
				deallocateNotification( element );
			});
		};

		return definition;

		// -----------------------------------------------------------------------------------------

		function allocateNotification( element ) {
			var height;

			container.prepend( element );
			height = element.outerHeight();

			element.nextAll( ".syo-notification" ).each(function() {
				var other = $( this );
				var top = other.cssUnit( "top" )[ 0 ];
				other.css( "top", ( top + height ) + "px" );
				persistPosition( other );
			});

			if ( container.is( ".syo-body-navbar" ) ) {
				element.css( "top", container.cssUnit( "padding-top" )[ 0 ] + "px" );
			}

			persistPosition( element );
			return container;
		}

		function deallocateNotification( element ) {
			var height = element.outerHeight();

			element.fadeOut( 500, function() {
				element.nextAll( ".syo-notification" ).each(function() {
					var other = $( this );
					var top = other.cssUnit( "top" )[ 0 ];

					other.css( "top", ( top - height ) + "px" );
					persistPosition( other );
				});

				element.remove();
			});
		}
	});

	module.controller( "NotificationController", [ "$scope", function( $scope ) {
		var ctrl = this;

		ctrl.close = function() {
			$scope.$emit( "close" );
		};

		return ctrl;
	}]);

	module.provider( "$notification", function() {
		var provider = {};

		provider.defaultTimeout = 3000;

		provider.$get = [
			"$rootScope",
			"$compile",
			function( $rootScope, $compile ) {
				var notification = {};

				notification.default = $.proxy( createNotification, null, "" );

				// Cria métodos pra todos os estilos do Bootstrap
				[ "error", "success", "warning", "info" ].forEach(function( style ) {
					notification[ style ] = $.proxy( createNotification, null, style );
				});

				return notification;

				// -------------------------------------------------------------------------------------

				function createNotification( type, content, timeout, scope ) {
					var elem = $( "<div syo-notification></div>" );

					if ( type ) {
						elem.addClass( "syo-" + type );
					}

					elem.attr( "timeout", timeout || provider.defaultTimeout );
					elem.html( content );

					elem = $compile( elem )( scope || $rootScope );
					return elem.controller( "syoNotification" );
				}
			}
		];

		return provider;
	});

	function persistPosition( element ) {
		element.data( NOTIFICATION_TOP_KEY, element.cssUnit( "top" )[ 0 ] );
	}
}( jQuery, angular );