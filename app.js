
text=[
  "You see nothing special."
  ]

function object(id,type){
  this.id=id
  this.type=type?type:'object'
  this.name=id
  this.desc=text[0]
}
function thing(id){
  object.call(this,id,'thing')
}
function container(id){
  object.call(this,id,'container')
  this.transparent=true
  this.open=true
}
function supporter(id){
  object.call(this,id,'supporter')
  this.enterable=true
}

var penna=new thing('penna')

var tavolo=new supporter('tavolo')

var scatola=new container('scatola')

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
}

function exp(obj) {
  document.write(inner(obj.type,obj.name));
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