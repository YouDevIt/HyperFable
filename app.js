function isString(s) {
  return typeof(s)==='string'||s instanceof String
}
var langdef='en'
var langtag='en'
function x(sentence){
  if(sentence instanceof String)
    return sentence
  var ret=sentence[langtag]
  return ret?ret:sentence[langdef]
}
system={
  Nospecial:{en:"You see nothing special.",it:"Non noti nulla di speciale."},
  Inventory:{en:"Inventory",it:"Inventario"},
  Yousee:{ en:"Here you can see ",it:"Qui puoi vedere "},
  Youcarry:{ en:"You carry ",it:"Porti "},
  Youwear:{ en:"You wear ",it:"Indossi "},
  Youcarrynothing:{en:"You carry nothing.",it:"Non porti nulla."},
  nothing :{en:"nothing",it:"nulla"},
  and:{en:" and ",it:" e "},
}
g={
  artdet:{
    en:function(obj){return 'the '},
    it:function(obj){return obj.itfemale?'la':'il '},
  },
  artind:{
    en:function(obj){return 'a '},
    it:function(obj){return obj.itfemale?'una ':'un '},
  },
}

function changelang(code){
  switch(String(code)){
    default:
    case 'en':
      choutline('$en',"solid 2px red;")
      choutline('$it',"none;")
      getel("$save").innerHTML="SAVE"
      getel("$restore").innerHTML="RESTORE"
      langtag='en'
      break
    case 'it':
      choutline('$it',"solid 2px red;")
      choutline('$en',"none;")
      getel("$save").innerHTML="SALVA"
      getel("$restore").innerHTML="RIPRISTINA"
      langtag='it'
      break
  }
  refresh()
}

function choutline(el,newstr){
  var str=getel(el).style.cssText
  var idx= str.indexOf("outline:")
  getel(el).style.cssText=str.substring(0,idx+9)+newstr
}

function world(){
  this.objects={void:{id:'void',name:'void',loc:'void'}}
  this.playerid='void'
  this.add=function(obj){this.objects[obj.id]=obj}
}
var world=new world()
function object(id,type){
  this.id=id
  this.type=type?type:'object'
  this.name=id
  this.desc=system.Nospecial
  this.loc='void'
  this.addprop=function(prop,newlang,newprop){
    if(isString(this[prop])){
      var temp=this[prop]
      this[prop]={}
      this[prop][langdef]=temp
    }
    this[prop][newlang]=newprop
  }
  this.addname=function(newlang,newname){
    this.addprop('name',newlang,newname)
  }
  this.adddesc=function(newlang,newdesc){
    this.addprop('desc',newlang,newdesc)
  }
}
function group(id,type){
  object.call(this,id,type?type:'group')
  this.objects=[]
}
function actor(id){
  group.call(this,id,'actor')
  this.wears=[]
}
function room(id){
  group.call(this,id,'room')
}
function exit(id){
  object.call(this,id,'exit')
  this.roomto='@void'
}
function thing(id){
  object.call(this,id,'thing')
}
function container(id){
  group.call(this,id,'container')
  this.transparent=true
  this.locked=false
  this.open=true
  this.keys=[]
}
function supporter(id){
  group.call(this,id,'supporter')
  this.enterable=true
}
function addobject(obj){world.add(obj)}
function setplayerid(playerid){world.playerid=playerid}
function getobj(id){return world.objects[id]}
function getplayer(){return getobj(world.playerid)}
function getroom(){return getobj(getplayer().loc)}

function getel(elname){
  return document.getElementById(elname);
}

function inner(elname,text){
  getel(elname).innerHTML=text
}

function cap(txt){return txt.charAt(0).toUpperCase()+txt.slice(1)}
function print(txt){document.write(txt)}

function exp(obj) {print(innerobject(obj.id,obj.type,obj.name))}

function innerobject(id,type,name) {
  return '<span class="'+type+'" id="'+id+'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+name+'</span>';
}

function mark(text){
  text=text.replaceAll(/{(\w+)}/g,function(match,p1){
    var obj=world.objects[p1]
    var name=x(obj.name)
    return innerobject(obj.id,obj.type,name);
  })
  return text
}

function yousee (room){
  return x(system.Yousee)+listobjs(room.objects)+"."
}
function youcarry (){
  return x(system.Youcarry)+listobjs(getplayer().objects)+"."
}
function youwear (){
  return x(system.Youwear)+listobjs(getplayer().wears)+"."
}

function listobjs(array){
  if(array. length== 0)
    return x(system.nothing)
  var item=array [0]
  var obj=getobj (item)
  ret=x(g.artind)(obj)+innerobject(obj.id,obj.type,x(obj.name));
  for(var ct =1;ct<array.length-1;ct++){
    item=array [ct]
    obj=getobj (item)
    ret+=", "+x(g.artind)(obj)+innerobject(obj.id,obj.type,x(obj.name))
  }
  item=array[array.length -1]
  obj=getobj(item)
  ret+=x(system.and)+x(g.artind)(obj)+innerobject(obj.id,obj.type,x(obj.name))
  return ret
}

function changeEditable() {
  document.body.contentEditable = document.body.contentEditable=='true'? 'false': 'true';
  if(document.body.contentEditable == 'false') {
    var markup = document.documentElement.innerHTML;
    markup = markup.replaceAll(/{t (\w+)}/g,function(match,p1){return innerobject(p1,"thing",p1);});
    markup = markup.replaceAll(/{s (\w+)}/g,function(match,p1){return innerobject(p1,"supporter",p1);});
    markup = markup.replaceAll(/{c (\w+)}/g,function(match,p1){return innerobject(p1,"container",p1);});
    document.documentElement.innerHTML = markup;
  }
}

function download(exportText){
  var dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(exportText);
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "app.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function allowDrop(ev) {ev.preventDefault()}
function drag(ev) {ev.dataTransfer.setData("text",ev.target.id)}
function drop(ev) {
  ev.preventDefault()
  var source = ev.dataTransfer.getData("text")
  var drain = ev.target.id
  dragndrop(source,drain)
}
function dragndrop(source, drain){
  inner('$message',source+" "+drain)
}

function refresh(){
  var room=getroom()
  var str
  str='<h2 id="@'+room.id+'" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+cap(x(room.name))+'</h2>'
    +mark(x(room.desc))
  if(room.objects.length>0){
    str+="<p>"+yousee(room)
  }
  inner('$room',str)
  str='<h2 id="@inventory" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+x(system.Inventory)+"</h2>"
  if(getplayer().objects.length>0){
    str+="<p>"+youcarry()
    if(getplayer().wears.length>0){
      str+="<p>"+youwear()
    }
  }else{
    str= x(system.Youcarrynothing)
  }
  inner('$inventory',str)
}

window.onload=function(){refresh()}