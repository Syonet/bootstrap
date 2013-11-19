(function() {
	"use strict";

	module( "Eventos", {
		setup: function() {
			this.table = $( "#grid-head-body" ).syoDataGrid();
			this.widget = this.table.syoDataGrid( "widget" );
		},
		teardown: function() {
			this.table.syoDataGrid( "destroy" );
		}
	});

	test( "beforeActivate", function() {
		expect( 4 );

		var $tr, eventArgs;
		var triggers = [];

		this.table.syoDataGrid( "option", "beforeActivate", function( event, data ) {
			triggers.push({
				context: this,
				args: [ event, data ]
			});
		});

		$tr = this.widget.find( ".syo-datagrid-body tr:eq(0)" );

		$tr.trigger( "click" );
		strictEqual( triggers.length, 1, "Callback deve ser executado ao clicar na linha" );

		triggers = [];
		$tr.trigger( "click" );

		eventArgs = triggers[ 0 ].args;
		ok( eventArgs[ 0 ] instanceof $.Event, "Deve passar o objeto jQuery Event como primeiro argumento" );
		ok(
			eventArgs[ 1 ].oldItem.nodeType,
			"Deve passar o elemento DOM ativo anteriormente no segundo argumento"
		);
		ok(
			eventArgs[ 1 ].newItem.nodeType,
			"Deve passar o novo elemento DOM ativo no segundo argumento"
		);
	});

	test( "activate", function() {
		expect( 4 );

		var $tr, eventArgs;
		var triggers = [];

		this.table.syoDataGrid( "option", "activate", function( event, data ) {
			triggers.push({
				context: this,
				args: [ event, data ]
			});
		});

		$tr = this.widget.find( ".syo-datagrid-body tr:eq(0)" );

		$tr.trigger( "click" );
		strictEqual( triggers.length, 1, "Callback deve ser executado ao clicar na linha" );

		triggers = [];
		$tr.trigger( "click" );

		eventArgs = triggers[ 0 ].args;
		ok( eventArgs[ 0 ] instanceof $.Event, "Deve passar o objeto jQuery Event como primeiro argumento" );
		ok(
			eventArgs[ 1 ].oldItem.nodeType,
			"Deve passar o elemento DOM ativo anteriormente no segundo argumento"
		);
		ok(
			eventArgs[ 1 ].newItem.nodeType,
			"Deve passar o novo elemento DOM ativo no segundo argumento"
		);
	});

}());