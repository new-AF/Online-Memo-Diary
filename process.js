
const d = document

/*A compliment to jQ's .prop*/

function PropCpy(x,y) {
  console.log('--->>',x,y)

  x.prop('xxAttr').forEach( i => {
    console.log( '*******',i )
    y.prop(i, x.prop(i) )
  } )
  console.log( '*******',x.prop('xxAttr') )
}

function put(x) {
  y = x instanceof Array ? x : [x]
  y.forEach( (i) => console.log (i))
}

function put0 (...args) {

    console.log('>',...args,'<')
}

function undef(x,y) {
  //console.log(`[${y}]`)
  return x !== undefined ? x : (y === undefined ? "[**LAST RESORT X**]" : y)
}

function NoProp(x,name,value) {

  value = undef(value , 'NoProp')

  if (!x.prop) {
    try {
      x = $(x)
    }
    catch (error) {
      console.log('[function put]',error);
      return;
    }
  }

    if (!x.prop(name)) {
      if (value.prop) {
        x.prop(name,value.prop(name))
      }
      else {
        x.prop(name,value)
      }

    }

}
function SetCount(x,y) {

  //console.log(`[SETCOUNT] x=[${x}] y=[${y}]`)
  name = 'xxCount'

  NoProp(x,name,undef(y,0))

  //console.log(prop(x))
  /*console.log(x)
  console.log( x.prop('Count') )
  console.log( x.text() )*/
  //console.log( x, x.text(),x.prop('xxCount') )
  x.prop(name, x.prop(name)+1 )
  x.text(x.text().split(' ')[0] + " " + x.prop(name) )
}

function Add(e) {

  x = $(e.target)
  p = $('.pages')//x.parent()
  last = p.children().last()
//console.log(last)
  n = last.clone(true)


  SetCount(n,last)

  n.appendTo(p)
  
  newx = e.currentTarget;
  ed = $('.Editor')
  edd = d.querySelector('.Editor')
  j = n;
  
  j = SetAttr1(j[0])
  SetAttr2(j)
  $(j).click(Switch)
  $(j).click()
  //Switch(null,j);
	
	
}

function SetAttr1(x, f = false) {
	j = x
	ed = d.querySelector('.Editor')
	//put0('befor-->',j,j.xxContent)
	$(j).prop('xxContent', f? {content : ed.innerText , markup : ed.innerHTML } : { content: '', markup : ''} )
	if (f)
	{
		$(j).click(Switch)
	}
	//put0('after-->',j,j.xxContent)
	return j
}

function SetAttr2(x, f= false) {
	$(document.querySelector('.Editor')).prop('xxActive', f ? d.querySelector('.Page-Button') : x )
}

function Switch(e,manually = false) {
	
	x = manually ? manually : e.currentTarget
	ed = d.querySelector('.Editor')
	//put0('before Switched',x,ed.xxActive)
	//put0('editor->active',ed.xxActive)
	
	ed.xxActive = x
	ed.innerHTML = ed.xxActive.xxContent.markup
	//put0('after Switched',x,ed.xxActive)
}

function Del(e) {

  x = $(e.target)
  $('#del-modal').modal('show');
}

function change_name(name) {
	x = $('body > header > h1')
	
	orig = x.text().split(' ')
	
	part2 = orig.slice(1);
	if (name != null) {
		x.text(  `${name}'s ${part2}`   )
		
	}
}

function parsejson(x) {
	valid = x.slice(x.indexOf('{'), x.indexOf('}')+1);
	valid = JSON.parse(valid);
	
	return valid;
}

function fill_response(x) {
	//valid = parsejson(x);
	//put0('Got Response from DB',x)
}

function logout(e) {
	window.location.replace("intro.html");
}

function tChange(e) {
	editor = e.currentTarget 
	
	button = editor.xxActive
	
	button.xxContent.content = editor.innerText
	button.xxContent.markup = editor.innerHTML
	
	//put0('after tchange',button.xxContent)
	allmarkup = Object()
	$('.pages').children().each((i,j) => allmarkup[j.innerText]= j.xxContent )
	//put0('allmarkup->',allmarkup)
	//put0('allmarkupJSON->',JSON.stringify(allmarkup))
	
	
	$.ajax({
			url:'./session.php',
			type:"POST",
			data:{
				Var1: JSON.stringify(allmarkup) ,
				Var2: '' ,
				Action: 'Store'
			},
			success: function(response){
				
				console.log('*',response,'*')},
			error : function(a,b,c) {
				put0('ajax error',a,b,c)
			}
	}			
			)
} // function end
$(
  () => {
	
	$('.Alert').toggle()
  SetCount ( $('.Page-Button') )
  SetAttr1(d.querySelector('.Page-Button'),true)
  SetAttr2(null,true)
  $('.pages-controls .Add').click(Add)
  $('.pages-controls .Del').click(Del)
  current = 4;
  $('.control-bigger').prop('size' , 1)
  $('.control-smaller').prop('size' , -1)
  $('.control-bigger , .control-smaller').click(
	function(e) {
		x = $(e.target)
		current += x.prop('size')
		document.execCommand('fontSize',false,current)
	}
	)
	$('.control-cross-off').click(
		function(e) {
			x = $(e.target)
			document.execCommand('strikethrough',false,0)
		}
	)
	$('.control-mark').prop('mark',false)
	$('.control-mark').click(
		function(e) {
			x = $(e.target)
			m = !x.prop('mark')
			x.prop('mark' , m)
			document.execCommand('backColor',false,m ? 'yellow' : 'transparent')
		}
	)
	$('.control-bold').prop('bold',false)
	$('.control-bold').click(
		function(e) {
			x = $(e.target)
			m = !x.prop('bold')
			x.prop('bold' , m)
			document.execCommand('bold',false,0)
		}
	)
	try {
		if (Storage)
			{
				/*$('.Title').text(sessionStorage.getItem('name')+" 's " +$('.Title').text().split(' ')[1] )*/
			}
		else
			{
			}
	}
	catch (error) {
		/*$('.Alert').text('(FAILED to retrieve User\'s Name) '+error)
		$('.Alert').toggle()*/
	}

	
	d.querySelector('.Editor').addEventListener('input',tChange)
	$.ajax({
		url:'./session.php',
		type:"POST",
		data:{
			Username: '' ,
			Password: '' ,
			Action: 'ISsession'
	}, success : r => {put0(r);valid = parsejson(r); change_name(valid.newname)}, error : (a,b,c) => put0(a,b,c) })
	
	$.ajax({
			url:'./session.php',
			type:"POST",
			data:{
				Var1: '' ,
				Var2: '' ,
				Action: 'Get'
		},success: response => {put0('*',response,'*');fill_response(response)},error : 1})
}
)
