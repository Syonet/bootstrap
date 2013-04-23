/*jshint node:true*/
module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			css: {
				files: [ "styles/*.less" ],
				tasks: [ "css" ]
			},
			js: {
				files: [ "scripts/*.js" ],
				tasks: [ "js" ]
			},
			jsTest: {
				files: [ "tests/specs/**/*.js", "tests/templates/unit/**/*.hbs" ],
				tasks: [ "js-test" ]
			},
			cssTest: {
				files: [ "tests/templates/visual/**/*.hbs" ],
				tasks: [ "css-test" ]
			},
			docs: {
				files: [ "docs/templates/**/*.hbs", "docs/main.less" ],
				tasks: [ "docs" ]
			}
		},
		clean: {
			// Limpa antes da execução - CSS
			css:    [ "dist/*.css", "dist/fonts/", "dist/images/" ],
			js:     [ "dist/scripts/", "tests/*.html" ],
			docs:   [ "*.html" ],
			dist:   [ "dist/*.json" ]
		},
		less: {
			main: {
				options: {
					strictImports: true
				},
				files: {
					"dist/bootstrap.css": "styles/bootstrap.less",
					"dist/jquery.ui.css": [
						// Junta TODOS os arquivos do jQuery UI, na sua ordem certa.
						// @TODO usar apenas o core + glob *.css. Será que vai excluir o core deste glob pra ficar na ordem certa?
						"styles/jquery.ui/*core.css",
						"styles/jquery.ui/*accordion.css",
						"styles/jquery.ui/*autocomplete.css",
						"styles/jquery.ui/*button.css",
						"styles/jquery.ui/*datepicker.css",
						"styles/jquery.ui/*dialog.css",
						"styles/jquery.ui/*menu.css",
						"styles/jquery.ui/*progressbar.css",
						"styles/jquery.ui/*resizable.css",
						"styles/jquery.ui/*selectable.css",
						"styles/jquery.ui/*slider.css",
						"styles/jquery.ui/*spinner.css",
						"styles/jquery.ui/*tabs.css",
						"styles/jquery.ui/*tooltip.css",
						"styles/jquery.ui.less"
					]
				}
			},
			docs: {
				options: {
					strictImports: true,
					yuicompressor: true
				},
				files: {
					"docs/main.css": "docs/main.less"
				}
			}
		},
		hogan: {
			// Documentação
			docs: {
				layout: "docs/templates/layout.hbs",
				src: [
					"docs/templates/pages/*.hbs"
				],
				dest: "."
			},

			// Testes de unidade QUnit
			unit: {
				layout: "tests/templates/unit/layout.hbs",
				src: [
					"tests/templates/unit/pages/*.hbs",
					"tests/templates/unit/index.hbs"
				],
				dest: "tests/unit"
			},

			// Testes visuais
			visual: {
				layout: "tests/templates/visual/layout.hbs",
				src: [
					"tests/templates/visual/pages/*.hbs",
					"tests/templates/visual/index.hbs"
				],
				dest: "tests/visual"
			}
		},
		copy: {
			dist: {
				src: [ "*.json" ],
				dest: "dist"
			},
			css: {
				src: [
					"images/*",
					"dist/*.css",
					"fonts/*"
				],
				strip: /^dist/,
				dest: "dist"
			},
			js: {
				src: [ "scripts/*.js" ],
				dest: "dist"
			}
		},
		linestrip: {
			// Remove a linha com o background especificado no regex. Evita que cause erros 404,
			// pois a imagem não existirá em nosso repo.
			jqueryui: {
				src: [ "dist/jquery.ui.css" ],
				regex: [
					/images\/animated-overlay.gif/
				]
			}
		},
		qunit: {
			files: [ "tests/unit/index.html" ]
		},
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			js: [ "scripts/*.js" ],
			tests: {
				options: {
					// Nos testes, libera a opção maxlen, pois a descrição das asserções fica inline.
					maxlen: 0
				},
				files: {
					src: [ "tests/specs/**/*.js" ]
				}
			},
			docs: [ "docs/main.js" ]
		}
	});

	// Carrega as tasks que dependemos...
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	// ...inclusive as criadas por nós!
	grunt.loadTasks("build");

	// Registra as tasks alias

	grunt.registerTask( "css-test", [ "hogan:visual" ] );
	grunt.registerTask( "css",      [ "clean:css", "css-test", "less:main", "copy:css", "linestrip" ] );
	grunt.registerTask( "js-test",  [ "hogan:unit", "jshint:tests", "qunit" ] );
	grunt.registerTask( "js",       [ "clean:js", "jshint:js", "js-test", "copy:js" ] );
	grunt.registerTask( "docs",     [ "clean:docs", "less:docs", "jshint:docs", "hogan:docs" ] );
	grunt.registerTask( "default",  [ "clean:dist", "css", "js", "docs", "copy:dist" ] );
};