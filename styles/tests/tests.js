(function() {
	$(function() {
		$( ".test" ).prepend(function() {
			var title = this.title;
			this.title = "";
			return "<div class='title'>" + title + ":</div>";
		});
		
		// Instancia os plugins jQuery UI
		$("[data-widget]").each(function() {
			var data = $( this ).data();
			$( this )[ data.widget ]( data );
		});
	});
}());