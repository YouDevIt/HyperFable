var penna = {
  type: 'thing',
  name: 'penna',
  gender: 'female',
}

var tavolo = {
  type: 'supporter',
  name: 'tavolo',
}

var scatola = {
  type: 'container',
  name: 'scatola',
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