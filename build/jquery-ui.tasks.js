/*jshint node:true, forin:false*/
module.exports = function( grunt ) {
	"use strict";
	var path = require("path");
	
	grunt.registerMultiTask( "linestrip", "Remove linhas de um arquivo texto de acordo com um Regex", function() {
		var files = grunt.file.expand( this.data.src );
		var regex = Array.isArray( this.data.regex ) ? this.data.regex : [ this.data.regex ];
		
		function stripLines( source ) {
			var i = 0, j;
			
			source = source.split( "\n" );
			
			for ( ; i < source.length; i++ ) {
				for ( j = 0; j < regex.length; j++ ) {
					if ( regex[ j ] instanceof RegExp && regex[ j ].test( source[ i ] ) ) {
						source.splice( i, 1 );
						break;
					}
				}
			}
			
			return source.join( "\n" );
		}
		
		files.forEach(function( fileName ) {
			var copyOptions;
			
			if ( /\.(css|less)$/i.test( fileName ) ) {
				copyOptions = {
					process: stripLines
				};
			}
			
			grunt.file.copy( fileName, fileName, copyOptions );
		});
	});
	
	grunt.registerMultiTask( "hogan", "Compila templates pelo Hogan.js", function() {
		var hogan = require( "hogan.js" );
		var files = grunt.file.expand( this.data.src );
		var layout = grunt.file.read( this.data.layout );
		var dest = this.data.dest + "/";
		
		layout = hogan.compile( layout );
		
		files.forEach(function( file ) {
			var basename = path.basename( file.replace( path.extname( file ), ".html" ) );
			var destFile = dest + basename;
			
			grunt.file.copy( file, destFile, {
				process: compile,
				src: file,
				dest: destFile,
				destBasename: basename
			});
			
			// Exibe algum log de debug
			grunt.log.writeln( file + " -> " + destFile );
		});
		
		function compile( code ) {
			var context = {};
			context[ this.destBasename.replace( ".html", "" ) ] = "syo-active";
			context.pkg = grunt.file.readJSON( "package.json" );
			
			return layout.render( context, {
				body: code
			});
		}
	});
};