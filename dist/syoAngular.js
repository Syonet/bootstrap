/*!
 * Syonet Bootstrap v0.9.6
 * O conjunto de ferramentas front-end da Syonet
 * http://syonet.github.com/bootstrap/
 *
 * Created by Syonet CRM <syonet@syonet.com>
 * http://www.syonet.com
 */

!function( ng ) {
	"use strict";
	ng.module( "syonet", [
		"syonet.notification",
		"syonet.popover",
		"syonet.tooltip"
	]);
}( angular );
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
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoClick", [ "$timeout", function( $timeout ) {
		return function( $scope, $element, $attr ) {
			// Bloqueia ou não a execução do clique.
			// Se o processamento de uma promise é necessário, a reexecução do clique
			// dependerá do término do evento anterior.
			var lock = false;

			function gotoHref() {
				$timeout(function() {
					// Se tem alguma coisa no atributo href, tenta acessar o elemento nativo
					if ( $element.attr( "href" ) ) {
						$element.get( 0 ).click();
					}
				});
			}

			$element.on( "click", function( e ) {
				var result;

				if ( lock ) {
					lock = false;
					return true;
				}

				// @TODO Passar $event
				result = $scope.$eval( $attr.syoClick );
				e.preventDefault();

				if ( result && typeof result.then === "function" ) {
					lock = true;

					result.then(function() {
						gotoHref();
					});
				} else if ( result !== false ) {
					lock = true;
					gotoHref();
				}
			});
		};
	}]);

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "contains", function() {
		return function( input, arg ) {
			if ( !Array.isArray( input ) || arg === undefined ) {
				return false;
			}

			return input.indexOf( arg ) > -1;
		};
	});

}( jQuery, angular );
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
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoDatepicker", [ "$timeout", function( $timeout ) {
		var definition = {};

		definition.restrict = "A";
		definition.require = "?ngModel";

		definition.link = function( $scope, $element, $attr, ngModel ) {
			var $button;
			var options = $scope.$eval( $attr.syoDatepicker ) || {};
			var oldFn = options.onSelect;

			if ( ngModel ) {
				// Formata a data sempre em dd/mm/yy ou apenas mm/yy
				ngModel.$parsers.push(function() {
					return $.datepicker.formatDate( "dd/mm/yy", $element.datepicker( "getDate" ) );
				});

				options.onSelect = function( date, inst ) {
					// Garante que o model seja atualizado apropriadamente
					ngModel.$setViewValue( date );
					$scope.$apply();

					// ...e ainda chama a função onSelect antiga!
					if ( typeof oldFn === "function" ) {
						oldFn.call( this, date, inst );
					}
				};
			}

			// Instancia o datepicker
			$timeout(function() {
				$element.datepicker( options );
			});

			// Quando há um botão para exibir o datepicker...
			$button = $element.next( ".ui-datepicker-trigger" );
			if ( $button.length ) {
				$button.before( " " );
				$button.addClass( "syo-button" );

				// Coloca o botão dentro do seu container, caso o input esteja em um input row
				if ( $element.parent().is( ".syo-input-row" ) ) {
					$button.wrap( "<div class='syo-input-row-addon'></div>" );
				}
			}
		};

		return definition;
	}]);

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	var syo = ng.module( "syonet" );
	var extend = ng.extend;

	var defaults = {
		autoOpen: false,
		modal: false,
		closeText: "Fechar"
	};

	syo.directive( "syoDialog", function() {
		var definition = {};

		definition.restrict = "E";
		definition.scope = true;
		definition.transclude = true;
		definition.replace = true;
		definition.controller = "syoDialogController";
		definition.controllerAs = "$dialog";
		definition.template = "<div class='syo-dialog-content'></div>";

		definition.link = function( scope, element, attrs, $dialog, transcludeFn ) {
			// Seta um controller se estiver disponível
			if ( attrs.controller ) {
				element.attr( "ng-controller", attrs.controller );
			}

			// Se não há uma promise setada no escopo (significando que a dialog está sendo inicializada de uma view),
			// então vamos fazer o transclude pra setar o conteúdo da dialog
			if ( !scope.$$promise ) {
				transcludeFn(function( children ) {
					$dialog._setContent( children );
				});
			}
		};

		return definition;
	});

	syo.controller( "syoDialogController", function( $scope, $element, $attrs, $q, $compile ) {
		var ctrl = this;
		var initialOptions = $attrs.options;

		ctrl.open = function() {
			return ctrl.option().then(function( options ) {
				$element.dialog( "widget" ).css({
					"max-width": options.maxWidth
				});

				$element.dialog( "open" );
			});
		};

		ctrl.close = function() {
			return ctrl.promise.then(function() {
				$element.dialog( "close" );
			});
		};

		ctrl.destroy = function() {
			$scope.$destroy();
		};

		ctrl.option = function() {
			var args = [].slice.call( arguments );

			// Adiciona o nome do método 'option' pra chamar no elemento que tem a dialog
			args.unshift( "option" );

			return ctrl.promise.then(function() {
				var ret = $element.dialog.apply( $element, args );
				return ret instanceof $ ? undefined : ret;
			});
		};

		ctrl.promise = ( $scope.$$promise || $q.when( null ) ).then(function() {
			ctrl.$resolved = true;
		});

		ctrl._setContent = function( template ) {
			var options = $scope.$eval( initialOptions );
			$element.append( template );
			$compile( $element )( $scope );

			// Se há um alias pro controller, seta ele no escopo agora, após o compile
			if ( $attrs.controller && $attrs.controllerAs ) {
				$scope[ $attrs.controllerAs ] = $element.controller();
			}

			// Remove o prefixo "on" dos callbacks da dialog
			if ( options ) {
				[ "BeforeClose", "Close", "Open" ].forEach(function( cb ) {
					var uncapitalized = cb[ 0 ].toLowerCase() + cb.substr( 1 );
					options[ uncapitalized ] = options[ "on" + cb ];
					delete options[ "on" + cb ];
				});
			}

			$element.dialog( options );
		};

		$scope.$on( "$destroy", function() {
			// Destroi a instância da dialog antes de destruir o elemento
			$element.dialog( "destroy" );
			$element.remove();
		});
	});

	syo.provider( "$dialog", function() {
		var $dialogProvider = {};

		$dialogProvider.defaults = defaults;

		$dialogProvider.$get = [
			"$compile",
			"$templatePromise",
			"$rootScope",
			"$document",
			function( $compile, $templatePromise, $rootScope, $document ) {
				var create = function createDialog( options ) {
					var scope, dialog, element;
					options = options || {};

					if ( !options.template && !options.templateUrl ) {
						throw new Error( "Deve ser passada a opção 'template' ou a opção 'templateUrl'!" );
					}

					// Cria um novo escopo intermediário
					scope = ( options.scope || $rootScope ).$new();

					// Estende as opções padrão com os valores passados
					scope.options = extend( {}, defaults, options );

					// Estende o escopo com as variáveis locais
					extend( scope, options.locals );

					// Busca o template
					scope.$$promise = $templatePromise(
						options.template,
						options.templateUrl
					).then(function( template ) {
						// Seta o template e (consequentemente) inicializa a dialog
						dialog._setContent( template );
					});

					// Cria o elemento da dialog e seta os atributos principais
					element = $( "<syo-dialog>" );
					element.attr({
						options: "options",
						controller: options.controller,
						"controller-as": options.controllerAs
					});

					$document.find( "body" ).append( element );
					element = $compile( element )( scope );

					// Recupera o controller da dialog
					dialog = element.controller( "syoDialog" );
					return dialog;
				};

				return {
					create: create
				};
			}
		];

		return $dialogProvider;
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoFieldError", function() {
		return {
			restrict: "EA",
			transclude: true,
			replace: true,
			template:
				"<span class='syo-field-help syo-error'>" +
					"<i class='icon-exclamation-circle'></i> " +
					"<span ng-transclude></span>" +
				"</span>"
		};
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoGiveFocus", function( $parse, $timeout ) {
		return function( scope, element, attrs ) {
			var model = $parse( attrs.syoGiveFocus );

			scope.$watch( model, function( value ) {
				if ( value ) {
					$timeout(function() {
						element[ 0 ].focus();
					});
				}
			});

			// Ao fazer blur, seta para false a propriedade, se ela for setável
			element.on( "blur", function() {
				try {
					scope.$apply( model.assign( scope, false ) );
				} catch ( e ) {}
			});
		};
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoInitData", function( $parse ) {
		return {
			restrict: "E",
			replace: true,
			template: "<input type='hidden'>",
			link: function( $scope, $element, $attr ) {
				var key = $attr.key;
				var value = $attr.value;

				// Não há chave, não seta nada.
				if ( !key ) {
					return;
				}

				// Tenta interpretar como JSON. Se não houver sucesso, pelo menos seta como string.
				try {
					value = value ? JSON.parse( value ) : null;
				} catch ( e ) {}

				// Seta a chave no escopo
				$parse( key ).assign( $scope, value );
			}
		};
	});
}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).service( "$localStorage", [
		"$window",
		function( $window ) {
			var localStorage = $window.localStorage;
			var $factory = {
				removeAll: function() {
					localStorage.clear();
					return $factory;
				},
				remove: function( key ) {
					localStorage.removeItem( key );
					return $factory;
				},
				put: function( key, value ) {
					if ( ng.isObject( key ) ) {
						ng.forEach( key, function( v, k ) {
							$factory.put( k, v );
						});

						return $factory;
					} else {
						localStorage.setItem( key, JSON.stringify( value ) );
					}

					return $factory;
				},
				get: function( key ) {
					var val = localStorage.getItem( key );
					return val == null ? undefined : JSON.parse( val );
				}
			};

			return $factory;
		}
	]);

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoMaskOverride", function() {
		var definition = {};

		definition.restrict = "A";
		definition.require = "ngModel";
		definition.priority = 1000;

		definition.link = function( $scope, $element, $attr, ngModel ) {
			var viewValue;
			var mask = $attr.uiMask || "";
			var optional = mask.indexOf( "?" );

			if ( !mask ) {
				return;
			}

			ngModel.$parsers.push( parser );

			function parser() {
				var unfilledIndex;
				viewValue = ngModel.$viewValue;

				// Se tem parte da mascara que é opcional e não foi preenchida, corta até ela
				// e fica com o que tem antes
				unfilledIndex = viewValue.indexOf( "_", optional );
				if ( ~optional && ~unfilledIndex ) {
					viewValue = viewValue.substring( 0, unfilledIndex );
				}

				return viewValue;
			}
		};

		return definition;
	});

}( jQuery, angular );
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
!function( $, ng ) {
	"use strict";

	var NOTIFICATION_TOP_KEY = "notificationTop";

	var module = ng.module( "syonet.notification", [] );

	module.directive( "syoNotification", function( $document ) {
		var definition = {};
		var container = $document.find( "body" );

		definition.template =
			"<div class='syo-notification syo-notification-fixed'>" +
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

!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "offset", function() {
		return function( input, offset ) {
			offset = +offset || 0;
			offset = offset < 0 ? 0 : offset;
			return !Array.isArray( input ) ? input : input.slice( offset );
		};
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoOverlay", function() {
		return {
			replace: true,
			transclude: true,
			restrict: "EA",
			template: "<div class='syo-overlay'><div class='syo-overlay-content' ng-transclude></div></div>",
			link: function( $scope, $element, $attr ) {
				var $focused = $();

				$scope.$watch( $attr.syoOverlay, function( newVal, oldVal ) {
					if ( !oldVal ) {
						$focused = $( ":focus" ).blur();
					} else if ( !newVal ) {
						$focused.focus();
					}

					$element.toggleClass( "syo-active", !!newVal );
				});
			}
		};
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "pick", function() {
		return function( input, arg ) {
			var out;

			// Sem filtro, retorna tudo.
			if ( !arg ) {
				return input;
			}

			out = {};
			out[ arg ] = input[ arg ];
			return out;
		};
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	var instances = [];
	var module = ng.module( "syonet.popover", [] );

	var findByConfig = function( config ) {
		var i = 0;
		for ( ; i < instances.length; i++ ) {
			if ( instances[ i ].config === config ) {
				return instances[ i ];
			}
		}
	};

	module.run(function( $rootScope, $window ) {
		// Fecha todos os popovers abertos ao clicar em algum lugar ou perder o foco da janela
		$( $window ).on( "click blur", function( evt ) {
			if ( evt.type === "blur" && evt.target !== $window ) {
				return;
			}

			instances.forEach(function( instance ) {
				instance.close();
			});

			!$rootScope.$$phase && $rootScope.$apply();
		});

		$( $window ).on( "resize scroll", function() {
			instances.forEach(function( instance ) {
				instance.reposition();
			});
		});
	});

	module.directive( "syoPopover", function( $document, $compile ) {
		var definition = {};

		definition.scope = true;
		definition.restrict = "A";
		definition.link = function( scope, element, attrs ) {
			var popover, controller, currentEvent;

			element.parents().on( "scroll", function( evt ) {
				// Fecha o popover se ele estiver aberto e aplica um digest
				if ( controller.$isOpen ) {
					evt.stopPropagation();
					controller.close();
					scope.$apply();
				}
			});

			scope.$on( "$destroy", function() {
				instances.splice( instances.indexOf( controller ), 1 );

				// Se esta era a última instância do controller, então vamos destruir ele
				if ( !~instances.indexOf( controller ) ) {
					controller.destroy();
				}
			});

			attrs.$observe( "syoPopover", function( config ) {
				var mustBind = true;
				config = scope.$eval( config );
				config.event = config.event || "click";

				controller = findByConfig( config );
				if ( controller ) {
					popover = controller.element;
				}

				if ( !popover ) {
					scope.$config = config;

					// Cria o elemento, compila, obtem o controller e adiciona ao array de instâncias
					popover = $( "<syo-popover-element config='$config'>" );
					popover = $compile( popover )( scope );
					controller = popover.controller( "syoPopoverElement" );

					// Coloca o popover no DOM
					$document.find( "body" ).append( popover );
				} else if ( currentEvent ) {
					// O evento mudou?
					if ( currentEvent.in !== config.event ) {
						// Sim, então vamos remover os listeners que adicionamos
						element.off( currentEvent.in, toggle );
						element.off( currentEvent.out, toggle );
					} else {
						// Determina que não é necessário bindar os eventos
						mustBind = false;
					}
				}

				instances.push( controller );
				currentEvent = {
					in: config.event,
					out: getOutEvent( config.event )
				};

				if ( mustBind ) {
					// Binda o evento de entrada
					element.on( currentEvent.in, toggle );

					// Binda o evento de saída caso seja necessário
					if ( currentEvent.in !== currentEvent.out ) {
						element.on( currentEvent.out, toggle );
					}

					// Binda eventos de abertura/fechamento do popover
					element.on( "popoveropen", config.onOpen );
					element.on( "popoverclose", config.onClose );
				}
			});

			function toggle( evt ) {
				var isEventIn = evt.type === currentEvent.in;
				var otherTarget = controller.target !== element;

				// Para a propagação
				evt.stopPropagation();

				// Aponta pro nosso elemento atual
				controller.target = element;

				// Se o controller está apontando para outro elemento, vamos abrir o popover.
				if ( otherTarget ) {
					// Se o evento for de abertura do popover, faremos isso
					if ( isEventIn ) {
						controller.open();
					}
				} else if ( currentEvent.in === currentEvent.out ) {
					// Eventos iguais, faz toggle (aberto? fecha; fechado? abre)
					!controller.$isOpen ? controller.open() : controller.close();
				} else {
					// Eventos diferentes, abre se for evento de entrada, ou o contrário
					isEventIn ? controller.open() : controller.close();
				}

				// Executa um digest
				scope.$apply();
			}
		};

		return definition;

		// -------------------------------------------------------------------------------------------------------------

		// Retorna qual evento o elemento de origem deverá responder pra fechar o popover.
		function getOutEvent( eventIn ) {
			if ( eventIn === "mouseenter" ) {
				return "mouseleave";
			}

			return eventIn;
		}
	});

	module.controller( "SyoPopoverController", function SyoPopoverController( $scope, $element ) {
		var ctrl = this;

		ctrl.config = $scope.config;
		ctrl.element = $element;
		ctrl.$isOpen = false;

		ctrl.open = function() {
			var evt;

			if ( ctrl.$isOpen ) {
				return;
			}

			evt = new $.Event( "popoveropen" );
			ctrl.target.trigger( evt, [ ctrl.config.scope, ctrl ] );

			if ( evt.isDefaultPrevented() ) {
				return;
			}

			ctrl.$isOpen = true;
		};

		ctrl.close = function() {
			var evt;

			if ( !ctrl.$isOpen ) {
				return;
			}

			evt = new $.Event( "popoverclose" );
			ctrl.target.trigger( evt, [ ctrl.config.scope, ctrl ] );

			if ( evt.isDefaultPrevented() ) {
				return;
			}

			ctrl.$isOpen = false;
		};

		ctrl.reposition = function() {
			$scope.$emit( "reposition" );
		};

		ctrl.destroy = function() {
			$scope.$destroy();
			$element.remove();
		};
	});

	module.directive( "syoPopoverElement", function( $rootScope, $compile, $templatePromise, $timeout ) {
		var definition = {};

		definition.replace = true;
		definition.restrict = "E";
		definition.controller = "SyoPopoverController";
		definition.controllerAs = "$popover";
		definition.scope = {
			config: "="
		};

		definition.template =
			"<div ng-class='[ \"syo-popover\", \"syo-popover-\" + config.position ]' ng-show='$popover.$isOpen'>" +
				"<div class='syo-popover-arrow'></div>" +
				"<div class='syo-popover-titlebar'>" +
					"<div class='syo-popover-title'>{{ config.title }}</div>" +
					"<div class='syo-popover-close' ng-click='$popover.close()'>" +
						"<i class='icon-remove-circle'></i>" +
					"</div>" +
				"</div>" +
			"</div>";

		definition.link = function( scope, element, attr, $popover ) {
			var loaded;
			var config = scope.config;

			// Cria um escopo e estende com as suas variáveis locais
			var popoverScope = config.scope = ( config.scope || $rootScope ).$new();
			ng.extend( popoverScope, config.locals );

			// Utilizado pra reposicionar a partir do controller
			scope.$on( "reposition", reposition );

			scope.$watch( "config.position", reposition );
			scope.$watch( "$popover.target", reposition );
			scope.$watch( "$popover.$isOpen", function( open ) {
				var content;

				if ( open === undefined ) {
					return;
				}

				// O conteúdo já foi carregado?
				if ( open && !loaded ) {
					loaded = true;

					// Cria uma diretiva com o conteúdo de uma progressbar, só até o template terminar de baixar
					content = $( "<syo-popover-content><div syo-progressbar='100'></div></syo-popover-content>" );
					content = $compile( content )( scope );
					element.append( content );

					$templatePromise( config.template, config.templateUrl ).then(function( template ) {
						// Remove o conteúdo antigo
						content.remove();

						// Inclui o conteúdo vindo do template
						content = $( "<syo-popover-content>" ).html( template );
						content = $compile( content )( popoverScope );
						element.append( content );

						// Reposiciona
						reposition();
					});
				}

				// Reposiciona
				if ( open ) {
					reposition();
				}
			});

			// ---------------------------------------------------------------------------------------------------------

			function reposition() {
				// Variáveis utilizadas no cálculo de posicionamento no inicio/fim do elemento
				var atPos, myPos, atStart, positionValue;
				var position = {};

				// Se não há posição, utiliza top, que é o padrão
				config.position = ( config.position || "top" );
				positionValue = config.position.split( "-" );

				// Não posiciona se estiver fechado.
				if ( !$popover.$isOpen ) {
					return;
				}

				switch ( positionValue[ 0 ] ) {
					case "top":
						position.at = "center top-15";
						position.my = "center bottom";
						break;

					case "right":
						position.at = "right+15 center";
						position.my = "left center";
						break;

					case "bottom":
						position.at = "center bottom+15";
						position.my = "center top";
						break;

					case "left":
						position.at = "left-15 center";
						position.my = "right center";
						break;
				}

				if ( positionValue[ 1 ] ) {
					atStart = positionValue[ 1 ] === "start";

					if ( /^top|bottom$/.test( positionValue[ 0 ] ) ) {
						atPos = atStart ? "left" : "right";
						myPos = atStart ? "left-5" : "right+5";
					} else {
						atPos = atStart ? "top" : "bottom";
						myPos = atStart ? "top-5" : "bottom+5";
					}

					position.at = position.at.replace( "center", atPos );
					position.my = position.my.replace( "center", myPos );
				}

				position.of = $popover.target;
				position.within = $popover.target;

				// @FIXME collision = flip não funciona no Firefox Android :'(
				position.collision = "none";

				// Fecha tooltip se necessário
				closeTooltip();

				// Para setar a posição, deve-se aguardar até que o digest do elemento termine
				$timeout(function() {
					var maxWidth, pos;

					// Posiciona o elemento e também seta o z-index
					element.position( position ).css( "z-index", findZIndex( $popover.target[ 0 ] ) );
					pos = element.position();

					// Calcula se o posicionamento colocou o elemento pra fora da tela, mas
					// apenas quando estamos usando left/right. Caso sim, então o elemento será
					// alterado para ter um max-width que o permita ficar 100% na tela.
					if ( positionValue[ 0 ] === "left" ) {
						if ( pos.left < 0 ) {
							maxWidth = element.outerWidth() + pos.left;
						}
					} else if ( positionValue[ 0 ] === "right" ) {
						if ( element.outerWidth() + pos.left > $( window ).width() ) {
							maxWidth = $( window ).width() + pos.left;
						}
					}

					// Se tem um maxWidth calculado, seta este e reposiciona
					if ( maxWidth ) {
						element.css( "max-width", maxWidth );
						element.position( position );
					}
				});
			}

			// Encontra o z-index acumulado do elemento alvo e retorna um valor propício para posicionar o popover
			function findZIndex( target ) {
				var index = 0;

				do {
					index += Math.max( +$( target ).css( "z-index" ) || 0, 0 );
					target = target.parentNode;
				} while ( target != null && target.nodeType === 1 );

				return index + 1;
			}

			function closeTooltip() {
				// Verifica se há uma diretiva syoTooltip presente no elemento atual.
				// Se houver, fecha o mesmo para que não sobreponha ao popover
				var tooltip = $popover.target.controller( "syoTooltip" );
				if ( tooltip ) {
					tooltip.close();
				}
			}
		};

		return definition;
	});

	module.directive( "syoPopoverContent", function() {
		return {
			restrict: "E",
			replace: true,
			transclude: true,
			template: "<div class='syo-popover-content' ng-transclude></div>"
		};
	});

}( jQuery, angular );

!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoProgressbar", function() {
		var definition = {};

		definition.replace = true;
		definition.template =
			"<div class='syo-progressbar'>" +
				"<div class='syo-progressbar-value'></div>" +
			"</div>";

		definition.link = function( $scope, $element, $attr ) {
			$attr.$observe( "syoProgressbar", function( val ) {
				val = $scope.$eval( val );
				val = parseFloat( val );
				$element.find( ".syo-progressbar-value" ).css( "width", Math.min( val || 0, 100 ) + "%" );
			});
		};

		return definition;
	});

}( jQuery, angular );
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
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "range", function() {
		return function( input, arg ) {
			var i;
			var out = [];
			arg = +arg || 0;

			for ( i = 0; i < arg; i++ ) {
				out.push( i );
			}

			return out;
		};
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "removeAccents", function() {
		function replace( str ) {
			var acentos = [
				[ /[\300-\306]/g, "A" ],
				[ /[\340-\346]/g, "a" ],
				[ /[\310-\313]/g, "E" ],
				[ /[\350-\353]/g, "e" ],
				[ /[\314-\317]/g, "I" ],
				[ /[\354-\357]/g, "i" ],
				[ /[\322-\330]/g, "O" ],
				[ /[\362-\370]/g, "o" ],
				[ /[\331-\334]/g, "U" ],
				[ /[\371-\374]/g, "u" ],
				[ /[\321]/g, "N" ],
				[ /[\361]/g, "n" ],
				[ /[\307]/g, "C" ],
				[ /[\347]/g, "c" ]
			];

			acentos.forEach(function( pair ) {
				str = str.replace( pair[ 0 ], pair[ 1 ] );
			});

			return str;
		}

		return function doReplace( input, prop, recurse ) {
			if ( Array.isArray( input ) && ( recurse == null || recurse ) ) {
				input.forEach(function( val, i ) {
					input[ i ] = doReplace( val, prop, false );
				});

				return input;
			}

			if ( input[ prop ] ) {
				input[ prop ] = replace( String( input[ prop ] ) );
			} else {
				input = replace( String( input ) );
			}

			return input;
		};
	});

}( jQuery, angular );
!function( ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoResponsiveClass", [ "$window", function( $window ) {
		var definition = {};
		var classesDefs = [];
		var matchMedia = {
			tiny: function() {
				return $window.matchMedia( "(max-width: 767px)" );
			},
			small: function() {
				return $window.matchMedia( "(min-width: 768px) and (max-width: 979px)" );
			},
			smallAbove: function() {
				return $window.matchMedia( "(min-width: 768px)" );
			},
			smallBelow: function() {
				return $window.matchMedia( "(max-width: 979px)" );
			},
			medium: function() {
				return $window.matchMedia( "(min-width: 980px) and (max-width: 1199px)" );
			},
			mediumAbove: function() {
				return $window.matchMedia( "(min-width: 980px)" );
			},
			mediumBelow: function() {
				return $window.matchMedia( "(max-width: 1199px)" );
			},
			large: function() {
				return $window.matchMedia( "(min-width: 1200px) and (max-width: 1599px)" );
			},
			largeAbove: function() {
				return $window.matchMedia( "(min-width: 1200px)" );
			},
			xlarge: function() {
				return $window.matchMedia( "(min-width: 1600px)" );
			}
		};
		var normalize = function( value ) {
			var ret = {};

			if ( ng.isArray( value ) ) {
				ret.all = value.join( " " );
			} else if ( typeof value === "string" ) {
				ret.all = value;
			} else if ( ng.isObject( value ) ) {
				ng.forEach( value, function( val, key ) {
					if ( ng.isArray( val ) ) {
						ret[ key ] = val.join( " " );
					} else if ( typeof val === "string" ) {
						ret[ key ] = val;
					}
				});
			}

			// Seta as chaves padrão como string vazia, caso não existam
			ret.all = ret.all || "";
			ng.forEach( matchMedia, function( fn, key ) {
				ret[ key ] = ret[ key ] || "";
			});

			return ret;
		};

		// Adiciona os listeners, apenas uma vez cada.
		// Evita que tenhamos 5x o mesmo listener pra 5 elementos na página usando a diretiva,
		// caso o código estivesse dentro do método link.
		ng.forEach( matchMedia, function( fn, key ) {
			fn().addListener(function( mediaQuery ) {
				classesDefs.forEach(function( def ) {
					// Se não há nenhuma classe disponível para
					if ( !def[ key ] ) {
						return;
					}

					if ( mediaQuery.matches ) {
						def.element.addClass( def[ key ] );
					} else {
						def.element.removeClass( def[ key ] );
					}
				});
			});
		});

		definition.link = function( scope, element, attr ) {
			var def = {};
			def.element = element;
			classesDefs.push( def );

			scope.$watch(function responsiveClassWatcher() {
				return scope.$eval( attr.syoResponsiveClass );
			}, function( newVal, oldVal ) {
				newVal = normalize( newVal );
				oldVal = normalize( oldVal );

				// Remove todas as classes de antes
				ng.forEach( oldVal, function( classes ) {
					element.removeClass( classes );
				});

				// Atualiza as classes de media query
				ng.extend( def, newVal );

				// Garante que a chave especial 'element' não seja sobrescrita no
				// objeto da definição
				def.element = element;

				// Adiciona todas as classes que baterem na media query
				ng.forEach( matchMedia, function( fn, key ) {
					if ( fn().matches ) {
						element.addClass( def[ key ] );
					}
				});

				// Adiciona as classes válidas pra todos as media queries.
				element.addClass( def.all );
			}, true );
		};

		return definition;
	}]);
}( angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "round", function() {
		return function( input, decimals, alwaysShowDecimals ) {
			decimals = +decimals || 0;
			input = +input || 0;

			if ( !alwaysShowDecimals && ( input - Math.floor( input ) === 0 ) ) {
				return String( input );
			}

			return input.toFixed( decimals );
		};
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoSlider", [
		function() {
			var definition = {};

			function getOptions( $attrs ) {
				return {
					range: $attrs.range,
					min: +$attrs.min || 0,
					max: +$attrs.max || 100,
					step: +$attrs.step || 1
				};
			}

			definition.restrict = "EA";
			definition.replace = true;
			definition.template = "<div></div>";
			definition.require = "ngModel";

			definition.link = function( $scope, $element, $attrs, ngModel ) {
				var options = getOptions( $attrs );
				var enforcedMin = +$attrs.enforcedMin || options.min;
				var enforcedMax = +$attrs.enforcedMax || options.max;

				$element.slider( options );

				ngModel.$render = function() {
					$element.slider( options.range === true ? "values" : "value", ngModel.$viewValue );
				};

				$element.on( "slide", function( e, ui ) {
					if ( ui.value < enforcedMin ) {
						return false;
					}

					if ( ui.value > enforcedMax ) {
						return false;
					}

					$scope.$apply(function() {
						ngModel.$setViewValue( options.range === true ? ui.values : ui.value );
					});
				});
			};

			return definition;
		}
	]);

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoTabs", [
		"$window",
		function( $window ) {
			return function( $scope, $element, $attr ) {
				var init, bound;

				function resizeTabs() {
					// Reforça heightStyle = 'fill' pra garantir que sempre ocupará 100% da altura mesmo
					$element.tabs( "option", "heightStyle", "fill" );
				}

				$attr.$observe( "syoTabs", function( val ) {
					var options, heightStyle;
					val = $scope.$eval( val ) || {};

					if ( init ) {
						options = $element.tabs( "option" );

						$element.tabs( "option", ng.extend( options, val ) );
						$element.tabs( "refresh" );

						$element.tabs( "option", "active", options.active );

						heightStyle = options.heightStyle;
					} else {
						$element.tabs( val );
						$element.on( "tabsactivate", function() {
							!$scope.$root.$$phase && $scope.$apply();
						});

						init = true;
						heightStyle = val.heightStyle;
					}

					// Adiciona ou remove o evento, dependendo do heightStyle do elemento
					if ( !bound && heightStyle === "fill" ) {
						$( $window ).on( "resize", resizeTabs );
						bound = true;
					} else if ( bound && heightStyle !== "fill" ) {
						$( $window ).off( "resize", resizeTabs );
						bound = false;
					}
				});

				// Ao destruir o escopo, remove também o evento
				$scope.$on( "$destroy", function() {
					if ( bound ) {
						$( $window ).off( "resize", resizeTabs );
					}
				});
			};
		}
	]);

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).factory( "$templatePromise", [
		"$q",
		"$http",
		"$templateCache",
		function( $q, $http, $templateCache ) {
			return function( templateStr, templateUrl ) {
				return templateStr ? $q.when( templateStr ) : $http.get( templateUrl, {
					cache: $templateCache
				}).then(function( result ) {
					return result.data;
				});
			};
		}
	]);

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "toArray", function() {
		return function( input ) {
			return input != null ? Array.prototype.slice.call( input ) : [];
		};
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	var module = ng.module( "syonet.tooltip", [] );

	module.value( "syoTooltipConfig", {
		timeout: 300
	});

	module.controller( "SyoTooltipController", function() {
		var ctrl = this;

		ctrl.close = function() {
			if ( ctrl.target ) {
				ctrl.target.trigger( "mouseleave" );
			}
		};
	});

	module.directive( "syoTooltip", function( syoTooltipConfig ) {
		var definition = {};
		var tooltipTpl = $( "<span>" ).addClass( "syo-tooltip" );

		definition.controller = "SyoTooltipController";
		definition.controllerAs = "$tooltip";

		definition.link = function( scope, element, attr, $tooltip ) {
			var timeout;
			var tooltip = tooltipTpl.clone();

			element.append( tooltip );
			element.on( "mouseenter", "[title]", function( evt ) {
				var target = $( evt.currentTarget );
				var title = target.attr( "title" );

				if ( !title ) {
					return;
				}

				evt.preventDefault();
				evt.stopPropagation();

				// Guarda e remove o title
				target.data( "title", title ).attr( "title", "" );

				timeout = setTimeout(function() {
					var position, positionConfig;
					timeout = null;

					// Se não há nenhum elemento pai, não exibe o tooltip.
					if ( !target.parent().length || target.is( ":hidden" ) ) {
						return;
					}

					position = target.attr( "syo-tooltip-position" );
					positionConfig = {
						of: target,
						collision: "fit"
					};

					switch ( position ) {
						case "top":
							positionConfig.my = "center bottom";
							positionConfig.at = "center top-5px";
							break;

						case "left":
							positionConfig.my = "right center";
							positionConfig.at = "left-5px center";
							break;

						case "right":
							positionConfig.my = "left center";
							positionConfig.at = "right+5px center";
							break;

						default:
							position = "bottom";
							positionConfig.my = "center top";
							positionConfig.at = "center bottom+5px";
							break;
					}

					$tooltip.target = target;

					// Remove todas as classes de posicionamento
					tooltip.removeClass([ "top", "left", "right", "bottom" ].map(function( cls ) {
						return "syo-tooltip-" + cls;
					}).join( " " ) );

					tooltip.addClass( "syo-tooltip-visible syo-tooltip-" + position ).text( title );
					tooltip.position( positionConfig );

					// Adiciona evento $destroy no target e nos seus elementos pai
					target.parents().addBack().on( "$destroy", function destroyCb() {
						$tooltip.close();

						// Remove o evento $destroy do target e seus elementos pai
						target.parents().addBack().off( "$destroy", destroyCb );
					});
				}, syoTooltipConfig.timeout );
			});

			element.on( "mouseleave", "[title]", function( evt ) {
				var target = $( evt.currentTarget );

				target.attr( "title", target.data( "title" ) );

				if ( timeout ) {
					clearTimeout( timeout );
					timeout = null;
					return;
				}

				$tooltip.target = null;
				tooltip.removeClass( "syo-tooltip-visible" );
			});
		};

		return definition;
	});
}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoTouchTest", [
		function() {
			function isTouch() {
				return "ontouchstart" in window ||
						!!( window.DocumentTouch && document instanceof window.DocumentTouch );
			}

			return function( $scope, $element ) {
				$element.toggleClass( "touch", isTouch() );
			};
		}
	]);

}( jQuery, angular );
/* jshint unused: false */
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
			url += querystring.length ? "?" + querystring.join( "&" ) : "";
			url += store.hash ? "#" + store.hash : "";

			return url;
		};

		return URL;
	});

}( jQuery, angular );
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).factory( "$worker", [
		"$window",
		"$document",
		function( $window, $document ) {
			var cache = "";
			try {
				cache = $document.find( "#cache-version" );
				if ( cache.is( "meta" ) ) {
					cache = cache.attr( "content" );
				} else {
					cache = cache.val();
				}
			} catch ( e ) {}

			function getUrl( script, useCache ) {
				// Remove qualquer query string
				script = script.replace( /\?.*$/, "" );

				// Se podemos usar cache, então usa, pô!
				if ( cache && useCache ) {
					script += "?cache=" + cache;
				}

				return script;
			}

			return {
				create: function( url, useCache ) {
					return new $window.Worker( getUrl( url, useCache !== false ) );
				}
			};
		}
	]);

}( jQuery, angular );