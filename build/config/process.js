module.exports = {
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
};