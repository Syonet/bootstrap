module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			files: [ "**/*.less" ],
			tasks: [ "default" ]
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
					"dist/framework.css": "styles/framework.less",
					"dist/jquery.ui.css": [
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
		copy: {
			dist: {
				src: [
					"*.json",
					"images/*",
					"dist/*.css"
				],
				strip: /^dist/,
				dest: "dist"
			}
		},
		linestrip: {
			dist: {
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

	grunt.registerTask( "default", [ "clean:pre", "less", "copy", "linestrip", "clean:post" ] );
};