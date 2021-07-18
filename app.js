
system_enUS={
  Nospecial:"You see nothing special.",
  Inventory:"Inventory",
  Carrynothing:"You carry nothing."
}
system_it={
  Nospecial:"Non noti nulla di speciale",
  Inventory:"Inventario",
  Carrynothing:"Non porti nulla."
}
var system=system_enUS

story_enUS={
  kitchen:"kitchen",
  kitchendesc:"A large kitchen in which you see a {table}.",
  pen:'pen',
  table:'table',
  box:'box',
}
story_it={
  kitchen:'cucina',
  kitchendesc:"Un'ampia cucina in cui vedi un {table}.",
  pen:'penna',
  table:'tavolo',
  box:'scatola',
}
var story=story_enUS

function changelang(code){
  switch(String(code)){
    default:
    case 'us':
      choutline('us',"solid 2px red;")
      choutline('it',"none;")
      system=system_enUS
      story=story_enUS
      break
    case 'it':
      choutline('it',"solid 2px red;")
      choutline('us',"none;")
      system=system_it
      story=story_it
      break
  }
  refresh()
}
function choutline(el,newstr){
  var str=getel(el).style.cssText
  var idx= str.indexOf("outline:")
  getel(el).style.cssText=str.substring(0,idx+9)+newstr
}

function world(start){
  this.objects={}
  this.start=start
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
  ev.dataTransfer.setData("text", ev.target.innerHTML);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.innerHTML += data;
  document.getElementById('message').innerHTML=data+' '+system.Nospecial
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

function markText(text){
  text=text.replaceAll(/{(\w+)}/g,function(match,p1){
    return innerobject($.objects[p1].type,story[$.objects[p1].name]);
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
    "<h2>"+cap(story[$.objects[$.start].name])+"</h2>"
    +markText(story[$.objects[$.start].desc])
  )
  inner('inventory',
    "<h2>"+system.Inventory+"</h2>"
    +system.Carrynothing
  )
}

var $=new world('kitchen')
var r=new room('kitchen')
r.desc='kitchendesc'
$.add(r)
$.add(new thing('pen'))
$.add(new supporter('table'))
$.add(new container('box'))