var langtag='en'
function x(sentence){return sentence[langtag]}
system={
  Nospecial:{en:"You see nothing special.",it:"Non noti nulla di speciale."},
  Inventory:{en:"Inventory",it:"Inventario"},
  Carrynothing:{en:"You carry nothing.",it:"Non porti nulla."},
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
      choutline('en',"solid 2px red;")
      choutline('it',"none;")
      getel("save").innerHTML="SAVE"
      getel("restore").innerHTML="RESTORE"
      langtag='en'
      break
    case 'it':
      choutline('it',"solid 2px red;")
      choutline('en',"none;")
      getel("save").innerHTML="SALVA"
      getel("restore").innerHTML="RIPRISTINA"
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

function world(player){
  this.objects={}
  this. player= player
  this.add=function(obj){
    this.objects[obj.id]=obj
  }
}
function object(id,type){
  this.id=id
  this.type=type?type:'object'
  this.name=id
  this.desc=system.Nospecial
  this.loc=''
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
  this.roomto=''
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

function getobj( id){
  return world. objects[id]
}
function getplayer (){
  return getobj (world .player)
}
function getroom (){
  return getobj(getplayer().loc)
}

function getel(elname){
  return document.getElementById(elname);
}
function inner(elname,text){
  getel(elname).innerHTML=text
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text",ev.target.innerHTML);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.innerHTML += data;
  document.getElementById('message').innerHTML=x(system.Nospecial)
}

function cap(txt){
  return txt.charAt(0).toUpperCase()+txt.slice(1)
}
function print(txt){
  document.write(txt)
}

function exp(obj) {
  print(innerobject(obj.type,obj.name))
}

function innerobject(type,name) {
  return '<span class="'+type+'" id="div1" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+name+'</span>';
}

function mark(text){
  text=text.replaceAll(/{(\w+)}/g,function(match,p1){
    var obj=world.objects[p1]
    var name=x(story[obj.name])
    return x(g.artind)(obj)+innerobject(obj.type,name);
  })
  return text
}

function changeEditable() {
  document.body.contentEditable = document.body.contentEditable=='true'? 'false': 'true';
  if(document.body.contentEditable == 'false') {
    var markup = document.documentElement.innerHTML;
    markup = markup.replaceAll(/{t (\w+)}/g,function(match,p1){return innerobject("thing",p1);});
    markup = markup.replaceAll(/{s (\w+)}/g,function(match,p1){return innerobject("supporter",p1);});
    markup = markup.replaceAll(/{c (\w+)}/g,function(match,p1){return innerobject("container",p1);});
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

window.onload=function(){
 refresh()
}

function refresh(){
 inner('room',
    "<h2>"+cap(x(story[getroom().name]))+"</h2>"
    +mark(x(story[getroom().desc]))
  )
  inner('inventory',
    "<h2>"+x(system.Inventory)+"</h2>"
    +x(system.Carrynothing)
  )
}
