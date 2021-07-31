
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
    case "list of actions":
      return listactions(obj1,obj2)
    case 'it':
      return o.enplural?'them':o.enmale?'him':o.enfemale?'her':'it'
    case 'open or closed':
      return o.closed?'closed':'open'
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
    case "lista di azioni":
      return listactions(obj1,obj2)
    case 'è':
      return o.itplurale?'sono':'è'
    case 'o':
      return o.itfemminile?
        (o.itplurale?'e':'a'):
        (o.itplurale?'i':'o')
    case 'aperto o chiuso':
      return o.closed?'chius'+decodeit('o',o):'apert'+decodeit('o',o)
    default:
      return p1
  }
}
var w={
  Langchanged:{
    en:"Now the story is in English.",
    it:"Ora la storia è in italiano.",
  },
  by:{en:"by ",it:"di "},
  Nothingtodo:{en:"Nothing to do.",it:"Niente da fare."},
  Youcando:{en:"(You can [list of actions])",it:"(Puoi [lista di azioni])"},
  Cantdo:{en:"You can't do that.",it:"Non puoi farlo."},
  Cantsee:{
    en:"Here you can't see [the object].",
    it:"Qui non vedi [l'oggetto]."
  },
  Cantseeexit:{
    en:"Here you can't see the exit [object].",
    it:"Qui non vedi l'uscita [oggetto]."
  },
  Canttake:{
    en:"You can't take [the object].",
    it:"Non puoi prendere [l'oggetto]."
  },
  Alreadyhold:{
    en:"You already hold [the object].",
    it:"Porti già [l'oggetto]."
  },
  Cantwear:{
    en:"You can't wear [the object].",
    it:"Non puoi indossare [l'oggetto]."
  },
  Alreadywear:{
    en:"You already wear [the object].",
    it:"Indossi già [l'oggetto]."
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
  and:{en:", and ",it:" e "},
  or:{en:", or ",it:" o "},
  SAVE:{en:"SAVE",it:"SALVA"},
  RESTART:{en:"RESTART",it:"RICOMINCIA"},
  RESTORE:{en:"RESTORE",it:"RIPRISTINA"},
  take:{en:"take [it]",it:"prenderl[o]"},
  drop:{en:"drop [it]",it:"lasciarl[o]"},
  wear:{en:"wear [it]",it:"indossarl[o]"},
  remove:{en:"remove [it]",it:"toglierl[o]"},
  open:{en:"open [it]",it:"aprirl[o]"},
  Alreadyopen:{
    en:"[The object] [is] already open.",
    it:"[L'oggetto] [è] già apert[o]"
  },
  openorclosed:{en:"[open or closed]",it:"[aperto o chiuso]"},
  Youopen:{
    en:"You open [the object].",
    it:"Hai aperto [l'oggetto]."
  },
  Youopenrevealing:{
    en:"You open [the object] revealing [a list of objects2].",
    it:"Hai aperto [l'oggetto] scoprendo [una lista di oggetti2]."
  },
  Cantopen:{
    en:"You can't open [the object].",
    it:"Non puoi aprire [l'oggetto]."
  },
  Cantopenwithout:{
    en:"You can't open [the object] without a key.",
    it:"Non puoi aprire [l'oggetto] senza una chiave."
  },
  close:{en:"close [it]",it:"chiuderl[o]"},
  Youclose:{
    en:"You close [the object].",
    it:"Hai chiuso [l'oggetto]."
  },
  Cantclose:{
    en:"You can't close [the object].",
    it:"Non puoi chiudere [l'oggetto]."
  },
  Cantclosewithout:{
    en:"You can't close [the object] without a key.",
    it:"Non puoi chiudere [l'oggetto] senza una chiave."
  },
  n:{en:"north",it:"nord"},
  s:{en:"south",it:"sud"},
  w:{en:"west",it:"ovest"},
  e:{en:"east",it:"est"},
  u:{en:"up",it:"su"},
  d:{en:"down",it:"giù"},
  enter:{en:"enter [it]",it:"entrarci"},
  Youenter:{
    en:"You enter in [the object].",
    it:"Sei entrato [nell'oggetto]."
  },
  Cantenter:{
    en:"You can't enter in [the object].",
    it:"Non puoi entrare [nell'oggetto]."
  },
  exit:{en:"exit [it]",it:"uscirne"},
  Youexit:{
    en:"You exit [the object].",
    it:"Sei usciti [dall'oggetto]."
  },
  Cantexit:{
    en:"You can't exit [the object].",
    it:"Non puoi uscire [dall'oggetto]."
  },
  sit:{en:"sit on [it]",it:"sedertici sopra"},
  Yousit:{
    en:"You sit on [the object].",
    it:"Ti sei seduto [sull'oggetto]."
  },
  Cantsit:{
    en:"You can't sit on [the object].",
    it:"Non puoi sederti [sull'oggetto]."
  },
  getoff:{en:"get off [it]",it:"scenderne"},
  Yougetoff:{
    en:"You get off [the object].",
    it:"Sei sceso [dall'oggetto]."
  },
  Cantgetoff:{
    en:"You can't get off [the object].",
    it:"Non puoi scendere [dall'oggetto]."
  },
  climb:{en:"climb [it]",it:"salirci"},
  Youclimb:{
    en:"You climb [the object].",
    it:"Sei salito [sull'oggetto]."
  },
  Cantclimb:{
    en:"You can't get on [the object].",
    it:"Non puoi salire [sull'oggetto]."
  },
  descend:{en:"descend [it]",it:"scenderne"},
  Youdescend:{
    en:"You descend [the object].",
    it:"Sei sceso [dall'oggetto]."
  },
  Cantdescend:{
    en:"You can't descend [the object].",
    it:"Non puoi scendere [dall'oggetto]."
  },
}
var it={
  artdet:function(obj){
    return obj.proper?"":(obj.itfemminile?"la ":"il ")
  },
  artind:function(obj){
    return obj.proper?"":(obj.itfemminile?"una ":"un ")
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
  showAll()
  msg(x(w.Langchanged))
}

function choutline(el,newstr){
  var str=getel(el).style.cssText
  var idx= str.indexOf("outline:")
  getel(el).style.cssText=str.substring(0,idx+9)+newstr
}

function world(){
  this.loc='@intro'
  this.objects={void:{id:'void',name:'void',loc:'void',objects:['void']}}
  this.carried=[]
  this.worn=[]
  this.add=function(obj){this.objects[obj.id]=obj}
}
var world=new world()
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
function person(id){
  group.call(this,id,'person')
  this.wears=[]
}
function room(id){
  group.call(this,id,'room')
  this.fixedinplace=true
  this.exits=[]
  this.addexit=function(obj){
    this.exits.push(obj.id)
    obj.loc=this.id
  }
}
function intro(){
  room.call(this,'@intro')
  this.name="Untitled"
  this.author="Anonymous"
  this.subtitle=""
  this.blurb=""
  this.IFID=""
  this.date=""
  this.release=""
  this.addtitle=function(newlang,newtitle){
    this.addprop('title',newlang,newtitle)
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
  this.keys=[]
}
function vehicle(id){
  container.call(this,id,'vehicle')
  this.enterable=true
}
function supporter(id){
  group.call(this,id,'supporter')
}
function mount(id){
  supporter.call(this,id,'mount')
}

function addobject(obj){world.add(obj)}
function getobj(id){return world.objects[id]}
function getroom(){
  var oloc=getobj(world.loc)
  while(oloc.type!='room')
    oloc=getobj(oloc.loc)
  return oloc
}

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
function inneraction(actionid,obj){
  return '<span class="action" id="'+actionid+' '+obj.id+'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" onclick="clickon(event)">'+x(w[actionid],obj)+'</span>'
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

function menulist(array){
  var ret=""
  for(var ct=0;ct<array.length;ct++)
    ret+=x(w.object,getobj(array[ct]))+" "
  return ret
}
function listobjs(argarray){
  var array=[]
  for(const item of argarray)
    if(!getobj(item).scenery)
      array.push(item)
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
function listactions(array,obj){
  if(array.length==0)
    return x(w.nothing)
  ret=inneraction(array[0],obj)
  if(array.length==1)
    return ret
  for(var ct=1;ct<array.length-1;ct++)
    ret+=", "+inneraction(array[ct],obj)
  ret+=x(w.or)+inneraction(array[array.length-1],obj)
  return ret
}
function anlistobjs(argarray){
  var array=[]
  for(const item of argarray)
    if(!getobj(item).scenery)
      array.push(item)
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
function drag(ev) {
  var id=ev.target.id
  if(ev.target.className=="action")
    id="*"+id.split(" ")[0]
  ev.dataTransfer.setData("text",id)
}
function drop(ev) {
  ev.preventDefault()
  var source=ev.dataTransfer.getData("text")
  var drain=ev.target.id
  if(source.charAt(0)=="*"){
    if(ev.target.className=="action")
      return msg(x(w.Cantdo))
    return perform(source.substring(1),drain)
  }
  if(ev.target.className=="action")
    return perform(drain.split(" ")[0],source)
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
  if(sobj.scenery||sobj.fixedinplace)
    return msg(x(w.Canttake,sobj))
  if(drain=='@inventory'){
    var loc=sobj.loc
    if(loc=='@carried'){
      if(!sobj.wearable)
        return msg(x(w.Cantwear,sobj))
      remove(world.carried,sobj.id)
      world.worn.push(sobj.id)
      sobj.loc='@worn'
      msg(x(w.Youwear,sobj))
      return showAll()
    }
    if(loc=='@worn'){
      remove(world.worn,sobj.id)
      world.carried.push(sobj.id)
      sobj.loc='@carried'
      msg(x(w.Youremove,sobj))
      return showAll()
    }
    var org=getobj(loc)
    remove(org.objects,sobj.id)
    world.carried.push(sobj.id)
    sobj.loc='@carried'
    msg(x(w.Youtake,sobj,org))
    return showAll()
  }
  if(drain=='@carried'){
    var loc=sobj.loc
    if(loc=='@carried')
      return msg(x(w.Alreadyhold,sobj))
    if(loc=='@worn'){
      remove(world.worn,sobj.id)
      world.carried.push(sobj.id)
      sobj.loc='@carried'
      msg(x(w.Youremove,sobj))
      return showAll()
    }
    var org=getobj(loc)
    remove(org.objects,sobj.id)
    world.carried.push(sobj.id)
    sobj.loc='@carried'
    msg(x(w.Youtake,sobj,org))
    return showAll()
  }
  if(drain=='@worn'){
    var loc=sobj.loc
    if(loc=='@carried'){
      if(!sobj.wearable)
        return msg(x(w.Cantwear,sobj))
      remove(world.carried,sobj.id)
      world.worn.push(sobj.id)
      sobj.loc='@worn'
      msg(x(w.Youwear,sobj))
      return showAll()
    }
    if(loc=='@worn')
      return msg(x(w.Alreadywear,sobj))
    var org=getobj(loc)
    remove(org.objects,sobj.id)
    world.carried.push(sobj.id)
    sobj.loc='@carried'
    msg(x(w.Youtake,sobj,org))
    showAll()
    if(!sobj.wearable)
      return msg(x(w.Cantwear,sobj))
    remove(world.carried,sobj.id)
    world.worn.push(sobj.id)
    sobj.loc='@worn'
    msg(x(w.Youwear,sobj))
    return showAll()
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
        return showAll()
      }
      if(sobj.loc=='@worn'){
        remove(world.worn,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youremove,sobj))
        msg(x(w.Youdrop,sobj,dobj))
        return showAll()
      }
      var sloc=getobj(sobj.loc)
      remove(sloc.objects,sobj.id)
      dobj.add(sobj)
      msg(x(w.Youtake,sobj,sloc))
      msg(x(w.Youputin,sobj,dobj))
      return showAll()
    case 'container':
      if(dobj.closed)
        return msg(x(w.Cantdo)+' '+x(w.Itsclosed,dobj))
      if(sobj.loc=='@carried'){
        remove(world.carried,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youputin,sobj,dobj))
        return showAll()
      }
      if(sobj.loc=='@worn'){
        remove(world.worn,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youremove,sobj))
        msg(x(w.Youputin,sobj,dobj))
        return showAll()
      }
      var sloc=getobj(sobj.loc)
      remove(sloc.objects,sobj.id)
      dobj.add(sobj)
      msg(x(w.Youtake,sobj,sloc))
      msg(x(w.Youputin,sobj,dobj))
      return showAll()
    case 'supporter':
      if(sobj.loc=='@carried'){
        remove(world.carried,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youputon,sobj,dobj))
        return showAll()
      }
      if(sobj.loc=='@worn'){
        remove(world.worn,sobj.id)
        dobj.add(sobj)
        msg(x(w.Youremove,sobj))
        msg(x(w.Youputon,sobj,dobj))
        return showAll()
      }
      var sloc=getobj(sobj.loc)
      remove(sloc.objects,sobj.id)
      dobj.add(sobj)
      msg(x(w.Youtake,sobj,sloc))
      msg(x(w.Youputon,sobj,dobj))
      return showAll()
    default:
      return msg(x(w.Cantdo))
  }
}

function clickon(ev){
  if(ev.target.className=='action'){
    var words=ev.target.id.split(' ')
    return perform(words[0],words[1],words[2])
  }
  var obj=getobj(ev.target.id)
  switch(obj.type){
    case 'exit':
      return gothrough(obj)
    default:
      return examine(obj)
  }
}
function gothrough(obj){
  if(!isvisible(obj))
    return msg(x(w.Cantseeexit,obj))
  var oldloc=world.loc
  world.loc=obj.roomto
  var room=getobj(world.loc)
  if(oldloc.charAt(0)!="@")
    msg(x(w.Yougoto,room))
  showAll()
}
function examine(obj){
  if(!isvisible(obj))
    return msg(x(w.Cantsee,obj))
  var str=mark(x(obj.desc?obj.desc:w.Nospecial,obj))
  str+=suggestactions(obj)
  if(obj.objects&&obj.objects.length>0)
    if(obj.type!='container'||obj.transparent||!obj.closed)
      str+="<br>"+(
        obj.type=="supporter"||obj.type=="mount"?
        onyousee:inyousee
      )(obj)
  msg(str)
}
function suggestactions(obj){
  var actions=[]
  switch(obj.type){
    case "container":
      if(obj.closable)
        actions.push(obj.closed?"open":"close")
    case "supporter":
    case "thing":
      if(!obj.scenery||!obj.fixedinplace){
        if(obj.loc=="@carried")
          actions.push('drop')
        else if(obj.loc!="@worn")
          actions.push('take')
        if(obj.wearable)
          if(obj.loc=="@worn")
            actions.push('remove')
          else
            actions.push('wear')
      }
      break
  }
  return actions.length>0?"<br>"+x(w.Youcando,actions,obj):""
}
function perform(action,id,id2){
  switch(action){
    case 'take':
      return dragndrop(id,'@carried')
    case 'wear':
      return dragndrop(id,'@worn')
    case 'drop':
      return dragndrop(id,getroom().id)
    case 'remove':
      return dragndrop(id,'@carried')
    case 'open':
      return doopen(id)
    case 'close':
      return doclose(id)
  }
}
function doopen(id){
  var obj=getobj(id)
  if(!obj.closed)
    return msg(x(w.Alreadyopen,obj))
  if(!obj.closable)
    return msg(x(w.Cantopen,obj))
  obj.closed=false
  msg(x(obj.transparent?w.Youopen:w.Youopenrevealing,obj,obj.objects))
}
function doclose(id){
  var obj=getobj(id)
  if(obj.closed)
    return msg(x(w.Alreadyclosed,obj))
  if(!obj.closable)
    return msg(x(w.Cantclose,obj))
  obj.closed=true
  msg(x(w.Youclose,obj))
}

function showRoom(){
  var room=getroom()
  var str='<h2 id="'+room.id+'" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+cap(x(room.name))+'</h2>'
    +mark(x(room.desc))
  if(room.objects.length>0)
    str+="<p>"+yousee(room)
  str+="<p>"+(room.id.charAt(0)=='@'?menulist(room.exits):listexits(room))
  inner('$room',str)
}
function showInventory(){
  var str='<h2 id="@inventory" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+x(w.Inventory)+"</h2>"
  if(world.carried.length>0)
    str+="<p>"+youcarry()
  else
    str+=x(w.Youcarrynothing)
  if(world.worn.length>0)
    str+="<p>"+youwear()
  inner('$inventory',str)
}
function showAll(){
  showRoom()
  showInventory()
}

function restart(){
  alert("Not implemented yet")
}

window.onload=function(){
  for(var ct=1;ct<=9;ct++){
    var el=document.createElement("li")
    el.id="$msg"+ct
    getel("$msg").appendChild(el)
  }
  showAll()
}

//tutorial

var r=new room('@help')
r.name="tutorial room"
r.addname('it','stanza del tutorial')
r.itfemminile=true
r.desc="Click on the highlighted words to examine them.<br>Drag and drop them to move the objects around.<br>You can drop them also on 'Inventory' or the room name."
r.adddesc('it',"Clicca le parole evidenziate per esaminarle.<br>Trascinale per spostare gli oggetti corrispondenti.<br>Puoi anche rilasciarle su 'Inventario' o sulla stanza.")
var t=new thing('@help-cube')
t.name="cube"
t.addname('it','cubo')
t.desc="A small {@help-cube}. <i>Drag it on the inventory or on other objects.</i>"
t.adddesc('it',"Una piccolo {@help-cube}. <i>Trascinalo sull'inventario o su altri oggetti.</i>")
r.add(t)
t=new thing('@help-hat')
t.name="hat"
t.addname('it','cappello')
t.wearable=true
t.desc= "A {@help-hat}. <i>Drag it twice on the inventory to wear it.</i>"
t.adddesc('it',"Un {@help-hat}. <i>Trascinalo due volte sull'inventario per indossarlo.</i>")
r.add(t)
t=new supporter('@help-table')
t.name="table"
t.addname('it','tavolo')
t.desc= "A {@help-table}. <i>Drag objects on it.</i>"
t.adddesc('it',"Un {@help-table}. <i>Trascina oggetti su di esso.</i>")
r.add(t)
t=new container('@help-box')
t.name="box"
t.addname('it','scatola')
t.desc="An open {@help-box}. <i>Drag objects on it.</i>"
t.adddesc('it',"Una {@help-box} aperta. <i>Trascina oggetti su di essa.</i>")
t.closed=false
t.openable=false
t.itfemminile=true
r.add(t)
t=new exit("@help-exit")
t.name='Back to the game'
t.addname("it","Torna al gioco")
t.roomto='@intro'
r.addexit(t)