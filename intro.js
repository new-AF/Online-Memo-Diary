

$(

	function documentready () {
		
		setTimeout( () => {
			$('#intro-modal').fadeIn('slow').modal('show')
		},100 )
		
		$('.either input').focus( e => {
			target = $(e.target)
			target.parent().children().each( i => $(i).removeAttr('required') )
			target.attr('required'); 
		
		} )
		
		$('input').submit( e => e.preventDefault() )
	}
	

)