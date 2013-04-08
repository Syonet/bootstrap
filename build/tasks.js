module.exports = function( grunt ) {
	"use strict";
	var banner = grunt.file.read("build/banner.txt"),
		path = require("path");

	// Original by the jQuery UI Team http://jqueryui.com
	// https://github.com/jquery/jquery-ui/blob/1.10.0/build/tasks/build.js#L87
	grunt.registerMultiTask( "copy", "Copia/renomeia arquivos, aplica o banner neles e faz o replace de @VERSION com o pkg.version", function() {
		function replaceVersion( source ) {
			return source.replace( /@VERSION/g, grunt.config("pkg.version") );
		}
		function bannerify( source ) {
			// Se já tem banner, retira-o antes de mais nada
			if ( /^\/\*!/.test( source ) ) {
				source = source.replace( /^\/\*!([^>]*?)\*\//mg, "" );
			}

			return replaceVersion( grunt.template.process( banner, grunt.config() ) + source );
		}
		function copyFile( src, dest ) {
			var options = {};
			if ( /\.(js|css|less)$/.test( src ) ) {
				options.process = bannerify;
			} else if ( /json$/.test( src ) ) {
				options.process = replaceVersion;
			}

			grunt.file.copy( src, dest, options );
		}
		var files = grunt.file.expand( this.data.src ),
			target = this.data.dest + "/",
			strip = this.data.strip,
			renameCount = 0,
			fileName;

		if ( typeof strip === "string" ) {
			strip = new RegExp( "^" + grunt.template.process( strip, grunt.config() ).replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" ) );
		}

		files.forEach(function( fileName ) {
			var targetFile = strip ? fileName.replace( strip, "" ) : fileName;
			copyFile( fileName, target + targetFile );
		});
		grunt.log.writeln( "Copied " + files.length + " files." );

		for ( fileName in this.data.renames ) {
			renameCount += 1;
			copyFile( fileName, target + grunt.template.process( this.data.renames[ fileName ], grunt.config() ) );
		}
		if ( renameCount ) {
			grunt.log.writeln( "Renamed " + renameCount + " files." );
		}
	});

	grunt.registerMultiTask( "linestrip", "Remove linhas de um arquivo texto de acordo com um Regex", function() {
		var files = grunt.file.expand( this.data.src ),
			regex = Array.isArray( this.data.regex ) ? this.data.regex : [ this.data.regex ];

		function stripLines( source ) {
			var i = 0, j;
			source = source.split("\n");

			for ( ; i < source.length; i++ ) {
				for ( j = 0; j < regex.length; j++ ) {
					if ( regex[ j ] instanceof RegExp && regex[ j ].test( source[ i ] ) ) {
						source.splice( i, 1 );
						break;
					}
				}
			}

			return source.join("\n");
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
		var hogan = require("hogan.js"),
			files = grunt.file.expand( this.data.src ),
			layout = grunt.file.read( this.data.layout ),
			dest = this.data.dest + "/";

		layout = hogan.compile( layout );

		files.forEach(function( file ) {
			var basename = path.basename( file.replace( path.extname( file ), ".html" ) ),
				destFile = dest + basename;

			grunt.file.copy( file, destFile, {
				process:        compile,
				src:            file,
				dest:           destFile,
				destBasename:   basename
			});

			// Exibe algum log de debug
			grunt.log.writeln( file + " -> " + destFile );
		});

		function compile( code ) {
			var context = {};
			context[ this.destBasename.replace( ".html", "" ) ] = "syo-active";

			return layout.render( context, {
				body: code
			});
		}
	});
};