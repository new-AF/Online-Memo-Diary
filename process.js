
f = () =>
  {console.log(123);$(this).css("background-color", "#cccccc");}

f3 = ()=> $('button').show()
f2 = ()=> $('button').toggle('slow',f3)

$(
  function(){
  console.log("test")
  $('button').mouseover(f2)
}
)
