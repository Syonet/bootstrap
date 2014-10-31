!function( $, ng ) {
	"use strict";

	var forEach = ng.forEach;

	ng.module( "syonet" ).directive( "syoCheckList", function() {
		var guid = 0;
		var definition = {};

		definition.restrict = "E";
		definition.replace = true;

		definition.template = function() {
			guid++;
			return "<ul ng-init='init()' class='syo-check-list'>" +
						"<li class='syo-check-list-header' ng-if='header && !checkAll()'>{{ header }}</li>" +
						"<li class='syo-check-list-header' ng-if='header && checkAll()'>" +
							"<input type='checkbox' id='syochecklist-header-" + guid + "{{ index }}'" +
							"       ng-checked='isAllChecked()'>" +
							"<label for='syochecklist-header-" + guid + "{{ index }}'>{{ header }}</label>" +
						"</li>" +
						"<li ng-repeat>" +
							"<input type='checkbox' id='syochecklist" + guid + "{{ index }}{{ $index }}'" +
							"       name='syochecklist" + guid + "{{ index }}'>" +
							"<label for='syochecklist" + guid + "{{ index }}{{ $index }}'>" +
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
			checkAll: "&",
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

					$scope.$watch( "ngModel", function() {
						if ( !ng.isArray( $scope.ngModel ) ) {
							$scope.ngModel = [];
						}

						$scope.checked = {};
						forEach( $scope.ngModel, function( val ) {
							$scope.checked[ val ] = true;
						});
					});

					$scope.$watchCollection( "checked", function() {
						forEach( $scope.getValues(), function( val ) {
							var checked = $scope.checked[ val ];
							var index = $scope.ngModel.indexOf( val );

							checked && index === -1 ? $scope.ngModel.push( val ) : null;
							!checked && index > -1 ? $scope.ngModel.splice( index, 1 ) : null;
						});
					});

					$scope.$watch( "items | filter: filterStr", function( items ) {
						var k, showMsg;
						items = items || {};
						showMsg = !items.length;

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

				// Retorna todos os valores dos checkboxes de acordo com a regra da diretiva
				$scope.getValues = function() {
					var out = [];

					forEach( $scope.items, function( item, key ) {
						var val;
						if ( $scope.value === "$key" ) {
							val = key;
						} else {
							val = $scope.value ? item[ $scope.value ] : item;
						}

						out.push( val );
					});

					return out;
				};

				// Determina se todos os checkboxes estão marcados ou não
				$scope.isAllChecked = function() {
					var checked = true;

					forEach( $scope.getValues(), function( val ) {
						checked = checked && $scope.checked[ val ];
					});

					return checked;
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
			$input.attr( "ng-model", "checked[ " + inputVal + " ]" );

			return definition.link;
		};

		definition.link = function( $scope, $element ) {
			// Altera os valores de todos os checkboxes com base no valor do allChecked
			$element.on( "change", ".syo-check-list-header input", function() {
				var toggle = this.checked;

				forEach( $scope.getValues(), function( val ) {
					$scope.checked[ val ] = !!toggle;
				});

				$scope.$apply();
			});
		};

		return definition;
	});

}( jQuery, angular );