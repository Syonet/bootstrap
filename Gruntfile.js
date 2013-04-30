/*jshint node:true*/
module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			main: {
				files: [
					"styles/*.less",
					"scripts/**/*.js"
				],
				tasks: [
					"clean:main",
					"less:main",
					"jshint:main",
					"process"
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
					"hogan"
				]
			}
		},
		clean: {
			main: "dist/",
			docs: "*.html"
		},
		less: {
			main: {
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
				files: {
					"docs/main.css": "docs/main.less",
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
		process: {
			all: {
				src: [
					"images/*",
					
					// Copia apenas as fontes utilizadas em produção
					"fonts/SyoBootstrap.eot",
					"fonts/SyoBootstrap.svg",
					"fonts/SyoBootstrap.ttf",
					"fonts/SyoBootstrap.woff",
					
					// Processa novamente os arquivos JS/CSS para a inclusão do banner
					"dist/*.css",
					"dist/*.js"
					
				],
				strip: /^dist/,
				dest: "dist"
			}
		},
		qunit: {
			files: [
				"scripts/tests/index.html"
			]
		},
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			main: "scripts/**/*.js",
			docs: "docs/main.js"
		},
		concat: {
			main: {
				src: "scripts/*.js",
				dest: "dist/bootstrap.js"
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

	// Carrega as tasks que dependemos...
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-concat");

	// ...inclusive as criadas por nós!
	grunt.loadTasks("build");
	
	// Processo principal de build
	grunt.registerTask( "default", [
		"clean", // Limpa todo o diretório dist
		"less", // Compila os arquivos LESS
		"jshint", // Faz o linting em todos os arquivos JS relevantes
		"concat", // Concatena os arquivos javascript em um só
		"process", // Copia e inclui o banner nos arquivos de distribuição
		"hogan", // Compila a documentação do projeto
		"qunit" // Roda os testes JS
	]);
};