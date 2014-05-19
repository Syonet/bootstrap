module.exports = function( grunt ) {
	"use strict";

	var env = process.env.NODE_ENV || "development";

	// Inicialização da configuração
	require( "load-grunt-config" )( grunt, {
		configPath: require( "path" ).resolve( "build/config" ),
		config: {
			pkg: grunt.file.readJSON( "package.json" ),
			env: env,
			liveReload: env === "production" ? false : 35729
		}
	});

	// Carrega tasks locais
	grunt.loadTasks( "build" );
};
