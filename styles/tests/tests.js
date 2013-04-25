$( ".test" ).prepend(function() {
	var title = this.title;
	this.title = "";
	return "<div class='title'>" + title + "</div>";
});