
function isString(s) {
  return typeof(s)==='string'||s instanceof String
}
function remove(array,id){
  const idx=array.indexOf(id)
  if(idx<0)
    return false
  array.splice(idx,1)
  return true
}

const langdef='en'
var langtag='en'
function x(sentence,obj1,obj2){
  if(isString(sentence))
    return sentence
  var lan=langtag
  var ret=sentence[lan]
  if(!ret){
    lan=langdef 
    ret=sentence[lan]
  }
  return decode(lan,ret,obj1,obj2)
}
function decode(lan,txt,obj1,obj2){
  txt=txt.replaceAll(/\[([^\]]+)\]/g,function(match,p1){
    switch(lan){
      case 'en':
        return decodeen(p1,obj1,obj2)
      case 'it':
        return decodeit(p1,obj1,obj2)
      default:
        return p1
    }
  })
  return txt
}
function decodeen(p1,obj1,obj2){
  var o=obj1
  if(p1.charAt(p1.length-1)=='2'){
    p1=p1.substring(0,p1.length-1)
    o=obj2
  }
  switch(p1){
    case 'The object':
      return cap(en.detart(o))+innerobject(o)
    case 'the object':
      return en.detart(o)+innerobject(o)
    case 'an object':
      return en.indart(o)+innerobject(o)
    case 'object':
      return innerobject(o)
    case 'is':
      return o.enplural?'are':'is'
    case 'a list of objects':
      return anlistobjs(o)
    case 'list of objects':
      return listobjs(o)
    default:
      return p1
  }
}
function decodeit(p1,obj1,obj2){
  var o=obj1
  if(p1.charAt(p1.length-1)=='2'){
    p1=p1.substring(0,p1.length-1)
    o=obj2
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
    case "oggetto":
      return innerobject(o)
    case "una lista di oggetti":
      return anlistobjs(o)
    case "lista di oggetti":
      return listobjs(o)
    case 'è':
      return o.itplural?'sono':'è'
    case 'o':
      return o.itfemale?
        (o.itplural?'e':'a'):
        (o.itplural?'o':'i')
    default:
      return p1
  }
}
var w={
  Langchanged:{
    en:"Now the story is in English.",
    it:"Ora la storia è in italiano.",
  },
  Nothingtodo:{en:"Nothing to do.",it:"Niente da fare."},
  Cantdo:{en:"You can't do that.",it:"Non puoi farlo."},
  Cantsee:{
    en:"Here you can't see [the object].",
    it:"Qui non vedi [l'oggetto]."
  },
  Cantseeexit:{
    en:"Here You can't see the exit [object].",
    it:"Qui non vedi l'uscita [oggetto]."
  },
  Cantmove:{
    en:"You can't move [the object].",
    it:"Non puoi spostare [l'oggetto]."
  },
  Cantwear:{
    en:"You can't wear [the object].",
    it:"Non puoi indossare [l'oggetto]."
  },
  Itsclosed:{
    en:"[The object] [is] closed.",
    it:"[L'oggetto] [è] chius[o]."
  },
  Nospecial:{
    en:"You see nothing special in [the object].",
    it:"Non noti nulla di speciale [nell'oggetto]."},
  Inventory:{en:"Inventory",it:"Inventario"},
  Yougoto:{
    en:"You go to [the object].",
    it:"Vai verso [l'oggetto]."
  },
  Seeing:{
    en:"Here you can see [a list of objects].",
    it:"Qui puoi vedere [una lista di oggetti]."
  },
  Exits:{
    en:"Visible exits: [list of objects].",
    it:"Uscite visibili: [lista di oggetti]."
  },
  Inseeing:{
    en:"In [the object] you see [a list of objects2].",
    it:"[Nell'oggetto] vedi [una lista di oggetti2]."
  },
  Onseeing:{
    en:"On [the object] you see [a list of objects2].",
    it:"[Sull'oggetto] vedi [una lista di oggetti2]."
  },
  Carring:{
    en:"You carry [a list of objects].",
    it:"Porti [una lista di oggetti].",
  },
  Wearing:{
    en:"You wear [a list of objects].",
    it:"Indossi [una lista di oggetti]."
  },
  Youwear:{
    en:"You wear [the object].",
    it:"Hai indossato [l'oggetto]."
  },
  Youremove:{
    en:"You remove [the object].",
    it:"Hai tolto [l'oggetto]."
  },
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
  Youcarrynothing:{
    en:"You carry nothing.",
    it:"Non porti nulla."
  },
  nothing:{en:"nothing",it:"nulla"},
  none:{en:"none",it:"nessuna"},
  anobject:{en:"[an object]",it:"[un oggetto]"},
  object:{en:"[object]",it:"[oggetto]"},
  and:{en:" and ",it:" e "},
  SAVE:{en:"SAVE",it:"SALVA"},
  RESTART:{en:"RESTART",it:"RICOMINCIA"},
  RESTORE:{en:"RESTORE",it:"RIPRISTINA"},
}
var it={
  artdet:function(obj){
    return obj.proper?"":(obj.itfemale?"la ":"il ")
  },
  artind:function(obj){
    return obj.proper?"":(obj.itfemale?"una ":"un ")
  },
}
var en={
  detart:function(obj){return obj.proper?"":"the "},
  indart:function(obj){
    if(obj.proper) return ""
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
  this.scenery=true
  this.exits=[]
  this.addexit=function(obj){
    this.exits.push(obj.id)
    obj.loc=this.id
  }
}
function exit(id){
  object.call(this,id,'exit')
  this.roomto='void'
}
function thing(id){
  object.call(this,id,'thing')
  this.movable=true
}
function container(id){
  group.call(this,id,'container')
  this.movable=true
  this.enterable=false
  this.transparent=true
  this.locked=false
  this.closed=false
  this.keys=[]
}
function vehicle(id){
  container.call(this,id,'vehicle')
  this.enterable=true
}
function supporter(id){
  group.call(this,id,'supporter')
  this.scenery=true
  this.enterable=true
}
function mount(id){
  supporter.call(this,id,'mount')
  this.scenery=false
}

function addobject(obj){world.add(obj)}
function getobj(id){return world.objects[id]}
function getroom(){return world.objects[world.loc]}

function getel(elname){return document.getElementById(elname);}

function inner(elname,text){getel(elname).innerHTML=text}
const msgtot=9
var msgcount=0
function msg(text){
  msgcount++
  getel("$msg").start=msgcount
  for(var ct=msgtot;ct>=1;ct--)
    getel('$msg'+ct).innerHTML=getel('$msg'+(ct-1)).innerHTML
  inner('$msg0',text)
}

function cap(txt){return txt.charAt(0).toUpperCase()+txt.slice(1)}

function innerobject(obj) {
  var id=obj.id
  var type=obj.type
  var name=x(obj.name)
  return innerclass(id,type,name)
}
function innerclass(id,type,name){
  return '<span class="'+type+'" id="'+id+'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" onclick="clickon(event)">'+name+'</span>'
}

function mark(text){
  text=text.replaceAll(/{([^}]+)}/g,function(match,p1){
    var obj=world.objects[p1]
    return innerobject(obj);
  })
  return text
}

function yousee(room){
  return x(w.Seeing,room.objects)
}
function listexits(room){
  return x(w.Exits,room.exits)
}
function inyousee(obj){
  return x(w.Inseeing,obj,obj.objects)
}
function onyousee(obj){
  return x(w.Onseeing,obj,obj.objects)
}
function youcarry(){
  return x(w.Carring,world.carried)
}
function youwear(){
  return x(w.Wearing,world.worn)
}

function listobjs(array){
  if(array.length==0)
    return x(w.none)
  ret=x(w.object,getobj(array[0]))
  if(array.length==1)
    return ret
  for(var ct=1;ct<array.length-1;ct++)
    ret+=", "+x(w.object,getobj(array[ct]))
  ret+=x(w.and)+x(w.object,getobj(array[array.length-1]))
  return ret
}
function anlistobjs(array){
  if(array.length==0)
    return x(w.nothing)
  ret=x(w.anobject,getobj(array[0]))
  if(array.length==1)
    return ret
  for(var ct=1;ct<array.length-1;ct++)
    ret+=", "+x(w.anobject,getobj(array[ct]))
  ret+=x(w.and)+x(w.anobject,getobj(array[array.length-1]))
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
  var drain=ev.target.id
  dragndrop(source,drain)
}

function isvisible(obj){
  if(obj.id==world.loc)
    return true
  var loc=obj.loc
  while(true){
    if(loc=='@carried'||loc=='@worn'||loc==world.loc)
      return true
    var oloc=getobj(loc)
    if(oloc.type=='room')
      return false
    if(oloc.type=='supporter'||oloc.type=='mount')
      loc=oloc.loc
    else if(oloc.type=='container'||oloc.type=='vehicle'){
      if(!oloc.transparent&&oloc.closed)
        return false
      loc=oloc.loc
    }else
      return false
  }
}

function dragndrop(source,drain){
  var sobj=getobj(source)
  if(!isvisible(sobj))
    return msg(x(w.Cantsee,sobj))
  if(sobj.scenery||!sobj.movable)
    return msg(x(w.Cantmove,sobj))
  if(drain=='@inventory'){
    var loc=sobj.loc
    if(loc=='@carried'){
      if(!sobj.wearable)
        return msg(x(w.Cantwear,sobj))
      remove(world.carried,sobj.id)
      world.worn.push(sobj.id)
      sobj.loc='@worn'
      msg(x(w.Youwear,sobj))
      return refresh()
    }
    if(loc=='@worn'){
      remove(world.worn,sobj.id)
      world.carried.push(sobj.id)
      sobj.loc='@carried'
      msg(x(w.Youremove,sobj))
      return refresh()
    }
    var org=getobj(loc)
    remove(org.objects,sobj.id)
    world.carried.push(sobj.id)
    sobj.loc='@carried'
    msg(x(w.Youtake,sobj,org))
    return refresh()
  }
  var dobj=getobj(drain)
  if(!isvisible(dobj))
    return msg(x(w.Cantsee,dobj))
  if(sobj==dobj)
    return msg(x(w.Cantdo))
  switch(dobj.type){
    case 'room':
      if(sobj.loc=='@carried'){
        remove(world.carried,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youdrop,sobj,dobj))
        return refresh()
      }
      if(sobj.loc=='@worn'){
        remove(world.worn,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youremove,sobj))
        msg(x(w.Youdrop,sobj,dobj))
        return refresh()
      }
      var sloc=getobj(sobj.loc)
      remove(sloc.objects,sobj.id)
      dobj.add(sobj)
      msg(x(w.Youtake,sobj,sloc))
      msg(x(w.Youputin,sobj,dobj))
      return refresh()
    case 'container':
      if(dobj.closed)
        return msg(x(w.Cantdo)+' '+x(w.Itsclosed,dobj))
      if(sobj.loc=='@carried'){
        remove(world.carried,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youputin,sobj,dobj))
        return refresh()
      }
      if(sobj.loc=='@worn'){
        remove(world.worn,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youremove,sobj))
        msg(x(w.Youputin,sobj,dobj))
        return refresh()
      }
      var sloc=getobj(sobj.loc)
      remove(sloc.objects,sobj.id)
      dobj.add(sobj)
      msg(x(w.Youtake,sobj,sloc))
      msg(x(w.Youputin,sobj,dobj))
      return refresh()
    case 'supporter':
      if(sobj.loc=='@carried'){
        remove(world.carried,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youputon,sobj,dobj))
        return refresh()
      }
      if(sobj.loc=='@worn'){
        remove(world.worn,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youremove,sobj))
        msg(x(w.Youputon,sobj,dobj))
        return refresh()
      }
      var sloc=getobj(sobj.loc)
      remove(sloc.objects,sobj.id)
      dobj.add(sobj)
      msg(x(w.Youtake,sobj,sloc))
      msg(x(w.Youputon,sobj,dobj))
      return refresh()
    default:
      return msg(x(w.Cantdo))
  }
}

function clickon(ev){
  var obj=getobj(ev.target.id)
  obj.type=='exit'?gothrough(obj):examine(obj)
}
function gothrough(obj){
  if(!isvisible(obj))
    return msg(x(w.Cantseeexit,obj))
  world.loc=obj.roomto
  var room=getobj(world.loc)
  msg(x(w.Yougoto,room))
  refresh()
}
function examine(obj){
  if(!isvisible(obj))
    return msg(x(w.Cantsee,obj))
  var str=mark(x(obj.desc?obj.desc:w.Nospecial,obj))
  if(obj.objects && obj.objects.length>0)
    str+="<br>"+(
      obj.type=="supporter"||obj.type=="mount"?
      onyousee:inyousee
    )(obj)
  msg(str)
}

function refreshRoom(){
  var room=getroom()
  var str
  str='<h2 id="'+room.id+'" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+cap(x(room.name))+'</h2>'
    +mark(x(room.desc))
  if(room.objects.length>0)
    str+="<p>"+yousee(room)
  str+="<p>"+listexits(room)
  inner('$room',str)
}
function refreshInventory(){
  var str='<h2 id="@inventory" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+x(w.Inventory)+"</h2>"
  if(world.carried.length>0)
    str+="<p>"+youcarry()
  else
    str+=x(w.Youcarrynothing)
  if(world.worn.length>0)
    str+="<p>"+youwear()
  inner('$inventory',str)
}
function refresh(){
  refreshRoom()
  refreshInventory()
}

window.onload=function(){
  for(var ct=1;ct<=9;ct++){
    var el=document.createElement("li")
    el.id="$msg"+ct
    getel("$msg").appendChild(el)
  }
  refresh()
}