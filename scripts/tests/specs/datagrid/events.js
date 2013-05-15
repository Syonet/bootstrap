(function() {
	"use strict";

	function multiplyTestContainerBy( times ) {
		var fixtureContent = "";
		var i = 0;
		var $fixture = $( "#qunit-fixture" );
		var HTML = $fixture.html();

		$fixture.empty();

		while ( ++i <= times ) {
			fixtureContent += HTML.replace( "id=\"grid-head-body\"", "id=\"grid-" + i + "\"" );
		}

		$fixture.append( fixtureContent );
	}

	module( "Eventos" );

	test( "beforeActivate", function() {
		expect( 4 );

		var $tr, eventArgs;
		var triggers = [];

		$( "#grid-head-body" ).syoDataGrid({
			beforeActivate: function( event, data ) {
				triggers.push({
					context: this,
					args: [ event, data ]
				});
			}
		});

		$tr = $( "#grid-head-body div:last tr:eq(0)" );

		$tr.trigger("click");
		strictEqual( triggers.length, 1, "Function should be triggered on tr click" );

		eventArgs = triggers[ 0 ].args;
		ok( eventArgs[ 0 ] instanceof $.Event, "Should pass the jQuery Event Object as the first argument" );
		ok(
			eventArgs[ 1 ].oldItem instanceof $,
			"Should pass the old active jQuery Element in the second argument"
		);
		ok(
			eventArgs[ 1 ].newItem instanceof $,
			"Should pass the old active jQuery Element in the second argument"
		);
	});

	test( "activate", function() {
		expect( 4 );

		var $tr, eventArgs;
		var triggers = [];

		$( "#grid-head-body" ).syoDataGrid({
			activate: function( event, data ) {
				triggers.push({
					context: this,
					args: [ event, data ]
				});
			}
		});

		$tr = $( "#grid-head-body div:last tr:eq(0)" );

		$tr.trigger("click");
		strictEqual( triggers.length, 1, "Function should be triggered on tr click" );

		eventArgs = triggers[ 0 ].args;
		ok( eventArgs[ 0 ] instanceof $.Event, "Should pass the jQuery Event Object as the first argument" );
		ok(
			eventArgs[ 1 ].oldItem instanceof $,
			"Should pass the old active jQuery Element in the second argument"
		);
		ok(
			eventArgs[ 1 ].newItem instanceof $,
			"Should pass the old active jQuery Element in the second argument"
		);
	});

	test( "create", function() {
		expect( 3 );

		var triggers = [];

		multiplyTestContainerBy( 2 );

		$( "#grid-1, #grid-2" ).syoDataGrid({
			create: function() {
				triggers.push( this );
			}
		});

		strictEqual( triggers.length, 2, "The create event has been triggered" );
		strictEqual(
			triggers[ 0 ],
			$( "#grid-1" )[ 0 ],
			"The context of the first element should be correct DOMElement"
		);
		strictEqual(
			triggers[ 1 ],
			$( "#grid-2" )[ 0 ],
			"The context of the second element should be correct DOMElement"
		);
	});
}());