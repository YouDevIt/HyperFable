
text_en={
  nospecial: "You see nothing special."
}
text_it={
  nospecial: "Non noti nulla di speciale."
}
var text=text_en

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
  this.desc=text.nospecial
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

var $=new world('cucina')
var cucina=new room('cucina')
cucina.desc="Un'ampia cucina."
$.add(cucina)
$.add(new thing('penna'))
$.add(new supporter('tavolo'))
$.add(new container('scatola'))

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
  document.getElementById('message').innerHTML=data+' '+text.nospecial
}

function cap(txt){
  return txt.charAt(0).toUpperCase()+txt.slice(1)
}
function print(txt){
  document.write(txt)
}

function exp(obj) {
  print(inner(obj.type,obj.name))
}

function inner(type,name) {
  return '<span class="'+type+'" id="div1" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+name+'</span>';
}

function changeEditable() {
  document.body.contentEditable = document.body.contentEditable=='true'? 'false': 'true';
  if(document.body.contentEditable == 'false') {
    var markup = document.documentElement.innerHTML;
    markup = markup.replaceAll(/{t (\w+)}/g,function(match,p1){return inner("thing",p1);});
    markup = markup.replaceAll(/{s (\w+)}/g,function(match,p1){return inner("supporter",p1);});
    markup = markup.replaceAll(/{c (\w+)}/g,function(match,p1){return inner("container",p1);});
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