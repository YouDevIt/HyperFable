
function isString(s) {
  return typeof(s)==='string'||s instanceof String
}
function remove(array,item){
  const idx=array.indexOf(item)
  if(idx>=0){array.splice(idx,1);return true}
  return false
}

const langdef='en'
var langtag='en'
function x(sentence){
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
  return isString(ret)?decode(lan,ret):ret
}
var $obj,$obj2
function decode(lan,txt){
  txt=txt.replaceAll(/\[([^\]]+)\]/g,function(match,p1){
    switch(lan){
      case 'en':
        return decodeen(p1)
      case 'it':
        return decodeit(p1)
    }
    return p1
  })
  return txt
}
function decodeen(p1){
  var o=$obj
  if(p1.charAt(p1.length-1)=='2'){
    o=$obj2
    p1=p1.substring(0,p1.length-1)
  }
  switch(p1){
    case 'The object':
      return cap(en.detart(o))+innerobject(o)
    case 'the object':
      return en.detart(o)+innerobject(o)
    case 'an object':
      return en.indart(o)+innerobject(o)
    case 'is':
      return o.enplural?'are':'is'
  }
  return p1
}
function decodeit(p1){
  var o=$obj
  if(p1.charAt(p1.length-1)=='2'){
    o=$obj2
    p1=p1.substring(0,p1.length-1)
  }
  switch(p1){
    case "L'oggetto":
      return cap(it.artdet(o))+innerobject(o)
    case "l'oggetto":
      return it.artdet(o)+innerobject(o)
    case "nell'oggetto":
      return "ne"+it.artdet(o)+innerobject(o)
    case "Nell'oggetto":
      return "Ne"+it.artdet(o)+innerobject(o)
    case "sull'oggetto":
      return "su"+it.artdet(o)+innerobject(o)
    case "Sull'oggetto":
      return "Su"+it.artdet(o)+innerobject(o)
    case "dall'oggetto":
      return "da"+it.artdet(o)+innerobject(o)
    case "un oggetto":
      return it.artind(o)+innerobject(o)
      break
    case 'è':
      return o.itplural?'sono':'è'
    case 'o':
      return o.itfemale?
        (o.itplural?'e':'a'):
        (o.itplural?'o':'i')
  }
  return p1
}
w={
  Langchanged:{
    en:"Now the story is in English.",
    it:"Ora la storia è in italiano.",
  },
  Nothingtodo:{en:"Nothing to do.",it:"Niente da fare."},
  Cantdo:{en:"You can't do that. ",it:"Non puoi farlo. "},
  Itsclosed:{en:"[The object] [is] closed.",it:"[L'oggetto] [è] chius[o]."},
  Nospecial:{
    en:"You see nothing special.",
    it:"Non noti nulla di speciale."},
  Inventory:{en:"Inventory",it:"Inventario"},
  Yousee:{en:"Here you can see ",it:"Qui puoi vedere "},
  Inyousee:{en:"In [the object] you see ",it:"[Nell'oggetto] vedi "},
  Onyousee:{en:"On [the object] you see ",it:"[Sull'oggetto] vedi "},
  Youcarry:{en:"You carry ",it:"Porti "},
  Youwear:{en:"You wear ",it:"Indossi "},
  Youtake:{
    en:"You take [the object] from [the object2].",
    it:"Hai preso [l'oggetto] [dall'oggetto2]."
  },
  Youputin:{
    en:"You put [the object] in [the object2].",
    it:"Hai messo [l'oggetto] [nell'oggetto2].",
  },
  Youputon:{
    en:"You put [the object] on [the object2].",
    it:"Hai messo [l'oggetto] [sull'oggetto2].",
  },
  Youdrop:{
    en:"You drop [the object] in [the object2].",
    it:"Hai lasciato [l'oggetto] [nell'oggetto2].",
  },
  Youcarrynothing:{en:"You carry nothing.",it:"Non porti nulla."},
  nothing:{en:"nothing",it:"nulla"},
  anobject:{en:"[an object]",it:"[un oggetto]"},
  and:{en:" and ",it:" e "},
  SAVE:{en:"SAVE",it:"SALVA"},
  RESTART:{en:"RESTART",it:"RICOMINCIA"},
  RESTORE:{en:"RESTORE",it:"RIPRISTINA"},
}
var it={
  artdet:function(obj){
    return (obj.itfemale?"la ":"il ")
  },
  artind:function(obj){
    return (obj.itfemale?"una ":"un ")
  },
}
var en={
  detart:function(obj){return obj.enproper?"":"the "},
  indart:function(obj){
    var first=x(obj.name).charAt(0)
    return ("aeiouAEIOU".indexOf(first)>=0)?"an ":"a "
  },
}

function changelang(code){
  langtag=code
  choutline('$en',code=="en"?"solid red;":"solid black;")
  choutline('$it',code=="it"?"solid red;":"solid black;")
  getel("$save").innerHTML=x(w.SAVE)
  getel("$restore").innerHTML=x(w.RESTORE)
  getel("$restart").innerHTML=x(w.RESTART)
  refresh()
  msg(x(w.Langchanged))
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
  this.desc=w.Nospecial
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

function innerobject(obj) {
  var id=obj.id
  var type= obj.type
  var name=x(obj.name)
  return '<span class="'+type+'" id="'+id+'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" onclick="clickon(event)">'+name+'</span>';
}

function mark(text){
  text=text.replaceAll(/{([^}]+)}/g,function(match,p1){
    var obj=world.objects[p1]
    return innerobject(obj);
  })
  return text
}

function yousee(room){
  return x(w.Yousee)+listobjs(room.objects)+"."
}
function inyousee(obj){
  $obj=obj
  return x(w.Inyousee)+listobjs(obj.objects)+"."
}
function onyousee(obj){
  $obj=obj
  return x(w.Onyousee)+listobjs(obj.objects)+"."
}
function youcarry(){
  return x(w.Youcarry)+listobjs(world.carried)+"."
}
function youwear(){
  return x(w.Youwear)+listobjs(world.worn)+"."
}

function listobjs(array){
  if(array.length==0)
    return x(w.nothing)
  $obj=getobj(array[0])
  ret=x(w.anobject)
  if(array.length==1)
    return ret
  for(var ct=1;ct<array.length-1;ct++){
    $obj=getobj(array[ct])
    ret+=", "+x(w.anobject)
  }
  $obj=getobj(array[array.length-1])
  ret+=x(w.and)+x(w.anobject)
  return ret
}

function changeEditable() {
  document.body.contentEditable = document.body.contentEditable=='true'?'false':'true'
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
  var source=ev.dataTransfer.getData("text")
  var drain = ev.target.id
  dragndrop(source,drain)
}
function dragndrop(source, drain){
  if(drain=='@inventory'){
    var obj=getobj(source)
    var loc=obj.loc
    if(loc=='@carried'||loc=='@worn'){
      msg(x(w.Nothingtodo))
      return
    }
    var org=getobj(loc)
    if(remove(org.objects,obj.id)){
      world.carried.push(obj.id)
      obj.loc='@carried'
      $obj=obj
      $obj2=org
      msg(x(w.Youtake))
      refresh()
    }else{
      msg(x(w.Cantdo))
    }
  }else{
    var dobj=getobj(drain)
    var sobj=getobj(source)
    if(sobj==dobj){
      msg(x(w.Cantdo))
      return
    }
    switch(dobj.type){
      default:
        msg(x(w.Cantdo))
        break
      case 'room':
        if(sobj.loc=='@carried'){
          remove(world.carried,sobj.id)
          dobj.add(sobj)
          $obj=sobj
          $obj2=dobj
          msg(x(w.Youdrop))
          refresh()
        }else{
          remove(getobj(sobj.loc).objects,sobj.id)
          dobj.add(sobj)
          $obj=sobj
          $obj2=dobj
          msg(x(w.Youputin))
          refresh()
        }
        return
      case 'container':
        if(dobj.closed){
          $obj=dobj
          msg(x(w.Cantdo)+' '+x(w.Itsclosed))
          return
        }
        if(sobj.loc=='@carried'){
          remove(world.carried,sobj.id)
          dobj.objects.push[sobj.id]
          $obj=sobj
          $obj2=dobj
          msg(x(w.Youputin))
          refresh()
        }else{
          remove(getobj(sobj.loc).objects,sobj.id)
          dobj.add(sobj)
          $obj=sobj
          $obj2=dobj
          msg(x(w.Youputin))
          refresh()
        }
        return
      case 'supporter':
        if(sobj.loc=='@carried'){
          remove(world.carried,sobj.id)
          dobj.objects.push[sobj.id]
          $obj=sobj
          $obj2=dobj
          msg(x(w.Youputon))
          refresh()
        }else{
          remove(getobj(sobj.loc).objects,sobj.id)
          dobj.add(sobj)
          $obj=sobj
          $obj2=dobj
          msg(x(w.Youputon))
          refresh()
        }
        return
    }
    msg(source+" "+drain)
  }
}
function clickon(ev){
  examine(ev.target.id)
}

function examine(id){
  var obj=getobj(id)
  var str=obj.desc?mark(x(obj.desc)):x(w.Nospecial)
  if(obj.objects && obj.objects.length>0)
    str+="<p>"+(obj.type=="supporter"?onyousee:inyousee)(obj)
  msg(str)
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
  var str='<h2 id="@inventory" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+x(w.Inventory)+"</h2>"
  if(world.carried.length>0){
    str+="<p>"+youcarry()
    if(world.worn.length>0){
      str+="<p>"+youwear()
    }
  }else{
    str+=x(w.Youcarrynothing)
  }
  inner('$inventory',str)
}
function refresh(){
  refreshRoom()
  refreshInventory()
}

window.onload=function(){refresh()}