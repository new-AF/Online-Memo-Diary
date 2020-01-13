function setRequired(e) {
	x = e.currentTarget;
	p = $(x.parentElement);
	
	value = x.value ;
	//console.log(e.key);
	x.setAttribute('type',  value.indexOf('@')!= -1 ? 'email' : 'text' )
}

function store(name, value) {
	sessionStorage.setItem(name, value );
}	

function parsejson(x) {
	valid = x.slice(x.indexOf('{'), x.indexOf('}')+1);
	valid = JSON.parse(valid);
	
	return valid;
}

function logreg(e){
	x = event.currentTarget
	ul =x.parentElement
	Array.from(ul.children).forEach( i=> i.classList.remove('active') )
	x.classList.add('active')
	
	ul.Xactive = x.innerText
}
$(
	
	function documentready() {
		
		d = document
		
		setTimeout( () => {
			$('#intro-modal').fadeIn('slow').modal('show')
			$('#inputname').focus();
		},100 )
		
		inputs = $('.either input');
		inputs.each((index, i) => { $(i).change(setRequired); } )
		document.querySelector('.pagination').Xactive = "Login";
		
		$('#Continue').click( e => {
			
			
			
			//e.preventDefault();
			//e.stopPropagation();
			
			$.ajax({
				url:'./session.php',
				type:"POST",
				data:{
					Var1: $('#inputname').val() ,
					Var2: $('#inputpassword').val() ,
					Action: document.querySelector('.pagination').Xactive
				},
				success: function(response){
					
					console.log('success','*',response,'*')
					parsed = parsejson(response)
					if ('exists' in parsed && parsed.exists) {
						x = $('.cExists')
						x.show();
						console.log('yess');
						x.fadeOut(5000);
					}
					
					else if ( ('registrationComplete' in parsed && parsed.registrationComplete) || ('loginComplete' in parsed && parsed.loginComplete ) ) {

						

						$('#intro-modal').modal('hide')
						window.location.replace("index.html")
					}
				},
				error: function(a,b,c) {console.log(a,b,c) } 
				}
				)
			
			
			/*if (Storage)
			{
				store('name',$(inputs[0]).val)
			}
			//$('#intro-modal').modal('hide')
			//window.location.replace("index.html");
			}*/
		})
		
		
		$('.cLogin').click(logreg);
		$('.cRegister').click(logreg);
		$('.cExists').hide();
	}
	

)