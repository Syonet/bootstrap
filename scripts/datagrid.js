(function( $ ) {
	"use strict";
	
	var classPrefix = "syo-datagrid";
	var eventsSufix = "syoDataGrid";
	var optionsPrefix = "syoDataGridOptions";
	var dataClicked = "syoDataGridClicked";
	
	function option( $element, key ) {
		return $element.data( optionsPrefix )[ key ];
	}
	
	function getStateClass( state ) {
		var ret = state;
		var arr = state.split(" ");
		var i = 0;
		
		if ( arr.length ) {
			for ( ; i<arr.length; i++ ) {
				arr[ i ] = classPrefix + "-state-" + arr[ i ];
			}
		ret = arr.join(" ");
		}
		
		return ret;
	}
	
	function getComponents( $element ) {
		return [
			//Header
			$element.children( "div:eq(0)" ),
			
			//Body 
			$element.children( "div:eq(1)" ),
			
			//Container TRs
			$element.find( "div:eq(1) div" ),
			
			//Tbody TRs
			$element.find( "div:eq(1) tbody tr" )
		];
	}
	
	var methods = {
		destroy: function() {
			var $element = this;
			var components = getComponents( $element );
			var $header = components[0];
			var $body = components[1];
			var $trsContainer = components[2];
			var $trs = components[3];
			
			$element
				.removeClass( classPrefix )
				.removeData( optionsPrefix );
			
			$header
				.removeClass( classPrefix + "-header" );
			
			$body
				.removeClass( classPrefix + "-body" );
			
			$trsContainer
				.removeClass( classPrefix + "-rowcont" );
			
			$trs
				.removeData( dataClicked )
				.removeClass( getStateClass( "hover clicked default" ) )
				.unbind( "." + eventsSufix );
			
			$element
				.find( "[class]" )
				.each(function() {
					var $element = $( this );
					
					if ( $element.attr( "class" ) === "" ) {
						$element.removeAttr( "class" );
					}
				});
		},
		refresh: function() {
			var $element = this;
			var components = getComponents( $element );
			var $header = components[ 0 ];
			var $body = components[ 1 ];
			var $trsContainer = components[ 2 ];
			var $trs = components[ 3 ];
			
			$element
				.addClass( classPrefix );
			
			$header
				.addClass( classPrefix + "-header" );
			
			$body
				.addClass( classPrefix + "-body" );
			
			$trsContainer
				.addClass( classPrefix + "-rowcont" );
			
			$trs
				.addClass( classPrefix + "-state-default" )
				.unbind( "." + eventsSufix )
				.each(function( index, trElement ) {
					var $trElement = $( trElement );
					
					if ( !$trElement.data( "disabled" ) ) {
						$trElement
							
							//Bind TR click event
							.bind( "click." + eventsSufix, function( event ) {
								var fn = option( $element, "click" );
								var stateDefault = getStateClass( "default" );
								
								$trs
									.removeClass( getStateClass( "hover clicked" ) )
										.not( stateDefault )
											.addClass( stateDefault )
											.removeData( dataClicked );
								
								$trElement
									.removeClass( stateDefault )
									.addClass( getStateClass( "clicked" ) )
									.data( dataClicked, true );
								
								if ( $.isFunction(fn) ) {
									fn.call( this, event );
								}
							})
							
							//Bind TR mouseenter event
							.bind( "mouseenter." + eventsSufix, function() {
								if ( !$trElement.data( dataClicked ) ) {
									$trElement
										.removeClass( getStateClass( "clicked default hover" ) )
										.addClass( getStateClass( "hover" ) );
								}
							})
							
							//Bind TR mouseleave event
							.bind( "mouseleave." + eventsSufix, function() {
								var stateClicked = getStateClass( "clicked" );
								
								$trElement
									.removeClass( getStateClass( "default hover" ) );
								
								if ( $trElement.data( dataClicked ) ) {
									$trElement
										.addClass( stateClicked );
								}
								
								if ( !$trElement.hasClass( stateClicked ) ) {
									$trElement
										.addClass( getStateClass( "default" ) );
								}
							});
					}
				});
		}
	};
	
	$.fn.syoDataGrid = function( args ) {
		var $selector = this;
		
		if ( typeof args === "string" ) {
			if ( args in methods ) {
				methods[ args ].call( $selector );
			}
		return;
		}
		
		$selector.each(function( index, DOMElement ) {
			var $element = $( DOMElement );
			
			args = args || {};
			$element.data( optionsPrefix, args );
			
			if ( $.isFunction( args.create ) ) {
				args.create.call( DOMElement );
			}
			
			methods.refresh.call( $element );
		});
		
	return $selector;
	};
	
})( jQuery );