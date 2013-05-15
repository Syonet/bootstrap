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
	test( "click", function() {
		expect( 2 );

		var $tr;
		var triggers = [];

		$( "#grid-head-body" ).syoDataGrid({
			activate: function( event ) {
				triggers.push({
					context: this,
					args: [ event ]
				});
			}
		});

		$tr = $( "#grid-head-body div:last tr:eq(0)" );

		$tr.trigger("click");
		strictEqual( triggers.length, 1, "Function should be triggered on tr click" );
		ok( triggers[ 0 ].args[ 0 ] instanceof $.Event, "Should pass the jQuery Event Object as the first argument" );
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