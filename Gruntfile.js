module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			bootstrap: {
				files: [ "styles/*.less", "docs/main.less" ],
				tasks: [ "dist" ]
			},
			docs: {
				files: [ "docs/templates/**/*.hbs" ],
				tasks: [ "hogan" ]
			}
		},
		clean: {
			// Limpa antes da execução
			pre: [ "dist" ],

			// Remove arquivo do Fireworks
			post: [ "dist/images/ui-progressbar-anim.png" ]
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
			docs: {
				layout: "docs/templates/layout.hbs",
				src: [
					"docs/templates/pages/*.hbs"
				],
				dest: "."
			}
		},
		copy: {
			dist: {
				src: [
					"*.json",
					"images/*",
					"dist/*.css",
					"fonts/*"
				],
				strip: /^dist/,
				dest: "dist"
			}
		},
		linestrip: {
			// Remove a linha com o background especificado no regex. Evita que cause erros 404, pois a imagem não existirá em nosso repo.
			jqueryui: {
				src: [ "dist/jquery.ui.css" ],
				regex: [
					/images\/animated-overlay.gif/
				]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadTasks("build");

	grunt.registerTask( "dist", [ "clean:pre", "less", "copy", "linestrip", "clean:post" ] );
	grunt.registerTask( "default", [ "dist", "hogan" ] );
};