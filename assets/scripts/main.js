!function( ng ) {
	"use strict";

	var module = ng.module( "bootstrap.docs", [ "syonet" ] );

	module.directive( "iconsContainer", function( $http ) {
		var definition = {};

		definition.replace = true;
		definition.template = "<div>" +
			"<div class='syo-header syo-header-ruler' ng-repeat-start='(name, group) in groups'" +
			"     ng-show='( group.icons | filter: filter ).length'>" +
				"<h3>{{ name }} <small>{{ group.description }}</small></h3>" +
			"</div>" +
			"<ul class='icons' ng-repeat-end" +
			"    ng-show='( group.icons | filter: filter ).length'>" +
				"<li ng-repeat='icon in group.icons | filter: filter'>" +
					"<i class='icon-{{ icon }}'></i> icon-{{ icon }}" +
				"</li>" +
			"</ul>" +
		"</div>";
		definition.scope = {
			filter: "="
		};

		definition.link = function( scope, element ) {
			$http.get( "assets/json/icons.json" ).then(function( response ) {
				scope.groups = response.data;
			});
		};

		return definition;
	});

}( angular );