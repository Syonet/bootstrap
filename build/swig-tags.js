exports.highlight = (function() {
	var hljs = require( "highlight.js" );
	hljs.tabReplace = "    ";

	return {
		ext: hljs.highlight,
		ends: true,
		parse: parse,
		compile: compile
	};

	function parse( str, line, parser, types ) {
		parser.on( types.VAR, function( token ) {
			this.out.push( "\"" + token.match + "\"" );
			return true;
		});

		return true;
	}

	function compile( compiler, args, content, parents, options, blockName ) {
		var indentationRegex;
		var indentation = Number.MAX_VALUE;
		var output = "";

		content = content.map(function( part ) {
			if ( typeof part === "string" ) {
				return part;
			}

			return part.content.join( "" ) || "";
		});
		content = content.join( "" ).split( "\n" );
		content.forEach(function( line ) {
			var match;

			// Ignore empty lines
			if ( !line || /^\s+$/.test( line ) ) {
				return;
			}

			match = line.match( /^\s+/ );
			indentation = Math.min( match ? match[ 0 ].length : 0, indentation );
		});

		indentationRegex = new RegExp( "^\\s{" + indentation + "}" );
		content = content.map(function( line ) {
			return line.replace( indentationRegex, "" );
		}).join( "\n" ).trim();

		output += "(function() {\n";
		output += " var lang = " + args[ 0 ] + ";\n";
		output += " var __o = " + JSON.stringify( content ) + ";\n";
		output += " _output += '<pre ng-non-bindable class=\"highlight language-' + lang + '\">';\n";
		output += " _output += _ext.highlight(" + args[ 0 ] + ", __o).value;\n";
		output += " _output += '</pre>';\n";
		output += "})();\n";

		return output;
	}
})();