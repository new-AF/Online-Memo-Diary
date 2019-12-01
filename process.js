
d = document

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

}

function Del(e) {

  x = $(e.target)
  $('#del-modal').modal('show');
}
$(
  () => {
	$('.Alert').toggle()
  SetCount ( $('.Page-Button') )
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
				$('.Title').text(sessionStorage.getItem('name')+" 's " +$('.Title').text().split(' ')[1] )
			}
		else
			{
			}
	}
	catch (error) {
		/*$('.Alert').text('(FAILED to retrieve User\'s Name) '+error)
		$('.Alert').toggle()*/
	}
}
)
