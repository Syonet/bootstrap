module.exports = {
	options: {
		data: {
			package: "<%= package %>"
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