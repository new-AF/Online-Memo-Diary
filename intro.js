function setRequired(x , value) {
	x.forEach(i => i.required = value)
}

function store(name, value) {
	sessionStorage.setItem(name, value );
}	


$(
	
	function documentready() {
		
		d = document
		
		setTimeout( () => {
			$('#intro-modal').fadeIn('slow').modal('show')
			$('#inputname').focus();
		},100 )
		
		inputs = d.querySelectorAll('.either input')
		
		inputs.forEach( i => i.addEventListener('focus' , e => { setRequired(inputs,false); /*console.log(e.type,e.target,e.target.required);*/ e.target.required=true; } ) ); 
		
		$('#Continue').click( e => {
			
			e.stopPropagation();
			e.preventDefault();
			if (Storage)
			{
				store('name',$(inputs[0]).val)
			}
			$('#intro-modal').modal('hide')
			window.location.replace("index.html");
			}
		)
	}
	

)