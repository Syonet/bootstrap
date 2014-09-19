/**
 * syoRadioList
 * ------------
 * Diretiva para criar Check Lists do Syonet Bootstrap, utilizando radio buttons.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoRadioList", function() {
		var guid = 0;
		var definition = {};

		definition.restrict = "E";
		definition.replace = true;

		definition.template = function() {
			guid++;
			return "<ul ng-init='init()' class='syo-check-list'>" +
						"<li class='syo-check-list-header' ng-if='header'>{{ header }}</li>" +
						"<li ng-repeat>" +
							"<input type='radio' id='syoradiolist" + guid + "{{ index }}{{ $index }}'" +
							"       name='syoradiolist" + guid + "' ng-model='$parent.ngModel'>" +
							"<label for='syoradiolist" + guid + "{{ index }}{{ $index }}'>" +
								"{{ label ? item[ label ] : item }}" +
							"</label>" +
						"</li>" +
						"<li ng-if='showMessage' class='syo-check-list-message'>" +
							"<label>{{ message() }}</label>" +
						"</li>" +
					"</ul>";
		};

		definition.scope = {
			items: "=",
			value: "@",
			label: "@",
			header: "@",
			ngModel: "=",
			message: "&",
			filterStr: "=filter"
		};

		definition.controller = [
			"$scope",
			function( $scope ) {
				// Inicializa o escopo da diretiva
				$scope.init = function() {
					// Para o caso de ter ng-repeat na diretiva
					$scope.index = $scope.$parent.$index;

					$scope.$watch( "items | filter: filterStr", function( items ) {
						var k;
						var showMsg = !items.length;

						// Se .length não estiver definido, significa que é um objeto
						if ( items.length == null ) {
							for ( k in items ) {
								showMsg = false;
								break;
							}
						}

						$scope.showMessage = showMsg;
					}, true );
				};
			}
		];

		definition.compile = function( element, attrs ) {
			var inputVal, trackBy;
			var expr = "items | filter: filterStr";
			var $li = element.find( "li[ng-repeat]" );
			var $input = $li.find( "input" );

			if ( attrs.value === "$key" ) {
				trackBy = " track by key";
				inputVal = "key";
			} else if ( attrs.value ) {
				trackBy = " track by item[ value ]";
				inputVal = "item[ value ]";
			} else {
				trackBy = " track by $id(item)";
				inputVal = "item";
			}

			$li.attr( "ng-repeat", "(key, item) in " + expr + trackBy );
			$input.val( "{{ " + inputVal + " }}" );

			// return definition.link;
		};

		return definition;
	});

}( jQuery, angular );