module.exports = function( grunt ) {
	"use strict";

	// Inicialização de variáveis
	var env = process.env.NODE_ENV || "development";
	var liveReload = env === "production" ? false : 35729;

	grunt.initConfig({
		// Geral
		// -----------------------------------------------------------------------------------------
		pkg: grunt.file.readJSON( "package.json" ),
		watch: {
			options: {
				spawn: false,
				livereload: liveReload
			},
			css: {
				files: [ "src/styles/**/*.{less,css}" ],
				tasks: [ "less:main", "process:main" ]
			},
			icons: {
				files: [ "src/fonts/*.json" ],
				tasks: [ "icons", "process:fonts" ]
			},
			docsHTML: {
				files: [ "src/docs/**/*.swig" ],
				tasks: [ "swig" ]
			},
			docsCSS: {
				files: [ "<%= watch.css.files %>", "assets/styles/*.less" ],
				tasks: [ "less:docs" ]
			},
			docsJS: {
				files: [ "assets/scripts/*.js" ]
			}
		},
		process: {
			main: {
				src: [
					"src/images/*",

					// Processa novamente os arquivos JS/CSS para a inclusão do banner
					"dist/*.css"
				],
				strip: /^dist|^src/,
				dest: "dist"
			},
			fonts: {
				src: [
					// Copia apenas arquivos utilizadas em produção
					"src/fonts/*.{ttf,eot,woff,svg}"
				],
				strip: /^src/,
				dest: "dist"
			}
		},

		// CSS/LESS
		// -----------------------------------------------------------------------------------------
		less: {
			main: {
				files: {
					"dist/bootstrap.css": [
						"src/styles/vendor/normalize.css",
						"src/styles/bootstrap.less"
					],
					"dist/jquery.ui.css": [
						// Junta TODOS os arquivos do jQuery UI, na sua ordem certa.
						// @TODO usar apenas o core + glob *.css. Será que vai excluir o core deste glob pra ficar na
						// ordem certa?
						"src/styles/vendor/jquery-ui/*core.css",
						"src/styles/vendor/jquery-ui/*accordion.css",
						"src/styles/vendor/jquery-ui/*autocomplete.css",
						"src/styles/vendor/jquery-ui/*button.css",
						"src/styles/vendor/jquery-ui/*datepicker.css",
						"src/styles/vendor/jquery-ui/*dialog.css",
						"src/styles/vendor/jquery-ui/*menu.css",
						"src/styles/vendor/jquery-ui/*progressbar.css",
						"src/styles/vendor/jquery-ui/*resizable.css",
						"src/styles/vendor/jquery-ui/*selectable.css",
						"src/styles/vendor/jquery-ui/*slider.css",
						"src/styles/vendor/jquery-ui/*spinner.css",
						"src/styles/vendor/jquery-ui/*tabs.css",
						"src/styles/vendor/jquery-ui/*tooltip.css",
						"src/styles/jquery.ui.less"
					]
				}
			},
			docs: {
				files: {
					"assets/styles/main.css": "assets/styles/main.less"
				}
			}
		},
		icons: {
			main: {
				options: {
					aliases: "src/fonts/aliases.json"
				},
				files: {
					"src/styles/icons-map.less": [ "src/fonts/SyoBootstrap.json" ]
				}
			}
		},

		// JS
		// -----------------------------------------------------------------------------------------
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			internal: [
				"Gruntfile.js",
				"build/*.js",
				"assets/scripts/*.js"
			]
		},

		// Docs
		// -----------------------------------------------------------------------------------------
		swig: {
			docs: {
				options: {
					data: {
						pkg: "<%= pkg %>"
					}
				},
				cwd: "src/docs/",
				src: [ "*.swig" ],
				dest: "./",
				ext: ".html",
				expand: true
			}
		},

		connect: {
			main: {
				options: {
					port: 8001,
					livereload: liveReload,
					keepalive: true
				}
			}
		}
	});

	// NPM
	grunt.loadNpmTasks( "grunt-contrib-less" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-swig2" );

	// Local
	grunt.loadTasks( "build" );

	// Processo principal de build
	grunt.registerTask( "default", [
		"icons", // Gera o mapeamento de icones
		"less", // Compila os arquivos LESS
		"jshint", // Faz o linting em todos os arquivos JS relevantes
		"process", // Copia e inclui o banner nos arquivos de distribuição
		"swig" // Compila a documentação do projeto
	]);
};
