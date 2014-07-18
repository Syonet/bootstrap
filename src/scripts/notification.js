!function( $, ng ) {
	"use strict";

	var syo = ng.module( "syonet" );

	syo.directive( "syoNotification", function() {
		var definition = {};

		definition.template =
			"<div class='syo-notification'>" +
				"<div ng-transclude></div>" +
				"<a href='#' ng-click='$event.preventDefault(); $notification.close()'></a>" +
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

			// Se for um NaN, então usa 5s de timeout
			if ( isNaN( scope.timeout ) ) {
				scope.timeout = 5000;
			}

			// Fecha automaticamente após o timeout
			setTimeout( $notification.close, scope.timeout );

			// -------------------------------------------------------------------------------------

			scope.$on( "close", function() {
				deallocateNotification( element );
			});
		};

		return definition;

		// -----------------------------------------------------------------------------------------

		function getContainer() {
			var container = $( ".syo-notification-container" );
			return container.length ? container.eq( 0 ) : $( "body" );
		}

		function allocateNotification( element ) {
			var height;
			var container = getContainer();
			var top = container.cssUnit( "padding-top" )[ 0 ];

			container.prepend( element );
			height = element.outerHeight();

			element.css( "top", top + "px" );
			container.css( "padding-top", ( top + height ) + "px" );
			return container;
		}

		function deallocateNotification( element ) {
			var height = element.outerHeight();

			element.fadeOut( 500, function() {
				var container = element.parent();
				var top = container.cssUnit( "padding-top" )[ 0 ];
				container.css( "padding-top", ( top - height ) + "px" );

				element.prevAll( ".syo-notification" ).each(function() {
					var other = $( this );
					top = other.cssUnit( "top" )[ 0 ];

					other.css( "top", ( top - height ) + "px" );
				});

				element.remove();
			});
		}
	});

	syo.controller( "NotificationController", [ "$scope", function( $scope ) {
		var ctrl = this;

		ctrl.close = function() {
			$scope.$emit( "close" );
		};

		return ctrl;
	}]);

	syo.factory( "$notification", [
		"$rootScope",
		"$compile",
		function( $rootScope, $compile ) {
			var notification = {};

			notification.default = $.proxy( createNotification, null, "" );
			notification.error = $.proxy( createNotification, null, "error" );
			notification.success = $.proxy( createNotification, null, "success" );

			return notification;

			// -------------------------------------------------------------------------------------

			function createNotification( type, content, timeout, scope ) {
				var elem = $( "<div syo-notification></div>" );

				if ( type ) {
					elem.addClass( "syo-" + type );
				}

				elem.attr( "timeout", timeout );
				elem.html( content );

				elem = $compile( elem )( scope || $rootScope );
				return notification;
			}
		}
	]);
}( jQuery, angular );