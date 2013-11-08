/*jshint node:true*/
module.exports = function( grunt ) {
	"use strict";

	var _ = grunt.util._;

	function pad( direction, str, length, char ) {
		direction = /^left|right$/.test( direction ) ? direction : "left";
		char = char ? char.charAt( 0 ) : " ";

		while ( str.length < length ) {
			if ( direction === "left" ) {
				str = char + str;
			} else {
				str += char;
			}
		}

		return str;
	}

	// Original "copy" by the jQuery UI Team
	// https://github.com/jquery/jquery-ui/blob/1.10.0/build/tasks/build.js#L87
	grunt.registerMultiTask(
		"process",
		"Copia/renomeia arquivos, aplica o banner neles e faz o replace de @VERSION com o pkg.version",
		function() {
			var banner = grunt.file.read( "build/banner.txt" );

			function replaceVersion( source ) {
				return source.replace( /@VERSION/g, grunt.config( "pkg.version" ) );
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
				strip = new RegExp( "^" + grunt.template.process( strip, grunt.config() )
							.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" ) );
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


	grunt.registerMultiTask(
		"icons",
		"Dinamicamente cria as classes de icones baseado em um manifesto do IcoMoon.io",
		function() {
			var aliases = {};
			var options = this.options({
				aliases: ""
			});

			if ( grunt.file.exists( options.aliases ) ) {
				aliases = grunt.file.readJSON( options.aliases );
			}

			this.files.forEach(function( file ) {
				var contents = "";

				file.src.map(function( filepath ) {
					return grunt.file.readJSON( filepath );
				}).forEach(function( cfg ) {
					var icons = [];

					_.pluck( cfg.iconSets, "selection" ).forEach(function( selection ) {
						selection.forEach(function( icon ) {
							if ( icon.order > 0 ) {
								icons.push( icon );
							}
						});
					});

					icons.forEach(function( icon ) {
						var code = Number( icon.code ).toString( 16 );
						code = pad( "left", code, 4, "0" );

						// Seta os aliases antes, é mais fácil
						if ( aliases[ icon.name ] && aliases[ icon.name ].length ) {
							_.forEach( aliases[ icon.name ], function( alias ) {
								contents += ".icon-" + alias + ",\n";
							});
						}

						contents += pad( "right", ".icon-" + icon.name, 40 );
						contents += "{ &:before { content: \"\\" + code + "\"; } }";
						contents += "\n";
					});
				});

				grunt.file.write( file.dest, contents.trim() );
				grunt.log.writeln( "File " + grunt.log.wordlist( [ file.dest ] ) + " created" );
			});
		}
	);
};