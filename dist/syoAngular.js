!function( ng ) {
	"use strict";
	ng.module( "syonet", [ "ng" ] );
}( angular );
/**
 * syoCheckList
 * ------------
 * Diretiva para criar Check Lists do Syonet Bootstrap, utilizando checkboxes.
 *
 * @docs-link
 */
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
/**
 * syoClick
 * --------
 * Diretiva para links que faz eval de uma expressão no escopo atual e depois acessa o atributo href
 * do elemento. Se a expressão retornar uma promise, então syoClick irá aguardar a promise ser
 * resolvida.
 *
 * @docs-link
 */
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

				if ( typeof result.then === "function" ) {
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
/**
 * contains
 * --------
 * Filtro que retorna um boolean sugerindo a existência de um elemento passado por argumento em um
 * array de entrada.
 *
 * @docs-link
 */
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
/**
 * syoDataGrid
 * -----------
 * Diretiva para criar data grids do Syonet Bootstrap.
 *
 * @docs-link
 */
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

						$scope.$watch(function() {
							return getColumnCount( components.body );
						}, function( count ) {
							$cells.attr( "colspan", count );
						});
					})();

					(function() {
						var listener = $scope.$watch(function() {
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
					$scope.$watch(function() {
						return components.body.height();
					}, function( height ) {
						$timeout(function() {
							recalcGripSize( height );
						});
					});

					// Observa se existem helpers ou não
					$scope.$watch(function() {
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
					$( this ).children( "td, th" ).each(function() {
						span += +$( this ).attr( "colspan" ) || 1;
					});

					cellCount = Math.max( span, cellCount );
				});

				$table.find( "> colgroup col" ).each(function() {
					colCount += +$( this ).attr( "span" ) || 1;
				});

				return Math.max( colCount, cellCount );
			}
		}
	]);

}( jQuery, angular );
/**
 * syoDatepicker
 * -------------
 * Diretiva que instancia um jQuery UI Datepicker no elemento.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoDatepicker", function() {
		var definition = {};

		definition.restrict = "A";
		definition.require = "?ngModel";

		definition.link = function( $scope, $element, $attr, ngModel ) {
			var $button;
			var options = $scope.$eval( $attr.syoDatepicker );
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
			$element.datepicker( options );

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
	});

}( jQuery, angular );
/**
 * $dialog
 * -------
 * Provider para criar um jQuery UI Dialog programaticamente.
 *
 * syoDialog
 * ---------
 * Diretiva que instancia um jQuery UI Dialog no elemento atual, podendo opcionalmente bindar um
 * objeto de controle no escopo atual.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	var syo = ng.module( "syonet" );
	var extend = ng.extend;

	function Dialog() {
		var $element, promise;
		var that = this;

		this._setPromise = function( _promise ) {
			promise = _promise.then(function( _element ) {
				$element = _element;
			});

			return that;
		};

		this.open = function() {
			promise = promise.then(function() {
				var options = that.option();

				// Garante que max-width e max-height fiquem consistentes
				$element.dialog( "widget" ).css({
					"max-width": options.maxWidth
				});

				$element.dialog( "open" );
			});

			return that;
		};

		this.close = function() {
			promise = promise.then(function() {
				$element.dialog( "close" );
			});

			return that;
		};

		this.option = function() {
			var retVal;
			var args = Array.prototype.slice.call( arguments );

			args.unshift( "option" );
			retVal = $element.dialog.apply( $element, args );

			return retVal instanceof $ ? that : retVal;
		};

		this.destroy = function() {
			$element.dialog( "destroy" );
			$element.remove();
		};
	}

	Dialog.defaults = {
		autoOpen: false,
		modal: false
	};

	Dialog.options = {
		ngModel: "@",
		title: "=",
		modal: "&",
		autoOpen: "&",
		draggable: "&",
		height: "@",
		maxHeight: "@",
		width: "@",
		maxWidth: "@",
		onOpen: "&",
		onClose: "&",
		onBeforeClose: "&"
	};

	syo.directive( "syoDialog", [ "$q", function( $q ) {
		var definition = {};

		function getOptions( $scope ) {
			return {
				title: $scope.title,
				modal: $scope.modal(),
				height: $scope.height,
				maxHeight: $scope.maxHeight,
				width: $scope.width,
				maxWidth: $scope.maxWidth,
				draggable: $scope.draggable(),
				autoOpen: $scope.autoOpen(),
				open: function() {
					var ret = $scope.onOpen();
					return typeof ret === "function" ? ret() : ret;
				},
				beforeClose: function() {
					var ret = $scope.onBeforeClose();
					return typeof ret === "function" ? ret() : ret;
				},
				close: function() {
					var ret = $scope.onClose();
					return typeof ret === "function" ? ret() : ret;
				},
				closeText: "Fechar"
			};
		}

		definition.restrict = "E";
		definition.replace = true;
		definition.transclude = true;
		definition.template = "<div><div ng-transclude></div></div>";
		definition.scope = Dialog.options;

		definition.link = function( $scope, $element ) {
			var options = getOptions( $scope );
			$element.dialog( options );

			// Se o escopo atual não tem um provider ainda, cria um e já passa o elemento
			$scope.$provider = ( $scope.$provider || new Dialog()._setPromise( $q.when( $element ) ) );
			$scope.$parent[ $scope.ngModel ] = $scope.$provider;

			// Fornece uma maneira mais fácil de fechar o dialog a partir do HTML
			// Tem que exportar pro $parent ou não fica acessível do conteúdo do dialog
			$scope.$parent.$close = $scope.$provider.close;
		};

		return definition;
	}]);

	syo.provider( "$dialog", [ function() {
		var $dialogProvider = {};

		$dialogProvider.defaults = Dialog.defaults;

		$dialogProvider.$get = [
			"$compile",
			"$templatePromise",
			"$rootScope",
			"$document",
			function( $compile, $templatePromise, $rootScope, $document ) {
				function createDialog( options ) {
					var promise, $element;
					var scope = ( options.scope || $rootScope ).$new();

					if ( !options.template && !options.templateUrl ) {
						throw new Error( "Deve ser passada a opção 'template' ou a opção 'templateUrl'!" );
					}

					options = extend( {}, Dialog.defaults, options );
					extend( scope, options );

					scope.$provider = new Dialog();
					promise = $templatePromise( options.template, options.templateUrl ).then(function( template ) {
						$element = ng.element( "<syo-dialog></syo-dialog>" );

						// Seta todos os atributos possíveis na diretiva.
						ng.forEach( Dialog.options, function( binding, prop ) {
							$element.attr(
								prop.replace( /([A-Z])/g, "-$1" ).toLowerCase(),
								binding[ 0 ] === "@" ? scope[ prop ] : prop
							);
						});

						$element.html( template );

						$document.find( "body" ).eq( 0 ).append( $element );
						$element = $compile( $element )( scope );

						return $element;
					});

					scope.$provider._setPromise( promise );
					return scope.$provider;
				}

				return {
					create: createDialog
				};
			}
		];

		return $dialogProvider;
	}]);

}( jQuery, angular );
/**
 * syoFieldError
 * -------------
 * Diretiva para rapidamente criar um erro de campo de formulário padrão da Syonet.
 *
 * @docs-link
 */
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
/**
 * syoGiveFocus
 * ------------
 * Diretiva para dar foco a um elemento utilizando data-binding.
 *
 * @docs-link
 */
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
/**
 * syoInitData
 * -----------
 * Diretiva para facilmente setar variáveis no escopo atual. Útil para dados inicializados com a página.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoInitData", function() {
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
				$scope[ key ] = value;
			}
		};
	});
}( jQuery, angular );
/**
 * $localStorage
 * -------------
 * API para interagir com o localStorage no Angular.js.
 *
 * @docs-link
 */
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
/**
 * syoMaskOverride
 * ---------------
 * Diretiva para ser utilizada em conjunto com a diretiva ui-mask, cujo valor setado no ng-model
 * é bugado, removendo caracteres que não são da máscara (ex. 9-99 vira 999 no ui-mask puro).
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoMaskOverride", function() {
		var definition = {};

		definition.restrict = "A";
		definition.require = "ngModel";
		definition.priority = 10;

		definition.link = function( $scope, $element, $attr, ngModel ) {
			var viewValue, oldFn;

			if ( !$attr.uiMask ) {
				return;
			}

			oldFn = ngModel.$setViewValue;
			ngModel.$setViewValue = function( val ) {
				oldFn.call( this, val );

				viewValue = ngModel.$viewValue;
				ngModel.$parsers.push(function() {
					return viewValue;
				});
				oldFn.call( this, val );
				ngModel.$parsers.pop();
			};
		};

		return definition;
	});

}( jQuery, angular );
/**
 * syoMonthpicker
 * --------------
 * Diretiva para criar um seletor de ano/mês.
 *
 * @docs-link
 */
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
/**
 * offset
 * ------
 * Filtro para fazer o offset dos dados de um array de entrada.
 *
 * @docs-link
 */
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
/**
 * syoOverlay
 * ----------
 * Diretiva para criar um overlay do Syonet Bootstrap rapidamente, podendo exibi-lo/ocultá-lo usando
 * data binding do Angular.js.
 *
 * @docs-link
 */
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
/**
 * pick
 * ----
 * Filtro que retorna um objeto contendo apenas a chave informada por argumento.
 *
 * @docs-link
 */
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
/**
 * syoPopover
 * ----------
 * Diretiva para criar um popover que abrirá ao interagir com o elemento (clique, mouseover, etc).
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	var syo = ng.module( "syonet" );
	var extend = ng.extend;

	syo.directive( "syoPopover", [
		"$compile",
		"$rootScope",
		"$timeout",
		"$templatePromise",
		"$window",
		function( $compile, $rootScope, $timeout, $templatePromise, $window ) {
			var definition = {};

			definition.restrict = "A";
			definition.scope = {};

			definition.link = function( scope, element, attr ) {
				/* jshint shadow: true, unused: false */
				var $popover, popoverScope, controller, model;
				var loadedContent = false;
				var currentEvent = {
					in: "click",
					out: getOutEvent( "click" )
				};

				attr.$observe( "syoPopover", function( config ) {
					var mustBind = true;
					config = scope.$parent.$eval( config );

					// Se position não foi pasado, seta como top (padrão)
					config.position = config.position || "top";

					if ( !$popover ) {
						$popover = $( "<syo-popover-element></syo-popover-element>" );
						$popover.attr( "on-close", "onClose" );
						$popover.attr( "title", "title" );
						$popover.attr( "position", "position" );
						$popover.attr( "element", "element" );

						if ( !config.template && !config.templateUrl  ) {
							throw new Error( "Deve ser passada a opção 'template' ou a opção 'templateUrl'!" );
						}

						// Usa o escopo passado ou cria um novo a partir do raiz
						popoverScope = ( config.scope || $rootScope ).$new();
						popoverScope.element = element;

						// Compila o popover agora e deixa pra setar o conteúdo apenas quando for abrir
						$popover = $compile( $popover )( popoverScope );
						controller = $popover.controller( "syoPopoverElement" );
					} else {
						if ( scope.event !== currentEvent.in ) {
							element.off( currentEvent.in );
							element.off( currentEvent.out );
						} else {
							mustBind = false;
						}
					}

					extend( popoverScope, config );
					model = String( config.model );
					popoverScope.event = String( popoverScope.event || "click" );

					currentEvent.in = popoverScope.event;
					currentEvent.out = getOutEvent( currentEvent.in );

					// Se devemos bindar os eventos de abrir/fechar o popover, fazemos isso agora
					if ( mustBind ) {
						if ( currentEvent.in !== currentEvent.out ) {
							element.on( currentEvent.in, open );
							element.on( currentEvent.out, close );
						} else {
							element.on( currentEvent.in, function( evt ) {
								controller.isOpen() ? close( evt ) : open( evt );
							});
						}
					}
				});

				// Eventos DOM
				// ---------------------------------------------------------------------------------
				element.parents().on( "scroll", close );
				$( $window ).on( "scroll", reposition );
				element.parents().add( $window ).on( "resize", reposition );

				// Scope Watches
				// ---------------------------------------------------------------------------------
				// Aguarda o elemento ficar visível/invísivel
				scope.$watch(function() {
					// Retorna true apenas pra não cair no if do listener
					return $popover ? element.is( ":visible" ) : true;
				}, function( visible ) {
					if ( !visible ) {
						controller.close();
					}
				});

				// Aguarda o elemento ser reposicionado
				scope.$watch(function() {
					return element.offset();
				}, function( newOffset, oldOffset ) {
					if ( !ng.equals( newOffset, oldOffset ) ) {
						reposition();
					}
				}, true );

				scope.$on( "$destroy", function() {
					controller.destroy();
				});

				// Funções utilitárias
				// ---------------------------------------------------------------------------------
				// Abre o popover. Se o conteúdo do mesmo ainda não foi atribuido, faz isso agora
				function open( evt ) {
					evt.stopPropagation();

					if ( !loadedContent ) {
						loadedContent = true;
						$templatePromise( popoverScope.template, popoverScope.templateUrl ).then(function( template ) {
							var $content =  $( "<syo-popover-content></syo-popover-content>" );
							$content = $compile( $content.html( template ) )( popoverScope );
							$content.appendTo( $popover );

							// Reposiciona e aguarda até o próximo digest pra reposicionar o elemento (de novo).
							reposition();
							$timeout(function() {
								reposition();
							});
						});
					}

					// Devemos bindar o controller a alguma propriedade do escopo pai?
					if ( model ) {
						// Se o escopo pai já tem um controller de syoPopover que não é o do popover atual,
						// então devemos forçar o close de tal popover e setar o nosso.
						if (
								popoverScope.$parent[ model ] instanceof controller.constructor &&
								popoverScope.$parent[ model ] !== controller
						) {
							popoverScope.$parent[ model ].close();
						}

						popoverScope.$parent[ model ] = controller;
					}

					controller.open();
				}

				function reposition() {
					controller.position();
				}

				// Fecha o popover.
				function close( evt ) {
					evt.stopPropagation();
					controller.close();
				}
			};

			// Retorna a qual evento o elemento de origem deverá responder pra fechar o popover.
			function getOutEvent( eventIn ) {
				if ( eventIn === "mouseenter" ) {
					return "mouseleave";
				}

				return eventIn;
			}

			return definition;
		}
	]);

	syo.directive( "syoPopoverElement", function() {
		var definition = {};

		definition.replace = true;
		definition.restrict = "E";
		definition.scope = {
			title: "=",
			position: "=",
			onClose: "=",
			element: "="
		};

		definition.template =
			"<div class='syo-popover syo-popover-{{ position }}'>" +
				"<div class='syo-popover-arrow'></div>" +
				"<div class='syo-popover-titlebar'>" +
					"<div class='syo-popover-title'>{{ title }}</div>" +
					"<div class='syo-popover-close' ng-click='$close()'><i class='icon-remove-circle'></i></div>" +
				"</div>" +
			"</div>";

		definition.controller = [
			"$scope",
			"$element",
			"$timeout",
			function( $scope, $element, $timeout ) {
				var open = false;

				this.isOpen = function() {
					return open;
				};

				this.open = function() {
					if ( open ) {
						return;
					}

					open = true;
					$element.show();
					this.position();
				};

				this.close = $scope.$close = function() {
					if ( !open ) {
						return;
					}

					open = false;
					$element.hide();
				};

				this.position = function() {
					var position = {};

					// Se não há posição, utiliza top, que é o padrão
					var positionValue = ( $scope.position || "top" ).split( "-" );

					if ( !open ) {
						return;
					}

					switch ( positionValue[ 0 ] ) {
						case "top":
							position.at = "center top-20";
							position.my = "center bottom";
							break;

						case "right":
							position.at = "right+20 center";
							position.my = "left center";
							break;

						case "bottom":
							position.at = "center bottom+20";
							position.my = "center top";
							break;

						case "left":
							position.at = "left-20 center";
							position.my = "right center";
							break;
					}

					if ( positionValue[ 1 ] ) {
						var atStart = positionValue[ 1 ] === "start";

						if ( positionValue[ 0 ] === "top" || positionValue[ 0 ] === "bottom" ) {
							position.at = position.at.replace( "center", atStart ? "left" : "right" );
						} else {
							position.at = position.at.replace( "center", atStart ? "top" : "bottom" );
						}

						position.my = position.my.replace(
							"center",
							atStart ? "center+40%" : "center-40%"
						);
					}

					position.of = $scope.element;
					position.within = $scope.element;

					// @FIXME collision = flip não funciona no Firefox Android :'(
					position.collision = "none";

					// Para setar a posição, deve-se aguardar até que o digest do elemento termine
					$timeout(function() {
						var maxWidth, pos;

						$element.position( position );
						pos = $element.position();

						// Calcula se o posicionamento colocou o elemento pra fora da tela, mas
						// apenas quando estamos usando left/right. Caso sim, então o elemento será
						// alterado para ter um max-width que o permita ficar 100% na tela.
						if ( positionValue[ 0 ] === "left" ) {
							if ( pos.left < 0 ) {
								maxWidth = $element.outerWidth() + pos.left;
							}
						} else if ( positionValue[ 0 ] === "right" ) {
							if ( $element.outerWidth() + pos.left > $( window ).width() ) {
								maxWidth = $( window ).width() + pos.left;
							}
						}

						// Se tem um maxWidth calculado, seta este e reposiciona
						if ( maxWidth ) {
							$element.css( "max-width", maxWidth );
							$element.position( position );
						}
					});
				};

				this.destroy = function() {
					$scope.$destroy();
					$element.remove();
				};
			}
		];

		definition.link = function( scope, element, attr ) {
			attr.$set( "title", "" );
			$( "body" ).append( element );
		};

		return definition;
	});

	syo.directive( "syoPopoverContent", function() {
		return {
			restrict: "E",
			replace: true,
			transclude: true,
			template: "<div class='syo-popover-content' ng-transclude></div>"
		};
	});

}( jQuery, angular );
/**
 * syoProgressbar
 * --------------
 * Diretiva para criar e controlar a porcentagem de uma progressbar do Syonet Bootstrap.
 *
 * @docs-link
 */
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

			//return definition.link;
		};

		return definition;
	});

}( jQuery, angular );
/**
 * range
 * -----
 * Filtro que retorna um array do tamanho especificado, útil para utilizar com ng-repeat de forma
 * arbitrária.
 *
 * @docs-link
 */
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
/**
 * removeAccents
 * -------------
 * Filtro que remove acentuação da string de entrada.
 *
 * @docs-link
 */
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
/**
 * round
 * -----
 * Arredonda um numero para um determinado número de casas decimais.
 *
 * @docs-link
 */
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
/**
 * syoSlider
 * ---------
 * Diretiva que instancia um jQuery UI Slider.
 *
 * @docs-link
 */
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
/**
 * syoTabs
 * -------
 * Diretiva que instancia um jQuery UI Tabs.
 *
 * @docs-link
 */
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
					val = $scope.$eval( val );

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
/**
 * $templatePromise
 * ----------------
 * Provider para retornar uma promise para um template HTML ou para uma URL de um template.
 *
 * @docs-link
 */
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
/**
 * toArray
 * -------
 * Filtro que converte os dados de entrada em um array.
 *
 * @docs-link
 */
!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).filter( "toArray", function() {
		return function( input ) {
			return input != null ? Array.prototype.slice.call( input ) : [];
		};
	});

}( jQuery, angular );
/**
 * syoTouchTest
 * ------------
 * Diretiva que adiciona uma classe no elemento, caso o browser seja touch sensitive.
 *
 * @docs-link
 */
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
/**
 * $urlbuilder
 * -----------
 * Construtor de URLs, convertendo um objeto na query string.
 *
 * @docs-link
 */
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
			url += querystring.length ? "?" + querystring.join("&") : "";
			url += store.hash ? "#"+ store.hash : "";

			return url;
		};

		return URL;
	});

}( jQuery, angular );
/**
 * $worker
 * -------
 * Provider para instanciar Web Workers.
 *
 * @docs-link
 */
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