
d = document

/*A compliment to jQ's .prop*/

function PropCpy(x,y) {
  console.log('--->>',x,y)
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
  SetCount ( $('.Page-Button') )
  $('.pages-controls .Add').click(Add)
  $('.pages-controls .Del').click(Del)
  $('.control-paste').click(
	function(e) {
		document.execCommand('fontSize',false,18)
	}
	)
}
)
