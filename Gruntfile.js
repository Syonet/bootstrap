/*jshint node:true*/
module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		// Geral
		// -----------------------------------------------------------------------------------------
		pkg: grunt.file.readJSON( "package.json" ),
		watch: {
			main: {
				files: [
					"styles/*.less",
					"scripts/**/*.js"
				],
				tasks: [
					"less:main",
					"jshint:main",
					"jshint:test",
					"concat",
					"process:main"
				]
			},
			docs: {
				files: [
					"docs/**/*.less",
					"docs/**/*.hbs",
					"docs/**/*.js"
				],
				tasks: [
					"clean:docs",
					"less:docs",
					"jshint:docs",
					"concat",
					"hogan"
				]
			},
			icons: {
				files: [ "fonts/*.json" ],
				tasks: [
					"icons",
					"process:fonts"
				]
			}
		},
		clean: {
			main: "dist/",
			docs: "*.html"
		},
		process: {
			main: {
				src: [
					"images/*",

					// Processa novamente os arquivos JS/CSS para a inclusão do banner
					"dist/*.css",
					"dist/*.js"
				],
				strip: /^dist/,
				dest: "dist"
			},
			fonts: {
				src: [
					// Copia apenas arquivos utilizadas em produção
					"fonts/*.{ttf,eot,woff,svg}"
				],
				dest: "dist"
			}
		},

		// CSS/LESS
		// -----------------------------------------------------------------------------------------
		less: {
			main: {
				files: {
					"dist/bootstrap.css": [
						"styles/vendor/normalize.css",
						"styles/bootstrap.less"
					],
					"dist/jquery.ui.css": [
						// Junta TODOS os arquivos do jQuery UI, na sua ordem certa.
						// @TODO usar apenas o core + glob *.css. Será que vai excluir o core deste glob pra ficar na
						// ordem certa?
						"styles/vendor/jquery-ui/*core.css",
						"styles/vendor/jquery-ui/*accordion.css",
						"styles/vendor/jquery-ui/*autocomplete.css",
						"styles/vendor/jquery-ui/*button.css",
						"styles/vendor/jquery-ui/*datepicker.css",
						"styles/vendor/jquery-ui/*dialog.css",
						"styles/vendor/jquery-ui/*menu.css",
						"styles/vendor/jquery-ui/*progressbar.css",
						"styles/vendor/jquery-ui/*resizable.css",
						"styles/vendor/jquery-ui/*selectable.css",
						"styles/vendor/jquery-ui/*slider.css",
						"styles/vendor/jquery-ui/*spinner.css",
						"styles/vendor/jquery-ui/*tabs.css",
						"styles/vendor/jquery-ui/*tooltip.css",
						"styles/jquery.ui.less"
					]
				}
			},
			docs: {
				files: {
					"docs/compiled/main.css": "docs/main.less"
				}
			}
		},
		icons: {
			main: {
				options: {
					aliases: "fonts/aliases.json"
				},
				files: {
					"styles/icons-map.less": [ "fonts/SyoBootstrap.json" ]
				}
			}
		},

		// JS
		// -----------------------------------------------------------------------------------------
		qunit: {
			files: [
				"scripts/tests/index.html"
			]
		},
		jshint: {
			// https://github.com/gruntjs/grunt-contrib-jshint/pull/24#issuecomment-15029207
			options: grunt.file.readJSON( ".jshintrc" ),
			test: {
				options: {
					globals: {
						expect: false
					}
				},
				files: {
					src: "scripts/tests/**/*.js"
				}
			},
			main: "scripts/*.js",
			docs: "docs/main.js"
		},
		concat: {
			main: {
				src: "scripts/*.js",
				dest: "dist/bootstrap.js"
			}
		},

		// Docs
		// -----------------------------------------------------------------------------------------
		hogan: {
			docs: {
				layout: "docs/templates/layout.hbs",
				src: [
					"docs/templates/pages/*.hbs"
				],
				dest: "."
			}
		},

		connect: {
			main: {
				options: {
					hostname: "*",
					keepalive: true,
					port: 8001
				}
			}
		}
	});

	// NPM
	grunt.loadNpmTasks( "grunt-contrib-less" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );

	// Local
	grunt.loadTasks( "build" );

	// Processo principal de build
	grunt.registerTask( "default", [
		"clean", // Limpa todo o diretório dist
		"icons", // Gera o mapeamento de icones
		"less", // Compila os arquivos LESS
		"jshint", // Faz o linting em todos os arquivos JS relevantes
		"concat", // Concatena os arquivos javascript em um só
		"process", // Copia e inclui o banner nos arquivos de distribuição
		"hogan", // Compila a documentação do projeto
		"qunit" // Roda os testes JS
	]);
};
