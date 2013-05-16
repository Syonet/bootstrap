(function() {
	"use strict";

	module( "Features" );
	test( "Atributo data-disabled na TR", function() {
		expect( 2 );

		var $tr = $( "#grid-head-body div:last tr:first" ).attr( "data-disabled", "true" );
		$("#grid-head-body").syoDataGrid();

		$tr.trigger("mouseenter");
		ok(
			!$tr.hasClass( "syo-datagrid-state-hover" ),
			"O evento mouseenter na TR desabilitada não deve ser executado"
		);

		$tr.trigger("click");
		ok(
			!$tr.hasClass( "syo-datagrid-state-hover" ),
			"O evento click na TR desabilitada não deve ser executado"
		);
	});
}());