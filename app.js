
function isString(s) {
  return typeof(s)==='string'||s instanceof String
}
function remove(array,item){
  const idx=array.indexOf(item)
  if(idx>=0){
    array.splice(idx,1)
    return true
  }
  return false
}

const langdef='en'
var langtag='en'
function x(sentence,obj){
  var ret,lan
  if(sentence instanceof String){
    lan=langdef
    ret=sentence
  }else{
    lan=langtag
    ret=sentence[lan]
    if(!ret){
      lan=langdef 
      ret=sentence[lan]
    }
  }
  return isString(ret)?decode(lan,ret,obj):ret
}
function decode(lan,txt,obj){
  txt=txt.replaceAll(/\[([a-zA-Z\u00C0-\u017F]+)\]/g,function(match,p1){
    switch(lan){
      case 'en':
        return decodeen(p1,obj)
      case 'it':
        return decodeit(p1,obj)
    }
    return p1
  })
  return txt
}
function decodeen(p1,obj){
  switch(p1){
    case 'is':
      return obj.enplural?'are':'is'
  }
  return p1
}
function decodeit(p1,obj){
  switch(p1){
    case 'è':
      return obj.enplural?'sono':'è'
    case 'o':
      return obj.itfemale?
        (obj.itplural?'e':'a'):
        (obj.itplural?'o':'i')
  }
  return p1
}
system={
  Langchanged:{
    en:"Now the story is in English.",
    it:"Ora la storia è in italiano.",
  },
  Nothingtodo:{en:"Nothing to do.",it:"Niente da fare."},
  Cantdo:{en:"You can't do that. ",it:"Non puoi farlo. "},
  isclosed:{en:"[is] closed.",it:"[è] chius[o]."},
  Nospecial:{
    en:"You see nothing special.",
    it:"Non noti nulla di speciale."},
  Inventory:{en:"Inventory",it:"Inventario"},
  Yousee:{en:"Here you can see ",it:"Qui puoi vedere "},
  Youcarry:{en:"You carry ",it:"Porti "},
  Youwear:{en:"You wear ",it:"Indossi "},
  Youtake:{en:"You take ",it:"Hai preso "},
  Youput:{en:"You put ",it:"Hai messo "},
  Youdrop:{en:"You drop ",it:"Hai lasciato "},
  Youcarrynothing:{en:"You carry nothing.",it:"Non porti nulla."},
  nothing :{en:"nothing",it:"nulla"},
  and:{en:" and ",it:" e "},
  SAVE:{en:"SAVE",it:"SALVA"},
  RESTORE:{en:"RESTORE",it:"RIPRISTINA"},
}
g={
  the:{
    en:function(){return 'the '},
    it:function(obj){return obj.itfemale?'la ':'il '},
  },
  a:{
    en:function(obj){return 'a '},
    it:function(obj){return obj.itfemale?'una ':'un '},
  },
  ofthe:{
    en:function(){return 'of the '},
    it:function(obj){return 'de'+g.the.it(obj)},
  },
  tothe:{
    en:function(){return 'to the '},
    it:function(obj){return 'a'+g.the.it(obj)},
  },
  fromthe:{
    en:function(){return 'from the '},
    it:function(obj){return 'da'+g.the.it(obj)},
  },
  inthe:{
    en:function(){return 'in the '},
    it:function(obj){return 'ne'+g.the.it(obj)},
  },
  onthe:{
    en:function(){return 'on the '},
    it:function(obj){return 'su'+g.the.it(obj)},
  },
}

function changelang(code){
  langtag=code
  choutline('$en',code=="en"?"solid red;":"solid black;")
  choutline('$it',code=="it"?"solid red;":"solid black;")
  getel("$save").innerHTML=x(system.SAVE)
  getel("$restore").innerHTML=x(system.RESTORE)
  refresh()
  msg(x(system.Langchanged))
}

function choutline(el,newstr){
  var str=getel(el).style.cssText
  var idx= str.indexOf("outline:")
  getel(el).style.cssText=str.substring(0,idx+9)+newstr
}

function world(){
  this.loc='void'
  this.objects={void:{id:'void',name:'void',loc:'void',objects:['void ']}}
  this.carried=[]
  this.worn=[]
  this.add=function(obj){this.objects[obj.id]=obj}
}
var world=new world()
function start(roomid){world.loc=roomid}
function object(id,type){
  this.id=id
  addobject(this)
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
  this.add=function(obj){
    this.objects.push(obj.id)
    obj.loc=this.id
  }
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
  this.roomto='void'
}
function thing(id){
  object.call(this,id,'thing')
}
function container(id){
  group.call(this,id,'container')
  this.transparent=true
  this.locked=false
  this.closed=false
  this.keys=[]
}
function supporter(id){
  group.call(this,id,'supporter')
  this.enterable=true
}
function addobject(obj){world.add(obj)}
function getobj(id){return world.objects[id]}
function getroom(){return world.objects[world.loc]}

function getel(elname){return document.getElementById(elname);}

function inner(elname,text){getel(elname).innerHTML=text}
function msg(text){inner('$message',text)}

function cap(txt){return txt.charAt(0).toUpperCase()+txt.slice(1)}

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
  return x(system.Youcarry)+listobjs(world.carried)+"."
}
function youwear (){
  return x(system.Youwear)+listobjs(world.worn)+"."
}

function listobjs(array){
  if(array.length==0)
    return x(system.nothing)
  var item=array[0]
  var obj=getobj(item)
  ret=x(g.a)(obj)+innerobject(obj.id,obj.type,x(obj.name))
  if(array.length==1)
    return ret
  for(var ct=1;ct<array.length-1;ct++){
    item=array [ct]
    obj=getobj (item)
    ret+=", "+x(g.a)(obj)+innerobject(obj.id,obj.type,x(obj.name))
  }
  item=array[array.length-1]
  obj=getobj(item)
  ret+=x(system.and)+x(g.a)(obj)+innerobject(obj.id,obj.type,x(obj.name))
  return ret
}

function changeEditable() {
  document.body.contentEditable = document.body.contentEditable=='true'?'false':'true'
  if(document.body.contentEditable == 'false') {
    var markup=document.documentElement.innerHTML
    markup=markup.replaceAll(/{t (\w+)}/g,function(match,p1){return innerobject(p1,"thing",p1)})
    markup=markup.replaceAll(/{s (\w+)}/g,function(match,p1){return innerobject(p1,"supporter",p1)})
    markup=markup.replaceAll(/{c (\w+)}/g,function(match,p1){return innerobject(p1,"container",p1)})
    document.documentElement.innerHTML=markup
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
  if(drain=='@inventory'){
    var obj=getobj(source)
    var loc=obj.loc
    if(loc=='@carried'||loc=='@worn'){
      msg(x(system.Nothingtodo))
      return
    }
    var org=getobj(loc)
    if(remove(org.objects,obj.id)){
      world.carried.push(obj.id)
      obj.loc='@carried'
      msg(
        x(system.Youtake)+
        x(g.the)(obj)+
        x(obj.name)+' '+
        x(g.fromthe)(org)+
        x(org.name)+'.')
      refresh()
    }else{
      msg(x(system.Cantdo))
    }
  }else{
    var dobj=getobj(drain)
    var sobj=getobj(source)
    switch(dobj.type){
      default:
        msg(x(system.Cantdo))
        break
      case 'room':
        if(sobj.loc=='@carried'){
          remove(world.carried,sobj.id)
          dobj.add(sobj)
          msg(
            x(system.Youdrop)+
            x(g.the)(sobj)+
            x(sobj.name)+' '+
            x(g.inthe)(dobj)+
            x(dobj.name)+'.')
          refresh()
        }else{
          remove(getobj(sobj.loc).objects,sobj.id)
          dobj.add(sobj)
          msg(
            x(system.Youput)+
            x(g.the)(sobj)+
            x(sobj.name)+' '+
            x(g.inthe)(dobj)+
            x(dobj.name)+'.')
          refresh()
        }
        return
      case 'container':
        if(dobj.closed){
          msg(x(system.Cantdo)+' '+
            cap(x(g.the)(dobj))+x(dobj.name)+' '+
            x(system.isclosed,dobj))
          return
        }
        if(sobj.loc=='@carried'){
          remove(world.carried,sobj.id)
          dobj.objects.push[sobj.id]
          msg(
            x(system.Youput)+
            x(g.the)(sobj)+
            x(sobj.name)+' '+
            x(g.inthe)(dobj)+
            x(dobj.name)+'.')
          refresh()
        }else{
          remove(getobj(sobj.loc).objects,sobj.id)
          dobj.add(sobj)
          msg(
            x(system.Youput)+
            x(g.the)(sobj)+
            x(sobj.name)+' '+
            x(g.inthe)(dobj)+
            x(dobj.name)+'.')
          refresh()
        }
        return
      case 'supporter':
        if(sobj.loc=='@carried'){
          remove(world.carried,sobj.id)
          dobj.objects.push[sobj.id]
          msg(
            x(system.Youput)+
            x(g.the)(sobj)+
            x(sobj.name)+' '+
            x(g.onthe)(dobj)+
            x(dobj.name)+'.')
          refresh()
        }else{
          remove(getobj(sobj.loc).objects,sobj.id)
          dobj.add(sobj)
          msg(
            x(system.Youput)+
            x(g.the)(sobj)+
            x(sobj.name)+' '+
            x(g.onthe)(dobj)+
            x(dobj.name)+'.')
          refresh()
        }
        return
    }
    msg(source+" "+drain)
  }
}

function refreshRoom(){
  var room=getroom()
  var str
  str='<h2 id="'+room.id+'" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+cap(x(room.name))+'</h2>'
    +mark(x(room.desc))
  if(room.objects.length>0)
    str+="<p>"+yousee(room)
  inner('$room',str)
}
function refreshInventory(){
  var str='<h2 id="@inventory" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+x(system.Inventory)+"</h2>"
  if(world.carried.length>0){
    str+="<p>"+youcarry()
    if(world.worn.length>0){
      str+="<p>"+youwear()
    }
  }else{
    str+=x(system.Youcarrynothing)
  }
  inner('$inventory',str)
}
function refresh(){
  refreshRoom()
  refreshInventory()
}

window.onload=function(){refresh()}