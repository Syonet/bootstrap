/*jshint node:true*/
module.exports = function( grunt ) {
	"use strict";
	
	// Original "copy" by the jQuery UI Team
	// https://github.com/jquery/jquery-ui/blob/1.10.0/build/tasks/build.js#L87
	grunt.registerMultiTask(
		"process",
		"Copia/renomeia arquivos, aplica o banner neles e faz o replace de @VERSION com o pkg.version",
		function() {
			var banner = grunt.file.read( "build/banner.txt" )
			
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
};