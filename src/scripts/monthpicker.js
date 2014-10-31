!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoMonthpicker", function() {
		/* jshint boss: true */
		var definition = {};

		definition.replace = true;
		definition.restrict = "EA";
		definition.require = "ngModel";

		definition.scope = {
			ngModel: "=",
			minDate: "@",
			maxDate: "@"
		};

		definition.template =
			"<div class='row'>" +
				"<div class='col col-small-7'>" +
					"<select class='input-block-level'" +
					"        ng-model='month'" +
					"        ng-options='i as month for (i, month) in getMonths()'></select>" +
				"</div>" +
				"<div class='col col-small-5'>" +
					"<select class='input-block-level'" +
					"        ng-model='year'" +
					"        ng-options='year as year for year in getYears()'></select>" +
				"</div>" +
			"</div>";

		definition.controller = [
			"$scope",
			function( $scope ) {
				// Faz o parse do valor já validando-o (não pode ser mês < 0 nem mês > 12).
				var monthRegex = /^(0[1-9]|1[0-2])\/(\d{4})$/;

				// Faz o parse de um valor que é uma operação matemática (+10y, -3m)
				// y = year (ano); m = month (mês).
				var opRegex = /(\+|\-)(\d+)(y|m)/;

				// Guarda a data de hoje apenas para fins de utilidade no controller
				var today = new Date();
				var months = [
					"janeiro",
					"fevereiro",
					"março",
					"abril",
					"maio",
					"junho",
					"julho",
					"agosto",
					"setembro",
					"outubro",
					"novembro",
					"dezembro"
				];

				function parse( val, defaultVal ) {
					var match, year, month;
					var outVal = new Date( today );

					if ( val ) {
						val = String( val );
						if ( match = val.match( monthRegex ) ) {
							return new Date( match[ 2 ], ( +match[ 1 ] - 1 ), 1 );
						}

						// Testa por operações na string passada
						while ( match = val.match( opRegex ) ) {
							year = outVal.getFullYear();
							month = outVal.getMonth();

							if ( match[ 1 ] === "+" ) {
								year += match[ 3 ] === "y" ? +match[ 2 ] : 0;
								month += match[ 3 ] === "m" ? +match[ 2 ] : 0;
							} else {
								year -= match[ 3 ] === "y" ? +match[ 2 ] : 0;
								month -= match[ 3 ] === "m" ? +match[ 2 ] : 0;
							}

							// Atualiza o mes e o ano
							outVal.setMonth( month );
							outVal.setFullYear( year );

							// Remove o match da string
							val = val.replace( match[ 0 ], "" );
						}

						// Se as variaveis year e month foram populadas, significa que entrou no while
						if ( year != null ) {
							return outVal;
						}
					}

					return defaultVal;
				}

				function getMinDate() {
					// Caso a data minima não seja válida, utiliza hoje - 100 anos
					return parse(
						$scope.minDate,
						new Date( today.getFullYear() - 100, today.getMonth(), today.getDate() )
					);
				}

				function getMaxDate() {
					// Caso a data máxima não seja válida, utiliza hoje + 10 anos
					return parse(
						$scope.maxDate,
						new Date( today.getFullYear() + 10, today.getMonth(), today.getDate() )
					);
				}

				$scope.getMonths = function() {
					var i;
					var from = 0;
					var to = months.length;
					var _months = {};
					var min = getMinDate();
					var max = getMaxDate();
					var current = parse( $scope.ngModel, today );

					if ( max.getFullYear() === current.getFullYear() ) {
						from = 0;
						to = max.getMonth() + 1;
					} else if ( min.getFullYear() === current.getFullYear() ) {
						from = min.getMonth();
					}

					for ( i = ( from + 1 ); i <= to; i++ ) {
						_months[ i < 10 ? "0" + i : "" + i ] = months[ i - 1 ];
					}

					// Se o mes selecionado esta aquem do permitido, seleciona o maximo permitido
					if ( to < +$scope.month ) {
						$scope.month = to < 10 ? "0" + to : "" + to;
					}

					return _months;
				};

				$scope.getYears = function() {
					var min = getMinDate().getFullYear();
					var max = getMaxDate().getFullYear();
					var range = [];

					for ( ; min <= max; min++ ) {
						range.push( "" + min );
					}

					return range;
				};
			}
		];

		definition.link = function( $scope ) {
			// Observa a mudança de datas nos selects
			$scope.$watch( "month + '/' + year", function( newVal, oldVal ) {
				if ( oldVal !== newVal ) {
					$scope.ngModel = newVal;
				}
			});

			// Observa a mudança da data no model externo
			$scope.$watch( "ngModel", function( val ) {
				var parts = [];
				if ( val ) {
					parts = val.split( "/" );
				}

				$scope.month = parts[ 0 ];
				$scope.year = parts[ 1 ];
			});
		};

		return definition;
	});

}( jQuery, angular );