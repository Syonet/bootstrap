!function( $, ng ) {
	"use strict";

	var syo = ng.module( "syonet" );

	syo.directive( "syoNotification", function() {
		var definition = {};

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

		function getContainer() {
			var container = $( ".syo-notification-container" );
			return container.length ? container.eq( 0 ) : $( "body" );
		}

		function allocateNotification( element ) {
			var height;
			var container = getContainer();

			container.prepend( element );
			height = element.outerHeight();

			element.nextAll( ".syo-notification" ).each(function() {
				var $this = $( this );
				var top = $this.cssUnit( "top" )[ 0 ];
				$this.css( "top", ( top + height ) + "px" );
			});

			if ( container.is( ".syo-body-navbar" ) ) {
				element.css( "top", container.cssUnit( "padding-top" )[ 0 ] + "px" );
			}

			return container;
		}

		function deallocateNotification( element ) {
			var height = element.outerHeight();

			element.fadeOut( 500, function() {
				element.nextAll( ".syo-notification" ).each(function() {
					var other = $( this );
					var top = other.cssUnit( "top" )[ 0 ];

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

	syo.provider( "$notification", function() {
		var provider = {};

		provider.defaultTimeout = 3000;

		provider.$get = [
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

					elem.attr( "timeout", timeout || provider.defaultTimeout );
					elem.html( content );

					elem = $compile( elem )( scope || $rootScope );
					return elem.controller( "syoNotification" );
				}
			}
		];

		return provider;
	});
}( jQuery, angular );