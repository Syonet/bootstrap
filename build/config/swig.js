module.exports = {
	options: {
		data: {
			pkg: "<%= pkg %>"
		},
		tags: require( "../swig-tags" )
	},
	docs: {
		cwd: "src/docs/",
		src: "*.swig",
		dest: "./",
		ext: ".html",
		expand: true
	}
};