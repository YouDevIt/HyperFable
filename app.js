
//// utilities

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

//// multi-language

const langdef='en'
var langtag='en'

function changelang(code){
  if(langtag==code)
    return msg(x(w.Langalready))
  langtag=code
  flagtoggle('$en')
  flagtoggle('$it')
  getel("$savefile").innerHTML=x(w.SAVEFILE)
  getel("$loadfile").innerHTML=x(w.LOADFILE)
  getel("$save").innerHTML=x(w.SAVE)
  getel("$restore").innerHTML=x(w.RESTORE)
  getel("$restart").innerHTML=x(w.RESTART)
  showAll()
  msg(x(w.Langchanged))
}
function flagtoggle(el){
  var flag=getel(el)
  flag.classList.toggle('flag-norm')
  flag.classList.toggle('flag-high')
}

function x(sentence,obj1,obj2,dec1,dec2){
  if(isString(sentence))
    return decode(langtag,sentence,obj1,obj2,dec1,dec2)
  var lan=langtag
  var ret=sentence[lan]
  if(!ret){
    lan=langdef 
    ret=sentence[lan]
  }
  return decode(lan,ret,obj1,obj2,dec1,dec2)
}
function decode(lan,txt,obj1,obj2,dec1,dec2){
  txt=txt.replaceAll(/\[arg\.([^\]]+)\]/g,function(match,p1){
    return x(obj1[p1]||"",obj1,null,dec1,dec2)
  })
  txt=txt.replaceAll(/\[arg2\.([^\]]+)\]/g,function(match,p1){
    return x(obj2[p1]||"",obj2,null,dec1,dec2)
  })
  txt=txt.replaceAll(/\[([^\]]+)\]/g,function(match,p1){
    switch(lan){
      case 'en':
        return decode_en(p1,obj1,obj2,dec1,dec2)
      case 'it':
        return decode_it(p1,obj1,obj2,dec1,dec2)
      default:
        return p1
    }
  })
  return txt
}

// english transform rules

function decode_en(p1,obj1,obj2,dec1,dec2){
  var o=obj1
  var dec=dec1
  if(p1.charAt(p1.length-1)=='2'){
    p1=p1.substring(0,p1.length-1)
    o=obj2
    dec=dec2
  }
  switch(p1){
    case 'The object':
      return cap(en.detart(o))+innerobject(o,dec)
    case 'the object':
      return en.detart(o)+innerobject(o,dec)
    case 'an object':
      return en.indart(o)+innerobject(o,dec)
    case 'object':
      return innerobject(o,dec)
    case 'is':
      return o.en_plural?'are':'is'
    case 'a list of objects':
      return alistobjs(o,dec2)
    case 'a list of objects no scenery':
      return alistobjsnoscenery(o,dec)
    case 'list of objects':
      return listobjs(o,dec)
    case "list of actions":
      return listactions(obj1,obj2)
    case 'it':
      return o.en_plural?'them':o.en_male?'him':o.en_female?'her':'it'
    case 'open or closed':
      return o.closed?'closed':'open'
    case 'on or off':
      return o.switchedon?'switched on':'switched off'
    case 'in':
      return isContainer(o)||isRoom(o)?'in':'on'
    case 'In':
      return isContainer(o)||isRoom(o)?'In':'On'
    case 'enter':
      return isContainer(o)?'enter':(o.seatable?'sit on':(o.climbable?'climb':'get on'))
    case 'exit':
      return isContainer(o)?'exit':(o.climbable?'descend':'get off')
    default:
      return p1
  }
}

// italian transform rules

function decode_it(p1,obj1,obj2,dec1,dec2){
  var o=obj1
  var dec=dec1
  if(p1.charAt(p1.length-1)=='2'){
    p1=p1.substring(0,p1.length-1)
    o=obj2
    dec=dec2
  }
  switch(p1){
    case "L'oggetto":
      return cap(it.artdet(o))+innerobject(o,dec)
    case "l'oggetto":
      return it.artdet(o)+innerobject(o,dec)
    case "nell'oggetto":
      return it.prepin(o)+innerobject(o,dec)
    case "sull'oggetto":
      return it.prepsu(o)+innerobject(o,dec)
    case "Sull'oggetto":
      return cap(it.prepsu(o))+innerobject(o,dec)
    case "dall'oggetto":
      return it.prepda(o)+innerobject(o,dec)
    case "un oggetto":
      return it.artind(o)+innerobject(o,dec)
    case "oggetto":
      return innerobject(o,dec)
    case "una lista di oggetti":
      return alistobjs(o,dec)
    case "una lista di oggetti non scenici":
      return alistobjsnoscenery(o,dec)
    case "lista di oggetti":
      return listobjs(o,dec)
    case "lista di azioni":
      return listactions(obj1,obj2)
    case 'è':
      return o.it_plurale?'sono':'è'
    case 'o':
      return o.it_femminile?(o.it_plurale?'e':'a'):(o.it_plurale?'i':'o')
    case 'by':
      return 'di'
    case 'aperto o chiuso':
      return o.closed?'chius'+decode_it('o',o):'apert'+decode_it('o',o)
    case 'acceso o spento':
      return o.switchedon?'acces'+decode_it('o',o):'spent'+decode_it('o',o)
    case 'in/su oggetto':
      return (isContainer(o)||isRoom(o)?it.prepin:it.prepsu)(o)+innerobject(o,dec)
    case 'In/su oggetto':
      return cap((isContainer(o)||isRoom(o)?it.prepin:it.prepsu)(o))+innerobject(o,dec)
    case 'entrare':
      return isContainer(o)?'entrare':(o.seatable?'sederti':'salire')
    case 'entrarci':
      return isContainer(o)?'entrarci':(o.seatable?'sedertici':'salirci')
    case 'uscire':
      return isContainer(o)?'uscire':'scendere'
    case 'uscirne':
      return isContainer(o)?'uscirne':'scenderne'
    case 'Sei entrato':
      return isContainer(o)?'Sei entrato':(o.seatable?'Ti sei seduto':'Sei salito')
    case 'entrato':
      return isContainer(o)?'entrato':(o.seatable?'seduto':'salito')
    case 'uscito':
      return isContainer(o)?'uscito':'sceso'
    default:
      return p1
  }
}

// sentences

var w={
  Langchanged:{
    en:"Now the story is in English.",
    it:"Ora la storia è in italiano.",
  },
  Langalready:{
    en:"The story is already in English.",
    it:"La storia è già in italiano.",
  },
  Done:{en:"Task completed.",it:"Compito completato."},
  Error:{en:"An error has occurred.",it:"Si è verificato un errore."},
  saved:{en:"saved",it:"salvato"},
  loaded:{en:"loaded",it:"caricato"},
  Insertsave:{en:"Save name?",it:"Nome del salvataggio?"},
  Insertload:{en:"Load name?",it:"Nome del caricamento?"},
  Insertfile:{en:"Insert the filename:",it:"Nome del file?"},
  by:{en:"by ",it:"di "},
  Nothingtodo:{en:"Nothing to do.",it:"Niente da fare."},
  Youcando:{en:"(You can [list of actions])",it:"(Puoi [lista di azioni])"},
  Cantdo:{en:"You can't do that.",it:"Non puoi farlo."},
  Cantmovedirto:{
    en:"You can't move directly to [the object].",
    it:"Non puoi spostarti direttamente verso [l'oggetto].",
  },
  Cantputon:{
    en:"You can't put [the object] on [the object2].",
    it:"Non puoi mettere [l'oggetto] [sull'oggetto2]."
  },
  Cantputonself:{
    en:"You can't put [the object] on [it]self.",
    it:"Non puoi mettere [l'oggetto] su se stess[o]."
  },
  Cantsee:{
    en:"Here you can't see [the object].",
    it:"Qui non vedi [l'oggetto]."
  },
  Cantreach:{
    en:"From here you can't reach [the object].",
    it:"Da qui non puoi raggiungere [l'oggetto]."
  },
  Cantseethat:{
    en:"Here you can see nothing like that.",
    it:"Qui non vedi nulla di simile."
  },
  Cantseeexit:{
    en:"Here you can't see the exit [object].",
    it:"Qui non vedi l'uscita [oggetto]."
  },
  Cantreachexit:{
    en:"From here you can't go to the exit [object] because you are [in2] [the object2].",
    it:"Da qui non puoi andare a [oggetto] perché sei [in/su oggetto2]."
  },
  Canttake:{
    en:"You can't take [the object].",
    it:"Non puoi prendere [l'oggetto]."
  },
  Dontcarry:{
    en:"You don't carry [the object].",
    it:"Non hai [l'oggetto]."
  },
  Alreadycarry:{
    en:"You already carry [the object].",
    it:"Porti già [l'oggetto]."
  },
  Alreadyin:{
    en:"[The object] [is] already [in2] [the object2].",
    it:"[L'oggetto] [è] già [in/su oggetto2]."
  },
  Alreadyswitched:{
    en:"[The object] [is] already [on or off].",
    it:"[L'oggetto] [è] già [acceso o spento]."
  },
  Cantswitchon:{
    en:"You can't switch on [the object].",
    it:"Non puoi accendere [l'oggetto]."
  },
  Cantswitchoff:{
    en:"You can't switch off [the object].",
    it:"Non puoi spegnere [l'oggetto]."
  },
  Cantread:{
    en:"You can't read [the object].",
    it:"Non puoi leggere [l'oggetto]."
  },
  Canteat:{
    en:"You can't eat [the object].",
    it:"Non puoi mangiare [l'oggetto]."
  },
  Cantpush:{
    en:"You can't push [the object].",
    it:"Non puoi spingere [l'oggetto]."
  },
  Cantpushto:{
    en:"You can't push [the object] to [object2].",
    it:"Non puoi spingere [l'oggetto] a [oggetto2]."
  },
  Cantwear:{
    en:"You can't wear [the object].",
    it:"Non puoi indossare [l'oggetto]."
  },
  Dontwear:{
    en:"You don't wear [the object].",
    it:"Non indossi [l'oggetto]."
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
    en:"Here you can see [a list of objects no scenery].",
    it:"Qui puoi vedere [una lista di oggetti non scenici]."
  },
  Exits:{
    en:"Visible exits: [list of objects].",
    it:"Uscite visibili: [lista di oggetti]."
  },
  Inseeing:{
    en:"[In] [the object] you see [a list of objects2].",
    it:"[In/su oggetto] vedi [una lista di oggetti2]."
  },
  Carring:{
    en:"You carry [a list of objects].",
    it:"Porti [una lista di oggetti].",
  },
  Carringand:{
    en:"You carry [a list of objects]",
    it:"Porti [una lista di oggetti]",
  },
  Wearing:{
    en:"You wear [a list of objects].",
    it:"Indossi [una lista di oggetti]."
  },
  andwearing:{
    en:" and you wear [a list of objects].",
    it:" e indossi [una lista di oggetti]."
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
  Youput:{
    en:"You put [the object] [in2] [the object2].",
    it:"Hai messo [l'oggetto] [in/su oggetto2].",
  },
  Youdrop:{
    en:"You drop [the object] [in2] [the object2].",
    it:"Hai lasciato [l'oggetto] [in/su oggetto2].",
  },
  Youeat:{
    en:"You eat [the object].",
    it:"Hai mangiato [l'oggetto]."
  },
  Youpushto:{
    en:"You push [the object] to [object2].",
    it:"Hai spinto [l'oggetto] a [oggetto2]."
  },
  Youswitchon:{
    en:"You switch on [the object].",
    it:"Hai acceso [l'oggetto]."
  },
  Youswitchoff:{
    en:"You switch off [the object].",
    it:"Hai spento [l'oggetto]."
  },
  Youread:{
    en:"On [the object] you read:<br>",
    it:"[Sull'oggetto] leggi:<br>"
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
  SAVEFILE:{en:"SAVE FILE",it:"SALVA FILE"},
  LOADFILE:{en:"&nbsp;LOAD FILE&nbsp;",it:"&nbsp;CARICA FILE&nbsp;"},
  SAVE:{en:"SAVE",it:"SALVA"},
  RESTART:{en:"RESTART",it:"RICOMINCIA"},
  RESTORE:{en:"RESTORE",it:"RIPRISTINA"},
  take:{en:"take [it]",it:"prenderl[o]"},
  drop:{en:"drop [it]",it:"lasciarl[o]"},
  wear:{en:"wear [it]",it:"indossarl[o]"},
  eat:{en:"eat [it]",it:"mangiarl[o]"},
  read:{en:"read [it]",it:"leggerl[o]"},
  switchon:{en:"switch on [it]",it:"accenderl[o]"},
  switchoff:{en:"switch off [it]",it:"spegnerl[o]"},
  remove:{en:"remove [it]",it:"toglierl[o]"},
  open:{en:"open [it]",it:"aprirl[o]"},
  Alreadyopenclosed:{
    en:"[The object] [is] already [open or closed].",
    it:"[L'oggetto] [è] già [aperto o chiuso]"
  },
  onoroff:{en:"[on or off]",it:"[acceso o spento]"},
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
  enter:{en:"[enter] [it]",it:"[entrarci]"},
  climb:{en:"[enter] [it]",it:"[entrarci]"},
  sit:{en:"[enter] [it]",it:"[entrarci]"},
  Youalreadyin:{
    en:"You are already [in] [the object].",
    it:"Sei già [in/su oggetto]."
  },
  Youenter:{
    en:"You [enter] [the object].",
    it:"[Sei entrato] [in/su oggetto]."
  },
  Alreadyenter:{
    en:"You already [enter] [the object].",
    it:"Sei già [entrato] [in/su oggetto]."
  },
  Cantenter:{
    en:"You can't [enter] [the object].",
    it:"Non puoi [entrare] [in/su oggetto]."
  },
  Cantgeton:{
    en:"You can't get on [the object].",
    it:"Non puoi salire [sull'oggetto]."
  },
  Arenotout:{
    en:"You are not out of [the object].",
    it:"Non sei fuori [dall'oggetto]."
  },
  exit:{en:"[exit] [it]",it:"[uscirne]"},
  descend:{en:"[exit] [it]",it:"[uscirne]"},
  Youexit:{
    en:"You [exit] [the object].",
    it:"Sei [uscito] [dall'oggetto]."
  },
  Arein:{
    en:"You are [in] [the object].",
    it:"Non sei [in/su oggetto]."
  },
  Arenotin:{
    en:"You are not in [the object].",
    it:"Non sei [nell'oggetto]."
  },
  Arenoton:{
    en:"You are not on [the object].",
    it:"Non sei [sull'oggetto]."
  },
  Cantexit:{
    en:"You can't [exit] [the object].",
    it:"Non puoi [uscire] [dall'oggetto]."
  },
  Cantenterheld:{
    en:"You can't [enter] [the object] because you hold [it].",
    it:"Non puoi [entrare] [in/su oggetto] perché l[o] reggi in mano."
  },
  Cantenterworn:{
    en:"You can't [enter] [the object] because you wear [it].",
    it:"Non puoi [entrare] [in/su oggetto] perché l[o] indossi."
  },
  Cantbecause:{
    en:"You can't because you are [in] [the object].",
    it:"Non puoi perché sei [in/su oggetto]."
  },
  intheobject:{en:"[in] [the object]",it:"[in/su oggetto]"},
}

// english grammar rules

var en={
  detart:function(obj){return obj.proper?"":"the "},
  indart:function(obj){
    if(obj.proper) return ""
    var first=x(obj.name).charAt(0)
    return ("aeiouAEIOU".indexOf(first)>=0)?"an ":"a "
  },
}

// italian grammar rules

var it={
  artnum:function(obj){
    var name=x(obj.name)
    var ch1=name.charAt(0)
    var ch2=name.charAt(1)
    if("aeiouAEIOU".indexOf(ch1)>=0)
      return 0
    else if("zxZX".indexOf(ch1)>=0)
      return 1
    else if("sS".indexOf(ch1)>=0)
      return "aeiouAEIOU".indexOf(ch2)>=0?2:1
    else if("pP".indexOf(ch1)>=0)
      return 's'==ch2?1:2
    else if("gG".indexOf(ch1)>=0)
      return 'n'==ch2?1:2
    else
      return 2
  },
  artdet:function(obj){
    if(obj.proper)
      return ''
    var num=it.artnum(obj)
    if(obj.it_plurale) {
      if(obj.it_femminile)
        return 'le '
      else
        return num==2?'i ':'gli '
    }else{
      if(obj.it_femminile)
        return num==0?"l'":'la '
      else{
        if(num==0)
          return "l'"
        else
          return num==1?'lo ':'il '
      }
    }
  },
  artind:function(obj){
    if(obj.proper)
      return ''
    var num=it.artnum(obj)
    if(obj.it_plurale) {
      if(obj.it_femminile)
        return 'delle '
      else
        return num==2?'dei ':'degli '
    }else{
      if(obj.it_femminile)
        return num==0?"un'":'una '
      else
        return num==0?'un ':'uno '
    }
  },
  prepdi:function(obj){return it.prepart('di',obj)},
  prepa:function(obj){return it.prepart('a',obj)},
  prepda:function(obj){return it.prepart('da',obj)},
  prepin:function(obj){return it.prepart('in',obj)},
  prepsu:function(obj){return it.prepart('su',obj)},
  prepart:function(prep,obj){
    if(obj.proper)
      return prep+' '
    var num=it.artnum(obj)
    var str=(prep=='di'?'de':(prep=='in'?'ne':prep))
    if(obj.itplurale) {
      if(obj.itfemminile)
        return str+='lle '
      else
        return str+=num==2?'i ':'gli '
    }else{
      if(obj.it_femminile)
        return str+=num==0?"ll'":'lla '
      else{
        if(num==0)
          return str+="ll'"
        else
          return str+=num==1?'llo ':'l '
      }
    }
  },
}

//// world model

var worlds={}

function World(id){
  this.loc='@intro'
  this.objects={'@offstage':{id:'@offstage',type:'room',loc:'@offstage',name:'void',objects:[]}}
  this.offstage=[]
  this.carried=[]
  this.worn=[]
  worlds[id]=this
}

var world=new World('@world')

function Intro(){
  Room.call(this,'@intro')
  this.name="Untitled"
  this.author="Anonymous"
  this.email=""
  this.subtitle=""
  this.blurb=""
  this.IFID=""
  this.release=""
  this.date=""
  this.code=""
  this.desc="[arg.subtitle] [by] <a href='mailto:[arg.email]'>[arg.author]</a><p>Release [arg.release] / [arg.date] / HyperFable 1.0"
}

function Object(id,type){
  this.id=id
  world.objects[id]=this
  this.type=type||'object'
  this.name=id
  this.desc=w.Nospecial
  this.loc='@offstage'
}
function addProp(obj,prop,newlang,newprop){
  if(isString(obj[prop])){
    var temp=obj[prop]
    obj[prop]={}
    obj[prop][langdef]=temp
  }
  obj[prop][newlang]=newprop
}
function addName(obj,newlang,newname){
  addProp(obj,'name',newlang,newname)
}
function addDesc(obj,newlang,newdesc){
  addProp(obj,'desc',newlang,newdesc)
}

function Group(id,type){
  Object.call(this,id,type||'group')
  this.objects=[]
  this.refuses=[]
}
function addObj(group,obj){
  group.objects.push(obj.id)
  obj.loc=group.id
}

function Person(id){
  Group.call(this,id,'person')
  this.wears=[]
}
function isPerson(obj){return obj.type=='person'}

function Room(id){
  Group.call(this,id,'room')
  this.fixedinplace=true
  this.exits=[]
  this.loc=null
}
function isRoom(obj){return obj.type=='room'}

function Exit(id,room,roomto,type){
  Object.call(this,id,type||'exit')
  this.roomto=roomto||'@offstage'
  room.exits.push(this.id)
  this.loc=room.id
}
function isExit(obj){return obj.type=='exit'}

function Portal(id,room,roomto,worldto){
  Exit.call(this,id,room,roomto,'portal')
  this.worldto=worldto||'@world'
}
function isPortal(obj){return obj.type=='portal'}

function Thing(id){
  Object.call(this,id,'thing')
}
function isThing(obj){return obj.type=='thing'}

function Container(id){
  Group.call(this,id,'container')
  this.keys=[]
}

function Vehicle(id){
  Container.call(this,id,'vehicle')
  this.enterable=true
}

function isContainer(obj){
  var type=obj.type
  return type=='container'||type=='vehicle'
}
function isVehicle(obj){return obj.type=='vehicle'}

function Supporter(id){
  Group.call(this,id,'supporter')
}

function Mount(id){
  Supporter.call(this,id,'mount')
}

function isSupporter(obj){
  var type=obj.type
  return type=='supporter'||type=='mount'
}
function isMount(obj){return obj.type=='mount'}

function Topic(id){
  Object.call(this,id,'topic')
}
function isTopic(obj){return obj.type='topic'}

function isFixed(obj){return obj.scenery||obj.fixedinplace}
function isMovable(obj){
  return ['thing','container','supporter'].indexOf(obj.type)>=0&&!isFixed(obj)
}

function getObj(id){
  return world.objects[id]
}
function getRoom(){
  var oloc=getObj(world.loc)
  while(oloc&&!isRoom(oloc))
    oloc=getObj(oloc.loc)
  return oloc
}

// savings

var TRAILER="HyFa-"
var lastSave="SAVE1"

function saveWorld(filename){
  if(!filename){
    filename=window.prompt(x(w.Insertsave),lastSave)
    if(!filename)
      return msg(x(w.Error))
  }
  var trailer=worlds['@world'].objects['@intro'].code||TRAILER
  window.localStorage.setItem(trailer+filename,JSON.stringify(worlds['@world']))
  if(filename.charAt(0)!='$')
    msg('"'+filename+'" '+x(w.saved)+'.')
}
function loadWorld(filename){
  var trailer=worlds['@world'].objects['@intro'].code||TRAILER
  if(!filename) {
    var str=x(w.Insertload)+" < "
    var list=""
    for(var key in window.localStorage)
      if(key.substring(0,trailer.length)==trailer && key.charAt(trailer.length)!='$')
        list+=(lastSave=key.substring(trailer.length))+" "
    if(list=="")
      return msg(x(w.Error))
    str+=list+">"
    filename=window.prompt(str,lastSave||"")
    if(!filename)
      return msg(x(w.Error))
  }
  var loaded=window.localStorage.getItem(trailer+filename)
  if(!loaded)
    return msg(x(w.Error))
  world=worlds['@world']=JSON.parse(loaded)
  showAll()
  if(filename.charAt(0)!='$')
    msg('"'+filename+'" '+x(w.loaded)+'.')
}

//// html

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

function innerobject(obj,dec) {
  var id=obj.id
  var type=obj.type
  var name=x(obj.name)
  var effect=type
  if(type!='room'&&dec)
      effect+=' dec'+(isMovable(obj)?' hvr-buzz-out':' hvr-radial-out')
  return '<span class="'+effect+'" id="'+id
    +'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" onclick="clickon(event)">'
    +name+'</span>'
}
function inneraction(actionid,obj){
  return '<span class="action" id="'+actionid+' '+obj.id+'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" onclick="clickon(event)">'+x(w[actionid],obj)+'</span>'
}

function mark(text,dec){
  text=text.replaceAll(/{([^}]+)}/g,function(match,p1){
    var obj=world.objects[p1]
    return innerobject(obj,dec);
  })
  return text
}

// sentences

function yousee(room,dec){
  return x(w.Seeing,room.objects,null,dec,dec)
}
function listexits(room,dec){
  return x(w.Exits,room.exits,null,dec)
}
function inyousee(obj,dec1,dec2){
  return x(w.Inseeing,obj,obj.objects,dec1,dec2)
}
function youcarry(dec){
  return x(w.Carring,world.carried,null,dec,dec)
}
function youcarryand(dec){
  return x(w.Carringand,world.carried,null,dec,dec)
}
function andyouwear(dec){
  return x(w.andwearing,world.worn,null,dec,dec)
}
function youwear(dec){
  return x(w.Wearing,world.worn,null,dec,dec)
}
function youcarryandwear(dec){
  if(world.carried.length>0)
    return youcarryand(dec)+(world.worn.length>0?andyouwear(dec):'.')
  if(world.worn.length>0)
    return youwear(dec)
  return x(w.Youcarrynothing)
}

function menulist(array,dec){
  var ret=''
  for(const item of array)
    ret+=x(w.object,getObj(item),null,dec)+' '
  return ret
}
function listobjs(argarray,dec){
  var array=argarray
  if(array.length==0)
    return x(w.none)
  ret=x(w.object,getObj(array[0]),null,dec)
  if(array.length==1)
    return ret
  for(var ct=1;ct<array.length-1;ct++)
    ret+=', '+x(w.object,getObj(array[ct]),null,dec)
  ret+=x(w.and)+x(w.object,getObj(array[array.length-1]),null,dec)
  return ret
}
function alistobjs(argarray,dec){
  var array=argarray
  if(array.length==0)
    return x(w.nothing)
  ret=x(w.anobject,getObj(array[0]),null,dec)
  if(array.length==1)
    return ret
  for(var ct=1;ct<array.length-1;ct++)
    ret+=", "+x(w.anobject,getObj(array[ct]),null,dec)
  ret+=x(w.and)+x(w.anobject,getObj(array[array.length-1]),null,dec)
  return ret
}
function alistobjsnoscenery(argarray,dec){
  var array=[]
  for(const item of argarray)
    if(!getObj(item).scenery)
      array.push(item)
  if(array.length==0)
    return x(w.nothing)
  ret=x(w.anobject,getObj(array[0]),null,dec)
  if(array.length==1)
    return ret
  for(var ct=1;ct<array.length-1;ct++)
    ret+=", "+x(w.anobject,getObj(array[ct]),null,dec)
  ret+=x(w.and)+x(w.anobject,getObj(array[array.length-1]),null,dec)
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

//// interface

/*
var editMode=false
function changeEditable() {
  editMode=!editMode
  var mod=document.getElementById('$room')
  mod.contentEditable=editMode
  showAll()
}
*/

var darkMode=false
function changeTheme() {
  darkMode=!darkMode
  document.body.classList.toggle('dark-theme')
  localStorage.setItem('HyFa-theme',darkMode?'dark':'light');
}

function download(){
  var filename=window.prompt(x(w.Insertfile),x(getObj('@intro').name)+'.txt')
  if(!filename)
    return msg(x(w.Error))
  var dataStr = "data:text/plain;charset=utf-8,"+encodeURIComponent(JSON.stringify(world))
  var downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute("href", dataStr)
  downloadAnchorNode.setAttribute("download",filename)
  document.body.appendChild(downloadAnchorNode)
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

// drag&drop and click

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

function lookroot(locid){
  while(true){
    if(locid=='@carried'||locid=='@worn')
      locid=world.loc
    var loc=getObj(locid)
    if(isRoom(loc)||(isContainer(loc)&&loc.closed&&!loc.transparent))
      return loc.id
    locid=loc.loc
  }
}
function isinsidevisible(obj){
  var locid=world.loc
  while(locid!=obj.id){
    var loc=getObj(locid)
    if(isRoom(loc)||(isContainer(loc)&&loc.closed&&!loc.transparent))
      return false
    locid=loc.loc
  }
  return true
}
function isvisible(obj){
  return isinsidevisible(obj)||lookroot(isRoom(obj)?obj.id:obj.loc)==lookroot(world.loc)
}
function reachroot(locid){
  while(true){
    if(locid=='@carried'||locid=='@worn')
      locid=world.loc
    var loc=getObj(locid)
    if(isRoom(loc)||(isContainer(loc)&&loc.closed))
      return loc.id
    locid=loc.loc
  }
}
function isinsidereachable(obj){
  var locid=world.loc
  while(locid!=obj.id){
    var loc=getObj(locid)
    if(isRoom(loc)||(isContainer(loc)&&loc.closed))
      return false
    locid=loc.loc
  }
  return true
}
function isreachable(obj){
  return isinsidereachable(obj)||reachroot(isRoom(obj)||imhere(obj)?obj.id:obj.loc)==reachroot(world.loc)
}
function imhere(obj){
  var locid=world.loc
  var roomid=getRoom().id
  while(locid!=roomid){
    if(locid==obj.id)
      return true
    locid=getObj(locid).loc
  }
  return false
}

function dragndrop(source,drain){
  if(source=='@inventory'){
    if(drain=='@inventory')
      return
    var dobj=getObj(drain)
    if(drain==world.loc)
      return msg(x(w.Youalreadyin,dobj))
    if(isRoom(dobj)){
      for(const exitid of getRoom().exits){
        var exit=getObj(exitid)
        if(exit.roomto==drain)
          return gothrough(exit)
      }
      var room=getRoom()
      var cont=getObj(world.loc)
      if(room!=dobj||room.id!=cont.loc)
        return msg(x(w.Cantmovedirto,dobj))
      return doexit(world.loc)
    }
    if(dobj.type=='exit')
      return gothrough(dobj)
    if(dobj.type=='portal')
      return jumpthrough(dobj)
    return moveto(drain)
  }
  var sobj=getObj(source)
  switch(drain){
    case '@inventory':
      var loc=sobj.loc
      if(loc=='@carried')
        return dowear(source)
      if(loc=='@worn')
        return doremove(source)
      return dotake(source)
    case '@carried':
      return dotake(source)
    case '@worn':
      return dowear(source)
    default:
      var dobj=getObj(drain)
      if(dobj.type=='exit'||dobj.type=='portal')
        return dopush(source,drain)
      return doput(source,drain)
  }
}

function clickon(ev){
  if(ev.target.className=='action'){
    var words=ev.target.id.split(' ')
    return perform(words[0],words[1],words[2])
  }
  var obj=getObj(ev.target.id)
  if(!obj)
    return msg(x(w.Cantseethat))
  switch(obj.type){
    case 'portal':
      return jumpthrough(obj)
    case 'exit':
      return gothrough(obj)
    default:
      return examine(obj)
  }
}

// actions

function carry(obj){
  world.carried.push(obj.id)
  obj.loc='@carried'
}
function wear(obj){
  world.worn.push(obj.id)
  obj.loc='@worn'
}

function moveto(id){
  var obj=getObj(id)
  if(!obj.enterable&&!obj.seatable&&!obj.climbable){
    if(isContainer(obj))
      return msg(x(w.Cantenter,obj))
    return msg(x(w.Cantgeton,obj))
  }
  if(obj.loc=='@carried')
    return msg(x(w.Cantenterheld,obj))
  if(obj.loc=='@worn')
    return msg(x(w.Cantenterworn,obj))
  if(world.loc==id)
    return msg(x(w.Youalreadyin,obj))
  if(world.loc==obj.loc)
    return (isContainer(obj)?doenter:doclimb)(id)
  if(getObj(world.loc).loc==obj.loc)
    return (isContainer(obj)?doexit:dodescend)(id)
  return msg(x(w.Cantmovedirto,obj))
}
function jumpthrough(obj){
  if(!isvisible(obj))
    return msg(x(w.Cantseeexit,obj))
  if(!isreachable(obj))
    return msg(x(w.Cantreachexit,obj,getObj(world.loc)))
  var oldloc=world.loc
  world=worlds[obj.worldto]
  world.loc=obj.roomto
  var room=getObj(world.loc)
  if(oldloc.charAt(0)!="@")
    msg(x(w.Yougoto,room))
  getel('$room').classList="animate__animated animate__flipOutX"
  setTimeout(function(){showAll();getel('$room').classList="animate__animated animate__flipInX";},1300)
}
function gothrough(obj){
  if(!isvisible(obj))
    return msg(x(w.Cantseeexit,obj))
  var oloc=getObj(world.loc)
  if(!isreachable(obj))
    return msg(x(w.Cantreachexit,obj,oloc))
  if(oloc.type!='room')
    return msg(x(w.Cantbecause,oloc))
  var oldloc=world.loc
  world.loc=obj.roomto
  var room=getObj(world.loc)
  if(oldloc.charAt(0)!="@")
    msg(x(w.Yougoto,room))
  getel('$room').classList="animate__animated animate__flipOutX"
  setTimeout(function(){showAll();getel('$room').classList="animate__animated animate__flipInX";},1300)
}
function examine(obj){
  if(!isvisible(obj))
    return msg(x(w.Cantsee,obj))
  var str=mark(x(obj.desc||w.Nospecial,obj))
  str+=suggestactions(obj)
  if(obj.objects&&obj.objects.length>0&&(obj.type!='container'||obj.transparent||!obj.closed))
      str+="<br>"+inyousee(obj)
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
      if(!isFixed(obj)){
        if(obj.loc=="@carried")
          actions.push('drop')
        else if(obj.loc!="@worn")
          actions.push('take')
        if(obj.wearable)
          if(obj.loc=="@worn")
            actions.push('remove')
          else
            actions.push('wear')
        if(obj.edible)
          actions.push('eat')
      }
      if(obj.enterable)
        actions.push(obj.id==world.loc?'exit':'enter')
      if(obj.seatable)
        actions.push(obj.id==world.loc?'descend':'sit')
      if(obj.climbable)
        actions.push(obj.id==world.loc?'descend':'climb')
      if(obj.readable)
        actions.push('read')
      if(obj.switchable)
        actions.push(obj.switchedon?'switchoff':'switchon')
      break
  }
  return actions.length>0?"<br>"+x(w.Youcando,actions,obj):""
}

// actions

function perform(action,id,id2){
  switch(action){
    case 'take':
      return dotake(id)
    case 'wear':
      return dowear(id)
    case 'drop':
      return dodrop(id)
    case 'remove':
      return doremove(id)
    case 'open':
      return doopen(id)
    case 'close':
      return doclose(id)
    case 'eat':
      return doeat(id)
    case 'read':
      return doread(id)
    case 'switchon':
      return doswitchon(id)
    case 'switchoff':
      return doswitchoff(id)
    case 'enter':
      return doenter(id)
    case 'climb':
    case 'sit':
      return doclimb(id)
    case 'exit':
      return doexit(id)
    case 'descend':
      return dodescend(id)
  }
}
function doenter(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var obj=getObj(id)
  if(world.loc==id)
    return msg(x(w.Youalreadyin,obj))
  if(!obj.enterable)
    return msg(x(w.Cantenter,obj))
  if(obj.loc=='@carried')
    return msg(x(w.Cantenterheld,obj))
  if(obj.loc=='@worn')
    return msg(x(w.Cantenterworn,obj))
  if(obj.closed)
    return msg(x(w.Cantenter,obj)+' '+x(w.Itsclosed,obj))
  var room=getRoom()
  if(world.loc!=room.id)
    return msg(x(w.Cantbecause,getObj(world.loc)))
  world.loc=id
  msg(x(w.Youenter,obj))
  showAll()
}
function doexit(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var obj=getObj(id)
  if(world.loc!=id)
    return msg(x(w.Arenotin,obj))
  if(obj.closed)
    return msg(x(w.Cantexit,obj)+' '+x(w.Itsclosed,obj))
  world.loc=obj.loc
  msg(x(w.Youexit,obj))
  showAll()
}
function doclimb(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var obj=getObj(id)
  if(world.loc==id)
    return msg(x(w.Youalreadyin,obj))
  if(!obj.climbable&&!obj.seatable)
    return msg(x(w.Cantgeton,obj))
  if(obj.loc=='@carried')
    return msg(x(w.Cantenterheld,obj))
  if(obj.loc=='@worn')
    return msg(x(w.Cantenterworn,obj))
  var room=getRoom()
  if(world.loc!=room.id)
    return msg(x(w.Cantbecause,getObj(world.loc)))
  world.loc=id
  msg(x(w.Youenter,obj))
  showAll()
}
function dodescend(id){
  if(id=='@inventory')
    msg(x(w.Cantdo))
  var obj=getObj(id)
  if(world.loc!=id)
    return msg(x(w.Arenoton,obj))
  world.loc=obj.loc
  msg(x(w.Youexit,obj))
  showAll()
}
function dopush(id,toid){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  if(!isvisible(sobj))
    return msg(x(w.Cantsee,sobj))
  if(!isreachable(sobj))
    return msg(x(w.Cantreach,sobj))
  if(imhere(sobj))
    return msg(x(w.Cantdo)+' '+x(w.Arein,sobj))
  var dobj=getObj(toid)
  if(isFixed(sobj))
    return msg(x(w.Cantpush,sobj))
  if(!sobj.pushable||dobj.type=='portal'||dobj.type!='exit'||!dobj.crossable)
    return msg(x(w.Cantpushto,sobj,dobj))
  var loc=getObj(sobj.loc)
  remove(loc.objects,id)
  sobj.loc=dobj.roomto
  getObj(dobj.roomto).objects.push(id)
  msg(x(w.Youpushto,sobj,dobj))
  return showAll()
}
function dotake(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var sobj=getObj(id)
  if(!isvisible(sobj))
    return msg(x(w.Cantsee,sobj))
  if(!isreachable(sobj))
    return msg(x(w.Cantreach,sobj))
  if(imhere(sobj))
    return msg(x(w.Cantdo)+' '+x(w.Arein,sobj))
  if(isFixed(sobj))
    return msg(x(w.Canttake,sobj))
  var loc=sobj.loc
  if(loc=='@carried')
    return msg(x(w.Alreadycarry,sobj))
  if(loc=='@worn')
    return doremove(id)
  var org=getObj(loc)
  remove(org.objects,sobj.id)
  carry(sobj)
  msg(x(w.Youtake,sobj,org))
  return showAll()
}
function doremove(id){
  var sobj=getObj(id)
  if(sobj.loc!='@worn')
    return msg(x(w.Dontwear,sobj))
  remove(world.worn,sobj.id)
  carry(sobj)
  msg(x(w.Youremove,sobj))
  return showAll()
}
function dowear(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var sobj=getObj(id)
  if(sobj.loc=='@worn')
    return msg(x(w.Alreadywear,sobj))
  if(sobj.loc!='@carried')
    dotake(id)
  if(sobj.loc!='@carried')
    return
  if(!sobj.wearable)
    return msg(x(w.Cantwear,sobj))
  remove(world.carried,sobj.id)
  wear(sobj)
  msg(x(w.Youwear,sobj))
  return showAll()
}
function dodrop(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var sobj=getObj(id)
  if(sobj.loc=='@worn')
    doremove(id)
  var dobj=getObj(world.loc)
  if(!isvisible(dobj))
    return msg(x(w.Cantsee,dobj))
  if(sobj.loc==dobj.id)
    return msg(x(w.Alreadyin,sobj,dobj))
  if(sobj.loc!='@carried')
    dotake(id)
  if(sobj.loc!='@carried')
    return
  remove(world.carried,sobj.id)
  addObj(dobj,sobj)
  msg(x(w.Youdrop,sobj,dobj))
  return showAll()
}
function doput(id,toid){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var dobj=getObj(toid)
  if(!isvisible(dobj))
    return msg(x(w.Cantsee,dobj))
  if(!isreachable(dobj))
    return msg(x(w.Cantreach,dobj))
  var sobj=getObj(id)
  if(imhere(sobj))
    return msg(x(w.Cantdo)+' '+x(w.Arein,sobj))
  if(sobj.loc==dobj.id)
    return msg(x(w.Alreadyin,sobj,dobj))
  if(sobj==dobj)
    return msg(x(w.Cantputonself,sobj))
  if(sobj.loc!='@carried')
    dotake(id)
  if(sobj.loc!='@carried')
    return
  if(!dobj.objects)
    return msg(x(w.Cantputon,sobj,dobj))
  for(const id of dobj.refuses)
    if(
      (id.charAt(0)=='+'&&sobj[id.substring(1)])
      ||(id.charAt(0)=='-'&&!sobj[id.substring(1)])
      ||sobj.id==id
    )
      return msg(x(w.Cantputon,sobj,dobj))
  if(isContainer(dobj)){
    if(dobj.closed)
      return msg(x(w.Cantdo)+' '+x(w.Itsclosed,dobj))
    remove(world.carried,sobj.id)
    addObj(dobj,sobj)
    msg(x(w.Youput,sobj,dobj))
    return showAll()
  }
  if(isRoom(dobj)||isSupporter(dobj)){
    remove(world.carried,sobj.id)
    addObj(dobj,sobj)
    msg(x(w.Youput,sobj,dobj))
    return showAll()
  }
  return msg(x(w.Cantputon,sobj,dobj))
}
function doopen(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var obj=getObj(id)
  if(!isvisible(obj))
    return msg(x(w.Cantsee,obj))
  if(!isreachable(obj))
    return msg(x(w.Cantreach,obj))
  if(!isContainer(obj))
    return msg(x(w.Cantopen,obj))
  if(!obj.closed)
    return msg(x(w.Alreadyopenclosed,obj))
  if(!obj.closable)
    return msg(x(w.Cantopen,obj))
  obj.closed=false
  msg(x(obj.transparent?w.Youopen:w.Youopenrevealing,obj,obj.objects))
  showAll()
}
function doclose(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var obj=getObj(id)
  if(!isvisible(obj))
    return msg(x(w.Cantsee,obj))
  if(!isreachable(obj))
    return msg(x(w.Cantreach,obj))
  if(!isContainer(obj))
    return msg(x(w.Cantclose,obj))
  if(obj.closed)
    return msg(x(w.Alreadyopenclosed,obj))
  if(!obj.closable)
    return msg(x(w.Cantclose,obj))
  obj.closed=true
  msg(x(w.Youclose,obj))
  showAll()
}
function doeat(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var obj=getObj(id)
  if(obj.loc!='@carried')
    dotake(id)
  if(obj.loc!='@carried')
    return
  if(!obj.edible)
    return msg(x(w.Canteat,obj))
  remove(world.carried,id)
  world.offstage.push(id)
  obj.loc='@offstage'
  msg(x(w.Youeat,obj))
  showAll()
}
function doread(id){
  if(id=='@inventory')
    msg(x(w.Cantdo))
  var obj=getObj(id)
  if(!isvisible(obj))
    return msg(x(w.Cantsee,obj))
  if(!obj.readable)
    return msg(x(w.Cantread,obj))
  msg(x(w.Youread,obj)+x(obj.text))
}
function doswitchon(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var obj=getObj(id)
  if(!isvisible(obj))
    return msg(x(w.Cantsee,obj))
  if(!obj.switchable)
    return msg(x(w.Cantswitchon,obj))
  if(obj.switchedon)
    return msg(x(w.Alreadyswitched,obj))
  obj.switchedon=true
  msg(x(w.Youswitchon,obj))
}
function doswitchoff(id){
  if(id=='@inventory')
    return msg(x(w.Cantdo))
  var obj=getObj(id)
  if(!isvisible(obj))
    return msg(x(w.Cantsee,obj))
  if(!obj.switchable)
    return msg(x(w.Cantswitchoff,obj))
  if(!obj.switchedon)
    return msg(x(w.Alreadyswitched,obj))
  obj.switchedon=false
  msg(x(w.Youswitchoff,obj))
}

// show

function showRoom(){
  var room=getRoom()
  var title=cap(x(room.name))
  if(world.loc!=room.id)
    title+=' ('+x(w.intheobject,getObj(world.loc))+')'
  var str='<h2 id="'+room.id+'" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+title+'</h2><p>'
  if(isvisible(room)){
    str+=mark(x(room.desc,room),true)
    if(room.objects.length>0){
      var empty=true
      for(const id of room.objects)
        if(!getObj(id).scenery){
          empty=false
          break
        }
      if(!empty)
        str+='<p>'+yousee(room,true)
    }
  }
  for(const id of room.objects){
    var obj=getObj(id)
    if(isvisible(obj)){
      if(obj.objects&&obj.objects.length>0&&(obj.type!='container'||obj.transparent||!obj.closed||isinsidevisible(obj)))
        str+="<p>"+inyousee(obj,obj.closed,true)
    }
  }
if(isvisible(room))
    str+='<p>'+(room.id.charAt(0)=='@'?menulist(room.exits,true):listexits(room,true))
  inner('$room',str)
}
function showInventory(){
  var str='<h3 id="@inventory" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'+x(w.Inventory)+"</h3>"
  str+=youcarryandwear(true)
  for(const id of world.carried){
    var obj=getObj(id)
    if(obj.objects&&obj.objects.length>0&&(obj.type!='container'||obj.transparent||!obj.closed))
      str+="<p>"+inyousee(obj,false,true)
  }
  for(const id of world.worn){
    var obj=getObj(id)
    if(obj.objects&&obj.objects.length>0&&(obj.type!='container'||obj.transparent||!obj.closed))
      str+="<p>"+inyousee(obj,false,true)
  }
  inner('$inventory',str)
}
function showAll(){
  showRoom()
  showInventory()
}

function restart(){
  loadWorld('$START')
  msg(x(w.RESTART))
  showAll()
}

window.onload=function(){
  darkMode=false
  const currentTheme=localStorage.getItem("HyFa-theme")
  if(currentTheme=="dark"){
    document.body.classList.add("dark-theme");
    getel("themecheckbox").checked=true
    darkMode=true
  }
  for(var ct=1;ct<=9;ct++){
    var el=document.createElement("li")
    el.id="$msg"+ct
    getel("$msg").appendChild(el)
  }
  saveWorld('$START')
  showAll()
}

function loadfile(ev) {
  var file=ev.target.files[0]
  var reader=new FileReader()
  reader.onload=function(){
    try {
      world=JSON.parse(reader.result)
      showAll()
      msg(x(w.Done))
    } catch (e) {
      msg(x(w.Error))
    }
  }
  reader.readAsText(file)
}

//// help

world=new World('@world-help')

var r=new Room('@help')
r.name={en:"tutorial room",it:"stanza del tutorial"}
r.it_femminile=true
r.desc={
en:
`This story was created using <b><a href='https://github.com/YouDevIt/HyperFable'>HyperFable</a></b>,
an <i>HTML5</i> interface for <i>Interactive Fiction</i> works, written by
<a href='mailto:leonardo.boselli@youdev.it'>Leonardo Boselli</a>.
<p>The main actions to play are:<ul><li>Click on the highlighted words to perform the default action,
i.e. to examine the corresponding objects, move through an exit, etc.</li><li>Drag and drop the words
to move the objects around, apply actions, and so on.<br>You can even drag verbs and drop words on
'Inventory', or the room name. Try different combinations!</li></ul>`
,it:
`Questa storia è stata creata con <b><a href='https://github.com/YouDevIt/HyperFable'>HyperFable</a></b>,
un'interfaccia <i>HTML5</i> per lavori di <i>Narrativa Interattiva</i> works, scritta da
<a href='mailto:leonardo.boselli@youdev.it'>Leonardo Boselli</a>.
<p>Le principali azione per giocare sono:<ul><li>Clicca sulle parole evidenziate per effettuare l'azione di base,
cioè esaminare gli oggetti corrispondenti, muoverti attraverso un'uscita, ecc.</li><li>Trascina e rilascia
(drag & drop) le parole per cambiare la posizione degli oggetti, applicare azioni e così via.
<br>Puoi anche trascinare verbi e spostare parole su 'Inventario' o sul nome della stanza.
Tenta diverse combinazioni!</li></ul>`
}
var t=new Thing('cube')
addName(t,'it','cubo')
t.desc={
  en:"A small {cube}. <i>Drag it on the inventory or on other objects.</i>",
  it:"Un piccolo {cube}. <i>Trascinalo sull'inventario o su altri oggetti.</i>"
}
addObj(r,t)
var t2=new Supporter('chair')
addName(t2,'it','sedia')
t2.it_femminile=true
t2.desc={en:"A {chair}.",it:"Una {chair}."}
t2.seatable=true
addObj(r,t2)
t2=new Supporter('table')
addName(t2,'it','tavolo')
t2.desc={
  en:"A {table}. <i>Drag objects on it.</i>",
  it:"Un {table}. <i>Trascina oggetti su di esso.</i>"
}
t2.fixedinplace=true
addObj(r,t2)
t=new Thing('apple')
addName(t,'it','mela')
t.it_femminile=true
t.edible=true
t.desc={
  en:"A {apple}. <i>Try to eat it.</i>",
  it:"Una {apple}. <i>Prova a mangiarla.</i>"
}
addObj(t2,t)
t=new Thing('lamp')
addName(t,'it','lampada')
t.it_femminile=true
t.switchable=true
t.desc={en:"A [on or off] {lamp}.",it:"Una {lamp} [acceso o spento]."}
addObj(t2,t)
t=new Container('box')
addName(t,'it','scatola')
t.it_femminile=true
t.desc={
  en:"A small [open or closed] {box}. <i>Drag objects on it.</i>",
  it:"Una piccola {box} [aperto o chiuso]. <i>Trascina oggetti su di essa.</i>"
}
t.closed=false
t.closable=true
addObj(t2,t)
t2=new Supporter('hanger')
addName(t2,'it','attaccapanni')
t2.desc={en:"A {hanger}.",it:"Un {hanger}."}
t2.climbable=true
t2.fixedinplace=true
t2.refuses=['-wearable']
addObj(r,t2)
t=new Thing('hat')
addName(t,'it','cappello')
t.wearable=true
t.desc={
  en:"A {hat}. <i>Drag it twice on 'Inventory' to wear it.</i>",
  it:"Un {hat}. <i>Trascinalo due volte su 'Inventario' per indossarlo.</i>"
}
addObj(t2,t)

t=new Exit("Go to the other room",r,'help-other')
addName(t,"it","Vai all'altra stanza")

t=new Portal("@help-exit",r,'@intro','@world')
t.name={en:'Back to the game',it:'Torna al gioco'}

t=new Portal("About",r,'@about','@world-about')

r=new Room('help-other')
r.name={en:"other room",it:"altra stanza"}
r.it_femminile=true
r.desc={
  en:"This is another room. Go back using a visible exit.",
  it:"Questa è un'altra stanza. Torna indietro usando un'uscita visibile."
}

t=new Container('cage')
t.name={en:"large cage",it:"grande gabbia"}
t.it_femminile=true
t.desc={
  en:"A large [open or closed] {cage}.",
  it:"Una grande {cage} [aperto o chiuso]."
}
t.closed=false
t.closable=true
t.enterable=true
t.transparent=true
t.fixedinplace=true
addObj(r,t)
t=new Container('wardrobe')
addName(t,'it','armadio')
t.desc={
  en:"A large [open or closed] {wardrobe}.",
  it:"Una grande {wardrobe} [aperto o chiuso]."
}
t.closed=true
t.closable=true
t.enterable=true
t.fixedinplace=true
addObj(r,t)

t=new Exit("Exit",r,'@help')
addName(t,"it","Uscita")
t.it_femminile=true

world=worlds['@world']

//// about

world=new World('@world-about')

r=new Room('@about')
r.name="HyperFable"
r.proper=true
r.desc={
en:
`An <i>HTML5</i> interface for <i>Interactive Fiction</i> stories (<a href="https://github.com/YouDevIt/HyperFable">GitHub&nbsp;repository</a>).
<p><b>Copyright &copy 2021 Leonardo Boselli</b>
<ul><li><b>Channels:</b>
<br><a href="https://www.twitch.tv/leobos67"><i>LeoBos67</i></a> on Twitch
<br><a href="https://www.youtube.com/channel/UC9G8z8nxZjynvB77ZRzL-MQ"><i>1001 Avventura</i></a> YouTube channel</li>
<li><b>Social:</b>
<br><a href="https://twitter.com/1001avventura"><i>@1001avventura</i></a> on Twitter
<br><a href="https://web.telegram.org/"><i>@milleunavventura</i></a> on Telegram
<br><a href="https://www.facebook.com/Mille.e.Una.Avventura"><i>Mille.e.Una.Avventura</i></a> on Facebook</li>
<li><b>Contacts:</b>
<br><a href="https://www.youdev.it">Official <i>YouDev.it</i> site</a>
<br><a href="mailto:leonardo.boselli@youdev.it">Leonardo Boselli's email</a></li></ul>`
,it:
`Un'interfaccia <i>HTML5</i> per opere di <i>Narrativa Interattiva</i> (<a href="https://github.com/YouDevIt/HyperFable">GitHub&nbsp;repository</a>).
<p><b>Copyright &copy 2021 Leonardo Boselli</b>
<ul><li><b>Canali:</b>
<br><a href="https://www.twitch.tv/leobos67"><i>LeoBos67</i></a> su Twitch
<br><a href="https://www.youtube.com/channel/UC9G8z8nxZjynvB77ZRzL-MQ"><i>1001 Avventura</i></a> canale YouTube</li>
<li><b>Social:</b>
<br><a href="https://twitter.com/1001avventura"><i>@1001avventura</i></a> su Twitter
<br><a href="https://web.telegram.org/"><i>@milleunavventura</i></a> su Telegram
<br><a href="https://www.facebook.com/Mille.e.Una.Avventura"><i>Mille.e.Una.Avventura</i></a> su Facebook</li>
<li><b>Contatti:</b>
<br><a href="https://www.youdev.it">Sito ufficiale di <i>YouDev.it</i></a>
<br><a href="mailto:leonardo.boselli@youdev.it">Email di Leonardo Boselli</a></li></ul>`}
t=new Thing('license')
addName(t,'it','licenza')
t.it_femminile=true
t.desc={en:"A simple piece of paper.",it:"Un semplice pezzo di carta."}
t.readable=true
const imgcc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAMAAABEF7i9AAAABGdBTUEAANbY1E9YMgAAAJZQTFRF////7u7u3d3dys7KzMzMyMzIxsrGxcbFur+6u7u7s7iyq7GqqqqqmZmZlJmTj5CPiIiIh4eHhoaGgICAfYJ9d3d3cnZxZ2tnZmZmW15bVVVVS0xLREREQ0NDQkJCQUJBOz07OTs5MzMzMTMxLjAuJygnJCUjIiIiISEhICAgGRkZERERDxAPDg4ODQ4NDQ0NDQ0MAAAADbeuvgAAAOJJREFUeNqtk21PAjEQhKdyKjpwFrGIWN8QOPE8cP7/n/PD9YolmhivmzRpJ9un090WyhwQsoYgkCRvZYPkm5IcfPzbXwssGxsP8WtyOO0JfH47uC50R57e9wPuLIpK3nhVBfwrObiSJAAS1A7FKXAAhDYcAW90gWoB52ozHsHtyOF5yEebFfK71W9CB5ypMLLAYgkAriEvz6LD4KPb2+FTAT869PPauDHcPnWo7zdE6vBIiDXcW4xqzY3X8gQPq6SGKfBvNeTLNnOXy89JBD5uMrxDznQdeE/vfX9K7r+cOb4AY2+UGwcd6o0AAAAASUVORK5CYII="
t.text={
en:'<p><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="'+imgcc
  +'" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.',
it:'<p><a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.it"><img alt="Creative Commons License" style="border-width:0" src="'+imgcc
  +'" /></a><br />Quest\'opera è concessa sotto <a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.it">Licenza Internazionale Creative Commons Attribuzione-Non Commerciale-Non opere derivate 4.0</a>.'
}
carry(t)

t=new Portal("@help-exit",r,'@intro','@world')
t.name={en:'Back to the game',it:'Torna al gioco'}

t=new Portal("Help",r,'@help','@world-help')
addName(t,"it","Aiuto")

world=worlds['@world']
