!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoDatagrid", [
		"$timeout",
		"$window",
		"$document",
		function( $timeout, $window, $document ) {
			var document = $document[ 0 ];
			var definition = {};

			definition.restrict = "EA";
			definition.replace = true;
			definition.transclude = "element";
			definition.template =
				"<div class='syo-datagrid'>" +
					"<table class='syo-table syo-table-hover syo-datagrid-header'></table>" +
					"<div class='syo-datagrid-body-wrapper'>" +
						"<div class='syo-datagrid-overflow'><div></div></div>" +
						"<div class='syo-datagrid-body'>" +
							"<table class='syo-table syo-table-hover'></table>" +
						"</div>" +
						"<table class='syo-table syo-table-hover syo-datagrid-helper'></table>" +
					"</div>" +
				"</div>";

			definition.scope = {};

			definition.compile = function( element, attr, transclude ) {
				return function( $scope, $element ) {
					var $colgroup, $thead, $tbody, $tfoot;
					var maxHeight;
					var components = {
						header: $element.find( ".syo-datagrid-header" ),
						bodyContainer: $element.find( ".syo-datagrid-body" ),
						bodyWrapper: $element.find( ".syo-datagrid-body-wrapper" ),
						body: $element.find( ".syo-datagrid-body table" ),
						helper: $element.find( ".syo-datagrid-helper" ),
						overflow: $element.find( ".syo-datagrid-overflow" )
					};

					transclude( $scope.$parent, function( clone ) {
						$colgroup = clone.find( "colgroup" );
						$thead = clone.find( "thead" );
						$tbody = clone.find( "tbody" );
						$tfoot = clone.find( "tfoot" );
					});

					// Adiciona os componentes da tabela original ao datagrid
					// Devido a algum bug do Chrome (?), se os colgroups não estiverem antes, o sizing não tem efeito
					components.header.append( $thead ).prepend( $colgroup.clone() );
					components.body.append( $tbody ).prepend( $colgroup.clone() );
					components.helper.append( $tfoot ).prepend( $colgroup.clone() );

					(function() {
						var $cells = $();

						$tbody.each(function() {
							var $tr = $( document.createElement( "tr" ) )
								.addClass( "syo-datagrid-grip-row" )
								.prependTo( this );

							var $cell = $( document.createElement( "td" ) )
								.addClass( "syo-datagrid-dummy" )
								.appendTo( $tr );

							$cells = $cells.add( $cell );
						});

						$scope.$watch(function datagridColumnWatcher() {
							return getColumnCount( components.body );
						}, function( count ) {
							$cells.attr( "colspan", count );
						});
					})();

					(function() {
						var listener = $scope.$watch(function datagridVisibilityWatcher() {
							return $element.is( ":visible" );
						}, function( visible ) {
							// Aguarda até que o elemento esteja vísivel pra fazer alguma coisa
							if ( !visible ) {
								return;
							}

							// Desregistra o listener
							listener();

							// Calcula a altura do body
							recalcHeight();
						});
					})();

					components.body.on( "wheel mousewheel", scrollHandler );
					components.overflow.on( "scroll", scrollHandler );
					components.body.on( "click", "tbody tr", activate );
					$( $window ).on( "resize", function() {
						// Aplica mudanças pendentes
						!$scope.$root.$$phase && $scope.$apply();

						// Recalcula a altura do datagrid e do grip
						recalcHeight();
						recalcGripSize( components.body.height() );
					});

					// Observa se a altura do corpo do grid mudou
					$scope.$watch(function datagridBodyHeightWatcher() {
						return components.body.height();
					}, function( height ) {
						$timeout(function() {
							recalcGripSize( height );
						});
					});

					// Observa se existem helpers ou não
					$scope.$watch(function datagridFooterWatcher() {
						return components.helper.find( "tfoot" ).length > 0;
					}, function( hasHelper ) {
						components.bodyContainer.toggleClass( "syo-datagrid-with-helper", hasHelper );
					});

					// -----------------------------------------------------------------------------

					// Recalcula a altura do body
					function recalcHeight() {
						var headerHeight, helperHeight;

						if ( $element.parent().is( ".flex-row" ) ) {
							// Se estamos dentro de um flex-row as coisas são diferentes
							headerHeight = components.header.height();
							helperHeight = components.helper.height();

							components.bodyWrapper.css(
								"height",
								"calc(100% - " + Math.max( headerHeight + helperHeight, 0 ) + "px)"
							);

							components.body.css(
								"height",
								"calc(100% - " + Math.max( helperHeight, 0 ) + "px)"
							);
						} else {
							// Faz o overflow herdar do max-height do tbody, se disponível
							maxHeight = $.style( $tbody[ 0 ], "max-height" ) || null;
							components.bodyWrapper.css( "max-height", maxHeight );

							// Remove o helper de dentro do body wrapper quando não estamos dentro de um flex-row
							components.helper.appendTo( $element );
						}
					}

					// Recalcula a altura e largura do grip
					function recalcGripSize( height ) {
						var width;
						var $cells = $( ".syo-datagrid-grip", $element );

						components.overflow.find( "div" ).css( "height", height );
						components.overflow.css( "width", "100%" );

						width = components.overflow[ 0 ].offsetWidth - components.overflow[ 0 ].clientWidth + 1;
						components.overflow.width( width );

						if ( width > 1 ) {
							// Pode ser que o min-width tenha ganho do cálculo via JS
							width = components.overflow.width();

							// Remove as células antigas
							$cells.remove();

							components.header.find( "thead" ).each(function() {
								var $tr = $( "tr:visible", this );
								var $cell = $( document.createElement( "th" ) )
									.attr( "rowspan", $tr.length )
									.appendTo( $tr.first() );

								$cells = $cells.add( $cell );
							});
							components.body.find( "tbody" ).each(function() {
								var $tr = $( "tr:visible", this );
								var $cell = $( document.createElement( "td" ) )
									.attr( "rowspan", $tr.length )
									.appendTo( $tr.first() );

								$cells = $cells.add( $cell );
							});

							$cells.addClass( "syo-datagrid-grip" ).innerWidth( width );
						} else {
							$cells.addClass( "syo-hidden" ).width( 0 );
						}
					}

					// Responsável por controlar o posicionamento do scroll do grid
					function scrollHandler( e ) {
						var overflow = components.overflow[ 0 ];

						if ( e.type === "wheel" || e.type === "mousewheel" ) {
							e.preventDefault();

							// Multiplicar por 40 não é exatamente a melhor coisa a se fazer, mas como está até
							// na MDN, então vamos usar como "safe" por hora.
							// https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel
							// => "Listening to this event across browser"
							overflow.scrollTop -= ( e.originalEvent.wheelDeltaY || e.originalEvent.deltaY * -40 );
						}

						components.bodyContainer.scrollTop( overflow.scrollTop );
					}

					// Ativa a linha clicada
					function activate( e ) {
						components.body.find( ".syo-active" ).removeClass( "syo-active" );
						$( e.currentTarget ).addClass( "syo-active" );
					}
				};
			};

			return definition;

			// -------------------------------------------------------------------------------------

			// Retorna o numero de colunas de uma tabela.
			function getColumnCount( $table ) {
				var cellCount = 0;
				var colCount = 0;

				$table.find( "> tbody > tr, > thead > tr" ).not( ".syo-datagrid-grip-row" ).each(function() {
					var span = 0;
					$( this ).children( "td, th" ).filter( ":visible" ).each(function() {
						span += +$( this ).attr( "colspan" ) || 1;
					});

					cellCount = Math.max( span, cellCount );
				});

				$table.find( "> colgroup col:visible" ).each(function() {
					colCount += +$( this ).attr( "span" ) || 1;
				});

				return Math.max( colCount, cellCount );
			}
		}
	]);

}( jQuery, angular );