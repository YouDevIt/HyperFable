//// colors

let TRAILER="HyFa-"

let darkMode=false

const defbacklight='#ffc'
const defbackdark='#003'

const background = (id,colors) => getel(id).style.background=
  darkMode?(colors?colors[1]:defbackdark):(colors?colors[0]:defbacklight)

//// utilities

const isString = s => typeof(s)==='string' || s instanceof String

function remove(array,id){
  const idx=array.indexOf(id)
  if(idx<0) return false
  array.splice(idx,1)
  return true
}

//// multi-language

const langdef='en'
let langtag='en'

function refreshmenu(){
  inner('$dark',x(w.DARK))
  inner('$savefile',x(w.SAVEFILE))
  inner('$loadfile',x(w.LOADFILE))
  inner('$restore',x(w.RESTORE))
  inner('$restart',x(w.RESTART))
  inner('$save',x(w.SAVE))
}

function changelang(code){
  if(langtag==code) return msg(x(w.Langalready))
  const oldlangtag=langtag
  langtag=code
  window.localStorage.setItem(TRAILER+'lang',langtag)
  const flags=document.getElementsByClassName("flag")
  for(const flag of flags)
    if(flag.id=='$'+langtag||flag.id=='$'+oldlangtag)
      flagtoggle(flag)
  refreshmenu()
  showAll()
  msg(x(w.Langchanged))
}
const flagtoggle = el => el.classList.toggle('high')

function x(sentence,obj1,obj2,dec1,dec2){
  if(isString(sentence)) return decode(langtag,sentence,obj1,obj2,dec1,dec2)
  let lan=langtag
  let ret=sentence[lan]
  if(!ret) {
    lan=langdef
    ret=sentence[lan]
  }
  return decode(lan,ret,obj1,obj2,dec1,dec2)
}
function decode(lan,txt,obj1,obj2,dec1,dec2){
  txt=txt.replaceAll(/\[arg\.([^\]]+)\]/g,(match,p1)=>{
    return x(obj1[p1]||"",obj1,null,dec1,dec2)
  })
  txt=txt.replaceAll(/\[arg2\.([^\]]+)\]/g,(match,p1)=>{
    return x(obj2[p1]||"",obj2,null,dec1,dec2)
  })
  txt=txt.replaceAll(/\[([^\]]+)\]/g,(match,p1)=>{
    switch(lan){
      case 'en': return decode_en(p1,obj1,obj2,dec1,dec2)
      case 'it': return decode_it(p1,obj1,obj2,dec1,dec2)
      default: return p1
    }
  })
  return txt
}

// english transform rules

function decode_en(p1,obj1,obj2,dec1,dec2){
  let [o,dec]=[obj1,dec1]
  if(p1.charAt(p1.length-1)=='2')
    [p1,o,dec]=[p1.substring(0,p1.length-1),obj2,dec2]
  switch(p1){
    case 'The object': return cap(en.detart(o))+innerobject(o,dec)
    case 'the object': return en.detart(o)+innerobject(o,dec)
    case 'an object': return en.indart(o)+innerobject(o,dec)
    case 'object': return innerobject(o,dec)
    case 'is': return o.plural?'are':'is'
    case 'a list of objects': return listobjs(o,dec,true)
    case 'a list of objects no scenery': return listobjsnoscene(o,dec,true)
    case 'list of objects': return listobjs(o,dec)
    case 'list of actions': return listactions(obj1,obj2)
    case 'list of topics': return listtopics(obj1,obj2)
    case 'it': return o.plural?'them':o.en_male?'him':o.en_female?'her':'it'
    case 'full or empty': return o.objects&&o.objects.length>0?'full':'empty'
    case 'open or closed': return o.closed?'closed':'open'
    case 'on or off': return o.switchedon?'switched on':'switched off'
    case 'in': return isContainer(o)||(isRoom(o)&&!o.onloc)?'in':'on'
    case 'In': return isContainer(o)||(isRoom(o)&&!o.onloc)?'In':'On'
    case 'enter': return isContainer(o)?'enter':(o.seatable?'sit on':(o.climbable?'climb':'get on'))
    case 'exit': return isContainer(o)?'exit':(o.climbable?'descend':'get off')
    case 'hour and minutes': {
      const date=new Date()
      let min=date.getMinutes()
      if(min<10) min='0'+min
      return date.getHours()+':'+min
    }
    default: return p1
  }
}

// italian transform rules

function decode_it(p1,obj1,obj2,dec1,dec2){
  let [o,dec]=[obj1,dec1]
  if(p1.charAt(p1.length-1)=='2')
    [p1,o,dec]=[p1.substring(0,p1.length-1),obj2,dec2]
  switch(p1){
    case "L'oggetto": return cap(it.artdet(o))+innerobject(o,dec)
    case "l'oggetto": return it.artdet(o)+innerobject(o,dec)
    case "nell'oggetto": return it.prepin(o)+innerobject(o,dec)
    case "sull'oggetto": return it.prepsu(o)+innerobject(o,dec)
    case "Sull'oggetto": return cap(it.prepsu(o))+innerobject(o,dec)
    case "dall'oggetto": return it.prepda(o)+innerobject(o,dec)
    case "all'oggetto": return it.prepa(o)+innerobject(o,dec)
    case "un oggetto": return it.artind(o)+innerobject(o,dec)
    case "oggetto": return innerobject(o,dec)
    case "una lista di oggetti": return listobjs(o,dec,true)
    case "una lista di oggetti non scenici": return listobjsnoscene(o,dec,true)
    case "lista di oggetti": return listobjs(o,dec)
    case "lista di azioni": return listactions(obj1,obj2)
    case "lista di argomenti": return listtopics(obj1,obj2)
    case 'è': return o.plural?'sono':'è'
    case 'o': return o.it_femminile?(o.plural?'e':'a'):(o.plural?'i':'o')
    case 'gli': return o.plural?'e loro':(o.it_femminile?'le':'gli')
    case 'by': return 'di'
    case 'pieno o vuoto': return o.objects&&o.objects.length>0?'pien'+decode_it('o',o):'vuot'+decode_it('o',o)
    case 'aperto o chiuso': return o.closed?'chius'+decode_it('o',o):'apert'+decode_it('o',o)
    case 'acceso o spento': return o.switchedon?'acces'+decode_it('o',o):'spent'+decode_it('o',o)
    case 'in/su oggetto': return (isContainer(o)||(isRoom(o)&&!o.onloc)?it.prepin:it.prepsu)(o)+innerobject(o,dec)
    case 'In/su oggetto': return cap((isContainer(o)||(isRoom(o)&&!o.onloc)?it.prepin:it.prepsu)(o))+innerobject(o,dec)
    case 'entrare': return isContainer(o)?'entrare':(o.seatable?'sederti':'salire')
    case 'entrarci': return isContainer(o)?'entrarci':(o.seatable?'sedertici':'salirci')
    case 'uscire': return isContainer(o)?'uscire':'scendere'
    case 'uscirne': return isContainer(o)?'uscirne':'scenderne'
    case 'Sei entrato': return isContainer(o)?'Sei entrato':(o.seatable?'Ti sei seduto':'Sei salito')
    case 'entrato': return isContainer(o)?'entrato':(o.seatable?'seduto':'salito')
    case 'uscito': return isContainer(o)?'uscito':'sceso'
    case 'ora e minuti': {
      const date=new Date()
      let min=date.getMinutes()
      if(min<10) min='0'+min
      return date.getHours()+':'+min
    }
    default: return p1
  }
}

// functions

const action={}
const actions={}

// sentences

const w={
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
  Youcando:{en:"(You could [list of actions])",it:"(Puoi [lista di azioni])"},
  Cantdo:{en:"You can't do that.",it:"Non puoi farlo."},
  Cantmovedirto:{
    en:"You can't move directly to [the object].",
    it:"Non puoi spostarti direttamente verso [l'oggetto].",
  },
  Cantputin:{
    en:"You can't put [the object] [in2] [the object2].",
    it:"Non puoi mettere [l'oggetto] [nell'oggetto2]."
  },
  Cantputonself:{
    en:"You can't put [the object] on [it]self.",
    it:"Non puoi mettere [l'oggetto] su se stess[o]."
  },
  Canseeno:{
    en:"You can see nothing.",
    it:"Non vedi nulla."
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
  Cantdrink:{
    en:"You can't drink [the object].",
    it:"Non puoi bere [l'oggetto]."
  },
  Cantpull:{
    en:"You can't pull [the object].",
    it:"Non puoi tirare [l'oggetto]."
  },
  Cantpush:{
    en:"You can't push [the object].",
    it:"Non puoi spingere [l'oggetto]."
  },
  Cantpushto:{
    en:"You can't push [the object] to the [object2].",
    it:"Non puoi spingere [l'oggetto] verso [l'oggetto2]."
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
  Itslocked:{
    en:"[The object] [is] locked.",
    it:"[L'oggetto] [è] chius[o] a chiave."
  },
  Nospecial:{
    en:"You see nothing special in [the object].",
    it:"Non noti nulla di speciale [nell'oggetto]."},
  character:{en:"yourself",it:"tu in persona"},
  chardesc:{en:"As good-looking as ever.",it:"Piacente come sempre."},
  Yougoto:{
    en:"You go to [the object].",
    it:"Vai verso [l'oggetto]."
  },
  Seeing:{
    en:"Here you can see [a list of objects no scenery].",
    it:"Qui puoi vedere [una lista di oggetti non scenici]."
  },
  Exits:{
    en:"Exits: [list of objects].",
    it:"Uscite: [lista di oggetti]."
  },
  Inseeing:{
    en:"[In] [the object] you see [a list of objects no scenery2].",
    it:"[In/su oggetto] vedi [una lista di oggetti non scenici2]."
  },
  Carring:{
    en:"You carry [a list of objects]",
    it:"Porti [una lista di oggetti]",
  },
  wearing:{
    en:"you wear [a list of objects].",
    it:"indossi [una lista di oggetti]."
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
  Youtakeunder:{
    en:"You take [the object] from under [the object2].",
    it:"Hai preso [l'oggetto] da sotto [l'oggetto2]."
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
  Youdrink:{
    en:"You drink [the object].",
    it:"Hai bevuto [l'oggetto]."
  },
  Youpull:{
    en:"You pull [the object].",
    it:"Hai tirato [l'oggetto].",
  },
  Youpush:{
    en:"You push [the object].",
    it:"Hai spinto [l'oggetto]."
  },
  Youpushto:{
    en:"You push [the object] to the [object2].",
    it:"Hai spinto [l'oggetto] verso [l'oggetto2]."
  },
  Hasfall:{
    en:"[The object] has fall [in2] [the object2].",
    it:"[L'oggetto] è cadut[o] [in/su oggetto2]."
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
  DARK:{en:'DARK',it:'SCURO'},
  SAVEFILE:{en:"SAVE FILE",it:"SALVA FILE"},
  LOADFILE:{en:"&nbsp;LOAD FILE&nbsp;",it:"&nbsp;CARICA FILE&nbsp;"},
  SAVE:{en:"SAVE",it:"SALVA"},
  RESTART:{en:"RESTART",it:"RICOMINCIA"},
  RESTORE:{en:"RESTORE",it:"RIPRISTINA"},
  take:{en:"take [it]",it:"prenderl[o]"},
  drop:{en:"drop [it]",it:"lasciarl[o]"},
  pull:{en:"pull [it]",it:"tirarl[o]"},
  push:{en:"push [it]",it:"spingerl[o]"},
  wear:{en:"wear [it]",it:"indossarl[o]"},
  eat:{en:"eat [it]",it:"mangiarl[o]"},
  drink:{en:"drink [it]",it:"berl[o]"},
  read:{en:"read [it]",it:"leggerl[o]"},
  switchon:{en:"switch on [it]",it:"accenderl[o]"},
  switchoff:{en:"switch off [it]",it:"spegnerl[o]"},
  remove:{en:"remove [it]",it:"toglierl[o]"},
  lookunder:{en:"look under [it]",it:"guardar[gli] sotto"},
  open:{en:"open [it]",it:"aprirl[o]"},
  Alreadyopenclosed:{
    en:"[The object] [is] already [open or closed].",
    it:"[L'oggetto] [è] già [aperto o chiuso]"
  },
  onoroff:{en:"[on or off]",it:"[acceso o spento]"},
  openorclosed:{en:"[open or closed]",it:"[aperto o chiuso]"},
  Youlookunder:{
    en:"You look under [the object] finding [a list of objects2].",
    it:"Hai guardato sotto [l'oggetto] scoprendo [una lista di oggetti2]."
  },
  Youopen:{
    en:"You open [the object].",
    it:"Hai aperto [l'oggetto]."
  },
  Youopenrevealing:{
    en:"You open [the object] revealing [a list of objects2].",
    it:"Hai aperto [l'oggetto] scoprendo [una lista di oggetti2]."
  },
  Cantlookunder:{
    en:"You can't look under [the object].",
    it:"Non puoi guardare sotto [l'oggetto]."
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
  wait:{en:"wait",it:"aspetta"},
  continue:{en:"continue",it:"continua"},
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
    it:"Sei [in/su oggetto]."
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
  Cantbecausein:{
    en:"You can't because you are [in] [the object].",
    it:"Non puoi perché sei [in/su oggetto]."
  },
  Cantbecausenotin:{
    en:"You can't because you are not [in] [the object].",
    it:"Non puoi perché non sei [in/su oggetto]."
  },
  Cantbytransport:{
    en:"You can't go to [the object] [in2] [the object2].",
    it:"Non puoi andare verso [l'oggetto] [in/su oggetto2]."
  },
  Cantonfoot:{
    en:"You can't go to [the object] on foot.",
    it:"Non puoi andare verso [l'oggetto] a piedi."
  },
  intheobject:{en:"[in] [the object]",it:"[in/su oggetto]"},
  Youcanask:{
    en:"You could ask [list of topics]",
    it:"Potresti chieder[gli] [lista di argomenti]"
  },
  youcantell:{
    en:"you could tell [list of topics]",
    it:"potresti parlar[gli] [lista di argomenti]"
  },
  butdontanswer:{
    en:"<br>[The object] ignores the question.",
    it:"<br>[L'oggetto] ignora la domanda."
  },
  butdonttell:{
    en:"<br>[The object] doesn't seem interested in the argument.",
    it:"<br>[L'oggetto] non sembra interessato all'argomento."
  },
  Canttalk:{en:"You can't talk to [the object].",it:"Non puoi parlare [all'oggetto]."},
  Canttalkabout:{en:"You can't talk about [the object].",it:"Non puoi parlare [dell'oggetto]."},
  left:{en:'left',it:'sinistra'},
  right:{en:'right',it:'destra'},
  ahead:{en:'ahead',it:'avanti'},
  back:{en:'back',it:'indietro'},
  Clickoncont:{en:'Click on "<i>continue</i>", please.',it:'Clicca su "<i>continua</i>" per favore.'}
}

// english grammar rules

const isvowel = ch => 'aeiouAEIOU'.includes(ch)

const en={
  detart: obj => obj.proper?'':'the ',
  indart: obj => obj.proper?'':(obj.singleton?en.detart(obj):((!obj.uncount||!obj.plural)?(isvowel(x(obj.name).charAt(0))?'an ':'a '):'some '))
}

// italian grammar rules

const it={
  artnum:function(obj){
    const name=x(obj.name)
    const [ch1,ch2]=[name.charAt(0),name.charAt(1)]
    if(isvowel(ch1)) return 0
    else if('zxZX'.includes(ch1)) return 1
    else if('sS'.includes(ch1)) return isvowel(ch2)?2:1
    else if('pP'.includes(ch1)) return 's'==ch2?1:2
    else if('gG'.includes(ch1)) return 'n'==ch2?1:2
    else return 2
  },
  artdet:function(obj){
    if(obj.proper) return ''
    const num=it.artnum(obj)
    if(obj.plural)
      if(obj.it_femminile) return 'le '
      else return num==2?'i ':'gli '
    else
      if(obj.it_femminile) return num==0?"l'":'la '
      else
        if(num==0) return "l'"
        else return num==1?'lo ':'il '
  },
  artind:function(obj){
    if(obj.proper) return ''
    if(obj.singleton) return this.artdet(obj)
    const num=it.artnum(obj)
    if(obj.plural)
      if(obj.it_femminile) return 'delle '
      else return num==2?'dei ':'degli '
    else
      if(!obj.uncount)
        if(obj.it_femminile) return num==0?"un'":'una '
        else
          if(num==0) return "un "
          else return num==1?'uno ':'un '
      else
        if(obj.it_femminile) return num==0?"dell'":'della '
        else
          if(num==0) return "del "
          else return num==1?'dello ':'del '
  },
  prepdi: obj => it.prepart('di',obj),
  prepa:  obj => it.prepart('a',obj),
  prepda: obj => it.prepart('da',obj),
  prepin: obj => it.prepart('in',obj),
  prepsu: obj => it.prepart('su',obj),
  prepart:function(prep,obj){
    if(obj.proper) return prep+' '
    const num=it.artnum(obj)
    let str=(prep=='di'?'de':(prep=='in'?'ne':prep))
    if(obj.plural)
      if(obj.it_femminile) return str+='lle '
      else return str+=num==2?'i ':'gli '
    else
      if(obj.it_femminile) return str+=num==0?"ll'":'lla '
      else if(num==0) return str+="ll'"
        else return str+=num==1?'llo ':'l '
  },
}

//// world model

const worlds={}

class World {
  constructor(id) {
    this.objects={void:{type:'room',id:'@void',name:'void'}}
    this.prevroom='@void'
    worlds[id]=this
  }
}

const isOffstage = id => getObj(id).loc==null||getObj(id).loc=='@void'

class Obj {
  constructor(id,type) {
    this.id = id
    world.objects[id] = this
    this.type = type||'obj'
    this.name = id
  }
  addProp(prop,newlang,newprop){
    if(isString(this[prop])){
      const temp=this[prop]
      this[prop]={}
      this[prop][langdef]=temp
    }
    this[prop][newlang]=newprop
  }
  addName = (newlang,newname) => this.addProp('name',newlang,newname)
  addDesc = (newlang,newdesc) => this.addProp('desc',newlang,newdesc)
}

class Group extends Obj {
  constructor(id,type) {
    super(id, type||'group')
    this.objects = []
    this.rules = []
  }
  addObj(obj){
    this.objects.push(obj.id)
    obj.loc=this.id
  }
}

class Person extends Group {
  constructor(id,type) {
    super(id, type||'person')
    this.topics = []
    this.wears = []
    this.fixed=true
  }
}
const isPerson = obj => obj instanceof Person

class Room extends Group {
  constructor(id) {
    super(id, 'room')
    this.fixed = true
    this.exits = []
    this.loc = null
  }
  addExit(id){
    this.exits.push(id)
    getObj(id).loc=this.id
  }
  removeExit(id){
    getObj(id).loc='@void'
    return remove(this.exits,id)
  }
}
const isRoom = obj => obj instanceof Room

class Intro extends Room {
  constructor() {
    super('@intro')
    this.name = "Untitled"
    this.author = "Anonymous"
    this.email = ""
    this.subtitle = ""
    this.blurb = ""
    this.note = ""
    this.IFID = ""
    this.release = ""
    this.date = ""
    this.code = ""
    this.desc = "[arg.subtitle] [by] <a href='mailto:[arg.email]'>[arg.author]</a><p>Release [arg.release] / [arg.date] / HyperFable 1.0<p>[arg.note]"
  }
}

class Exit extends Obj {
  constructor(id, room, roomto, type) {
    super(id, type||'exit')
    this.roomto = roomto
    this.scenery=true
    if(room) {
      room.exits.push(this.id)
      this.loc = room.id
    }
  }
}
const isExit = obj => obj instanceof Exit

class Portal extends Exit {
  constructor(id, room, roomto, worldto) {
    super(id, room, roomto, 'portal')
    this.worldto = worldto || '@world'
    this.scenery=true
  }
}
const isPortal = obj => obj instanceof Portal

class Thing extends Obj {
  constructor(id,type) {
    super(id,type||'thing')
  }
}
const isThing = obj => obj instanceof Thing

class Container extends Group {
  constructor(id,type) {
    super(id, type||'container')
    this.keys = []
  }
}
const isContainer = obj => obj instanceof Container

class Vehicle extends Container {
  constructor(id,type) {
    super(id, type||'vehicle')
    this.enterable = true
  }
}
const isVehicle = obj => obj instanceof Vehicle

class Supporter extends Group {
  constructor(id,type) {
    super(id,type||'supporter')
  }
}
const isSupporter = obj => obj instanceof Supporter

class Mount extends Supporter {
  constructor(id,type) {
    super(id,type||'mount')
  }
}
const isMount = obj => obj instanceof Mount

const isTransport = obj => isVehicle(obj) || isMount(obj)

class Topic extends Obj {
  constructor(id,person,type) {
    super(id,type||'topic')
    if(person) person.topics.push(id)
  }
}
const isTopic = obj => obj instanceof Topic
function newTopic(id,name_en,name_it,isquest,req_en,req_it,resp_en,resp_it,addids,remids,char){
  const t=new Topic(id,char)
  t.name={en:name_en,it:name_it}
  t.question=isquest
  t.request={en:req_en,it:req_it}
  t.response={en:resp_en,it:resp_it}
  if(addids){
    if(!t.add) t.add=[]
    for(const id of addids) t.add.push(id)
  }
  if(remids){
    if(!t.rem) t.rem=[]
    for(const id of remids) t.rem.push(id)
  }
  return t
}

class Text extends Obj {
  constructor(id,type) {
    super(id,type||'text')
    this.cur=0
    this.par=[]
  }
  get desc(){
    return (this.cur>0?this.pretext():'')
      +x(this.par[this.cur])
      +(this.cur<this.par.length-1?this.posttext():'')
  }
  pretext = ()=>'<a class="dec" id="'+this.id+'" onclick="nexttext(event,-1)">&lt;&lt;</a>&nbsp;'
  posttext = ()=>'&nbsp;<a class="dec" id="'+this.id+'" onclick="nexttext(event,1)">&gt;&gt;</a>'
}
function nexttext(event,dir) {
  const id = event.target.id
  const obj=getObj(id)
  const oldcur=obj.cur
  obj.cur+=dir;
  if(obj.cur>=0&&obj.cur<obj.par.length){
    if(action[id]) action[id]()
    return examine(obj)
  }
  obj.cur=oldcur
}
const isText = obj => obj instanceof Text

class Sequence extends Text {
  constructor(id,type) {
    super(id,type||'sequence')
    this.cur=0
    this.par=[]
  }
  get desc(){
    return x(this.par[this.cur])
      +(this.cur<this.par.length?this.posttext():'')
  }
  execute = next=>{
    if(!next){
      this.done=true
      world.execseq=this.id
      this.cur=0
    }
    msg(mark(x(this.desc,this)))
  }
  posttext = ()=>'&nbsp;(<a id="'+this.id+'" onclick="nextsequence(\''+this.id+'\')"><b><i>'+x(w.continue)+'</i></b></a>)'
}
function nextsequence(id) {
  const obj=getObj(id)
  obj.cur++
  if(obj.cur>=0&&obj.cur<obj.par.length) return obj.execute(true)
  world.execseq=null
  if(action[id]) action[id]()
  else if(obj.roomto) jumpto(obj.roomto)
}
const isSequence = obj => obj instanceof Sequence

const isFixed = obj => obj.scenery||obj.fixed
const isMovable = obj => ['thing','container','supporter'].indexOf(obj.type)>=0 && !isFixed(obj)

const getObj = id => world.objects[id]

const getCharId = () => world.char
const getChar = () => getObj(world.char)
const setChar = char => world.char=char.id
const getCarried = () => getChar().objects
const getWorn = () => getChar().wears
const isCarried = id => getChar().objects.includes(id)
const isWorn = id => getChar().wears.includes(id)
const getLoc = () => getChar().loc
const setLoc = id => getChar().loc=id

function countnoscenery(list) {
  let count=0
  for(const id of list){
    if(id==getCharId()||getObj(id).scenery) continue
    count++
  }
  return count
}

function getRoom(){
  let loc=getObj(getLoc())
  while(loc&&!isRoom(loc))
    loc=getObj(loc.loc)
  return loc
}

const otherCreators = []

function createObj(type,id) {
  switch(type){
    case 'person'   : return new Person(id)
    case 'room'     : return new Room(id)
    case 'intro'    : return new Intro(id)
    case 'exit'     : return new Exit(id)
    case 'portal'   : return new Portal(id)
    case 'thing'    : return new Thing(id)
    case 'container': return new Container(id)
    case 'supporter': return new Supporter(id)
    case 'vehicle'  : return new Vehicle(id)
    case 'mount'    : return new Mount(id)
    case 'topic'    : return new Topic(id)
    case 'text'     : return new Text(id)
    case 'sequence' : return new Sequence(id)
    case 'obj'      : return new Obj(id)
    case 'group'    : return new Group(id)
    case 'world'    : return new World(id)
  }
  for(const f of otherCreators)
    return f(type,id)
  return null
}

let world=new World('@world')

// savings

let lastSave="SAVE1"

const getTrailer=()=>worlds['@world']?
  (worlds['@world'].objects['@intro']?
    (worlds['@world'].objects['@intro'].code||TRAILER)
    :TRAILER
  ):TRAILER

function saveWorld(savename){
  if(!savename){
    savename=window.prompt(x(w.Insertsave),lastSave)
    if(!savename) return msg(x(w.Error))
  }
  window.localStorage.setItem(TRAILER+savename,JSON.stringify(worlds['@world']))
  if(savename.charAt(0)!='$') msg('"'+savename+'" '+x(w.saved)+'.')
}

function inflateWorld(loaded){
  const newworld=JSON.parse(loaded)
  world=worlds['@world']=JSON.parse(loaded)
  for(const id in world.objects){
    const obj=getObj(id)
    Object.assign(createObj(obj.type,id),obj)
  }
  showAll()
}

function loadWorld(savename,nomsg){
  if(!savename) {
    let [str,list]=[x(w.Insertload)+' < ','']
    for(const key in window.localStorage)
      if(key.substring(0,TRAILER.length)==TRAILER && key.charAt(TRAILER.length)!='$')
        list+=(lastSave=key.substring(TRAILER.length))+' '
    if(list=='') return msg(x(w.Error))
    str+=list+'>'
    savename=window.prompt(str,lastSave||'')
    if(!savename) return msg(x(w.Error))
  }
  const loaded=window.localStorage.getItem(TRAILER+savename)
  if(!loaded) return nomsg?null:(x(w.Error))
  inflateWorld(loaded)
  if(savename.charAt(0)!='$') msg('"'+savename+'" '+x(w.loaded)+'.')
}

//// html

const getel = elname => document.getElementById(elname)

const inner = (elname,text) => getel(elname).innerHTML=text

const msgtot=9
let msgcount=0
function msg(text){
  msgcount++
  getel("$msg").start=msgcount
  for(let ct=msgtot;ct>=1;ct--)
    inner('$msg'+ct,getel('$msg'+(ct-1)).innerHTML)
  message(text)
  inner('$msg0',text)
}
const message = text => inner('$message',text)

const cap = txt => txt.charAt(0).toUpperCase()+txt.slice(1)

function innerobject(obj,dec) {
  if(isString(obj)) return '<del>'+obj+'</del>'
  let effect=obj.style||obj.type
  if(effect!='room'&&dec) effect+=' dec'+(isMovable(obj)?' hvr-buzz-out':' hvr-radial-out')
  return '<span class="'+effect+'" id="'+obj.id
    +'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" onclick="clickon(event)">'
    +x(obj.name)+'</span>'
}
const inneraction = (actionid,obj) =>
  '<span class="action" id="'+actionid+' '+obj.id
    +'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" onclick="clickon(event)">'
    +x(w[actionid],obj)+'</span>'
const innertopic = (id,obj) =>
  '<span class="topic" id="'+id+' '+obj.id
    +'" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" onclick="clickon(event)">'
    +x(getObj(id).name)+'</span>'

const mark = (text,dec) =>
  text.replaceAll(/{([^}]+)}/g,(match,p1)=>innerobject(getObj(p1)||p1,dec))

// sentences

const yousee = (room,dec) => x(w.Seeing,room.objects,null,dec,dec)

const listexits = (room,dec) => x(w.Exits,room.exits,null,dec)

const inyousee = (obj,dec1,dec2) => x(w.Inseeing,obj,obj.objects,dec1,dec2)

const youcarry = dec => x(w.Carring,getCarried(),null,dec,dec)

const youwear = dec => x(w.wearing,getWorn(),null,dec,dec)

function youcarryandwear(dec){
  if(getCarried().length>0)
    return youcarry(dec)+(getWorn().length>0?x(w.and)+youwear(dec):'.')
  if(getWorn().length>0) return cap(youwear(dec))
  return x(w.Youcarrynothing)
}

function menulist(array,dec){
  let ret=''
  for(const id of array)
    ret+=x(w.object,getObj(id),null,dec)+' '
  return ret
}
function listobjs(argarray,dec,withart){
  const array=[]
  for(const id of argarray)
    if(id!=getCharId()) array.push(id)
  if(array.length==0) return x(w.none)
  const wobject=withart?w.anobject:w.object
  let ret=x(wobject,getObj(array[0]),null,dec)
  if(array.length==1) return ret
  for(let ct=1;ct<array.length-1;ct++)
    ret+=', '+x(wobject,getObj(array[ct]),null,dec)
  return ret+=x(w.and)+x(wobject,getObj(array[array.length-1]),null,dec)
}
function listobjsnoscene(argarray,dec,withart){
  const array=[]
  for(const id of argarray)
    if(!getObj(id).scenery)
      array.push(id)
  return listobjs(array,dec,withart)
}
function listactions(array,obj){
  if(array.length==0) return x(w.nothing)
  let ret=inneraction(array[0],obj)
  if(array.length==1) return ret
  for(let ct=1;ct<array.length-1;ct++)
    ret+=", "+inneraction(array[ct],obj)
  return ret+=x(w.or)+inneraction(array[array.length-1],obj)
}
function listtopics(array,obj){
  if(array.length==0) return x(w.nothing)
  let ret=innertopic(array[0],obj)
  if(array.length==1) return ret
  for(let ct=1;ct<array.length-1;ct++)
    ret+=", "+innertopic(array[ct],obj)
  return ret+=x(w.or)+innertopic(array[array.length-1],obj)
}

//// interface

/*
let editMode=false
function changeEditable() {
  editMode=!editMode
  const mod=document.getElementById('$room')
  mod.contentEditable=editMode
  showAll()
}
*/

function changeTheme() {
  darkMode=!darkMode
  document.body.classList.toggle('dark-theme')
  window.localStorage.setItem(TRAILER+'theme',darkMode?'dark':'light');
  background('$header',getRoom().colors)
}

function download(){
  const filename=window.prompt(x(w.Insertfile),x(worlds['@world'].objects['@intro'].name)+'.txt')
  if(!filename) return msg(x(w.Error))
  const dataStr = "data:text/plain;charset=utf-8,"+encodeURIComponent(JSON.stringify(world))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute("href",dataStr)
  downloadAnchorNode.setAttribute("download",filename)
  document.body.appendChild(downloadAnchorNode)
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
  msg('"'+filename+'" '+x(w.saved)+'.')
}

// drag&drop and click

const allowDrop = ev => ev.preventDefault()
function drag(ev) {
  let id=ev.target.id
  if(ev.target.className=="action")
    id="*"+id.split(" ")[0]
  else if(ev.target.className=="topic")
    id="%"+id.split(" ")[0]
  ev.dataTransfer.setData("text",id)
}
function drop(ev) {
  ev.preventDefault()
  if(world.execseq)
    return msg(x(getObj(world.execseq).desc+'<br><b>'+x(w.Clickoncont)+'</b>'))
  const source=ev.dataTransfer.getData("text")
  const drain=ev.target.id
  if(source.charAt(0)=="*"){
    if(ev.target.className=="action")
      return msg(x(w.Cantdo))
    return perform(source.substring(1),drain)
  }else if(source.charAt(0)=="%"){
    if(ev.target.className=="topic")
      return msg(x(w.Cantdo))
    return talkto(source.substring(1),drain)
  }
  if(ev.target.className=="action")
    return perform(drain.split(" ")[0],source)
  if(ev.target.className=="topic")
    return talkto(drain.split(" ")[0],source)
  dragndrop(source,drain)
}

function lookroot(locid){
  while(true){
    if(locid==getCharId()) locid=getLoc()
    const loc=getObj(locid)
    if(isRoom(loc)||(isContainer(loc)&&loc.closed&&!loc.transparent))
      return loc.id
    locid=loc.loc
  }
}
function isinsidevisible(obj){
  let locid=getLoc()
  while(locid!=obj.id){
    const loc=getObj(locid)
    if(isRoom(loc)||(isContainer(loc)&&loc.closed&&!loc.transparent))
      return false
    locid=loc.loc
  }
  return true
}
const isvisible = obj =>
  isCarried(obj.id)||isWorn(obj.id)||
  isinsidevisible(obj)||lookroot(isRoom(obj)?obj.id:obj.loc)==lookroot(getLoc())

function reachroot(locid){
  while(true){
    if(locid==getCharId())
      locid=getLoc()
    const loc=getObj(locid)
    if(isRoom(loc)||(isContainer(loc)&&loc.closed))
      return loc.id
    locid=loc.loc
  }
}
function isinsidereachable(obj){
  let locid=getLoc()
  while(locid!=obj.id){
    const loc=getObj(locid)
    if(isRoom(loc)||(isContainer(loc)&&loc.closed))
      return false
    locid=loc.loc
  }
  return true
}
const isreachable = obj =>
  isinsidereachable(obj)||reachroot(isRoom(obj)||imhere(obj)?obj.id:obj.loc)==reachroot(getLoc())

function imhere(obj){
  let locid=getLoc()
  const roomid=getRoom().id
  while(locid!=roomid){
    if(locid==obj.id) return true
    locid=getObj(locid).loc
  }
  return false
}

function isempty(obj){
  if(!obj.objects||obj.objects.length<=0) return true
  for(const id of obj.objects)
    if(!getObj(id).scenery&&id!=getCharId())
      return false
  return true
}

function dragndrop(source,drain){
  if(source=='@inventory'){
    if(drain=='@inventory') return
    const dobj=getObj(drain)
    if(drain==getLoc()) return msg(x(w.Youalreadyin,dobj))
    if(isRoom(dobj)){
      for(const exitid of getRoom().exits){
        const exit=getObj(exitid)
        if(exit.roomto==drain) return gothrough(exit)
      }
      const room=getRoom()
      const cont=getObj(getLoc())
      if(room!=dobj||room.id!=cont.loc)
        return msg(x(w.Cantmovedirto,dobj))
      return doexit(getLoc())
    }
    if(dobj.type=='exit') return gothrough(dobj)
    if(dobj.type=='portal') return jumpthrough(dobj)
    return moveto(drain)
  }
  switch(drain){
    case '@inventory':
      if(isCarried(source)) return dowear(source)
      if(isWorn(source)) return doremove(source)
      return dotake(source)
    //case '@carried': return dotake(source)
    //case '@worn': return dowear(source)
    default:
      const dobj=getObj(drain)
      if(dobj.type=='exit'||dobj.type=='portal')
        return dopush(source,drain)
      return doput(source,drain)
  }
}

function clickon(ev){
  if(world.execseq) return msg(x(getObj(world.execseq).desc+'<br><b>'+x(w.Clickoncont)+'</b>'))
  if(ev.target.className=='action'){
    const words=ev.target.id.split(' ')
    return perform(words[0],words[1],words[2])
  }
  if(ev.target.className=='topic'){
    const words=ev.target.id.split(' ')
    return talkto(words[0],words[1])
  }
  const obj=getObj(ev.target.id)
  if(!obj) return msg(x(w.Cantseethat))
  if(isPortal(obj)) return jumpthrough(obj)
  if(isExit(obj)) return gothrough(obj)
  return examine(obj)
}

// actions

function carry(obj,char){
  if(obj.loc){
    const loc=getObj(obj.loc)
    if(!remove(loc.objects,obj.id)&&loc.wears)
      remove(loc.wears,obj.id)
  }
  if(!char){
    getCarried().push(obj.id)
    obj.loc=getCharId()
  }else{
    char.objects.push(obj.id)
    obj.loc=char.id
  }
}
function wear(obj,char){
  if(obj.loc){
    const loc=getObj(obj.loc)
    if(!remove(loc.objects,obj.id)&&loc.wears)
      remove(loc.wears,obj.id)
  }
  if(!char){
    getWorn().push(obj.id)
    obj.loc=getCharId()
  }else{
    char.wears.push(obj.id)
    obj.loc=char.id
  }
}

function talkto(topicid,talkerid){
  const talker=getObj(talkerid)
  if(!isPerson(talker)) return msg(x(w.Canttalk,talker))
  const topic=getObj(topicid)
  if(!isTopic(topic)) return msg(x(w.Canttalkabout,topic))
  let str=x(topic.request,talker)
  str+=(talker.topics.indexOf(topicid)<0?
    x(topic.question?w.butdontanswer:w.butdonttell,talker):
    ('<br>'+mark(x(topic.response,talker))))
  if(topic.rem)
    for(const id of topic.rem)
      remove(talker.topics,id)
  remove(talker.topics,topicid)
  if(topic.add)
    for(const id of topic.add)
      if(!talker.topics.includes(id))
        talker.topics.push(id)
  msg(str+suggesttopics(talker))
  if(action[topicid]) action[topicid]()
}
function moveto(id){
  const obj=getObj(id)
  if(!obj.enterable&&!obj.seatable&&!obj.climbable){
    if(isContainer(obj)) return msg(x(w.Cantenter,obj))
    return msg(x(w.Cantgeton,obj))
  }
  if(isCarried(id)) return msg(x(w.Cantenterheld,obj))
  if(isWorn(id)) return msg(x(w.Cantenterworn,obj))
  if(getLoc()==id) return msg(x(w.Youalreadyin,obj))
  if(getLoc()==obj.loc) return (isContainer(obj)?doenter:doclimb)(id)
  return msg(x(w.Cantbecausenotin,getObj(obj.loc)))
}
function fliproomfx(msg,waitfun){
  getel('$header').classList="header animate__animated animate__flipOutX"
  setTimeout(()=>{
    if(waitfun) waitfun()
    if(msg) message(msg)
    showAll()
    getel('$header').classList="header animate__animated animate__flipInX"
  },1300)
}
function jumpto(roomid,worldid,waitfun){
  world.prevroom=getLoc()
  getObj(world.prevroom).visited=true
  if(worldid) world=worlds[worldid]
  setLoc(roomid)
  const room=getObj(getLoc())
  if(world.prevroom.charAt(0)!="@") msg(x(w.Yougoto,room))
  fliproomfx('',waitfun)
}
function jumpthrough(obj){
  if(!isvisible(obj)) return msg(x(w.Cantseeexit,obj))
  if(!isreachable(obj)) return msg(x(w.Cantreachexit,obj,getObj(getLoc())))
  if(obj.closed) return msg(x(w.Cantdo)+' '+x(w.Itsclosed,obj))
  jumpto(obj.roomto,obj.worldto)
}
function gothrough(obj,nohook){
  const id=obj.id
  if(!nohook&&hookdo('gothrough',id)) return
  if(action[id]&&action[id]()) return
  if(!isvisible(obj)) return msg(x(w.Cantseeexit,obj))
  const loc=getObj(getLoc())
  if(!isreachable(obj)) return msg(x(w.Cantreachexit,obj,loc))
  if(!isRoom(loc)&&!isTransport(loc)) return msg(x(w.Cantbecausein,loc))
  if(obj.locked) return msg(x(w.Cantdo)+' '+x(w.Itslocked,obj))
  if(obj.closed) return msg(x(w.Cantdo)+' '+x(w.Itsclosed,obj))
  const istr=isTransport(loc)
  if(istr&&obj.onfoot) return msg(x(w.Cantbytransport,obj,loc))
  if(!istr&&obj.bytransport) return msg(x(w.Cantonfoot,obj))
  world.prevroom=getLoc()
  getObj(world.prevroom).visited=true
  if(!istr) setLoc(obj.roomto)
  else loc.loc=obj.roomto
  const room=getObj(obj.roomto)
  if(room.id.charAt(0)!="@") msg(x(w.Yougoto,room))
  fliproomfx()
}
function examine(obj,nohook){
  if(!nohook&&hookdo('examine',obj.id)) return
  if(!isvisible(obj)) return msg(x(w.Cantsee,obj))
  let str=mark(x(obj.desc||w.Nospecial,obj))
  str+=suggestactions(obj)+suggesttopics(obj)
  const objs=obj.objects
  if(objs&&objs.length>0&&countnoscenery(objs)>0&&(obj.type!='container'||obj.transparent||!obj.closed))
    str+="<br>"+inyousee(obj)
  msg(str)
}

function suggestactions(obj){
  const actions=[]
  switch(obj.type){
    case 'vehicle':
    case 'container':
        if(obj.closable)
        actions.push(obj.closed?'open':'close')
    default:
      if(!isFixed(obj)){
        if(isCarried(obj.id)) actions.push('drop')
        else if(!isWorn(obj.id)) actions.push('take')
        if(obj.wearable)
          if(isWorn(obj.id)) actions.push('remove')
          else actions.push('wear')
      }
      if(obj.pullable) actions.push('pull')
      if(obj.pushable) actions.push('push')
      if(obj.edible) actions.push('eat')
      if(obj.drinkable) actions.push('drink')
      const isin=obj.id==getLoc()
      if(obj.enterable) actions.push(isin?'exit':'enter')
      if(obj.seatable) actions.push(isin?'descend':'sit')
      if(obj.climbable) actions.push(isin?'descend':'climb')
      if(obj.readable) actions.push('read')
      if(obj.switchable) actions.push(obj.switchedon?'switchoff':'switchon')
      if(obj.underside) actions.push('lookunder')
      break
  }
  return actions.length>0?'<br>'+x(w.Youcando,actions,obj):''
}

function suggesttopics(obj){
  if(!obj.topics) return ''
  const [asks,tells]=[[],[]]
  for(const topicid of obj.topics)
    (getObj(topicid).question?asks:tells).push(topicid)
  if(asks.length>0)
    return '<br>('+x(w.Youcanask,asks,obj)+(tells.length>0?(x(w.or)+x(w.youcantell,tells,obj)):'')+')'
  return tells.length>0?'<br>('+cap(x(w.youcantell,tells,obj))+')':''
}

// actions

function perform(action,id,id2){
  switch(action){
    case 'take': return dotake(id)
    case 'wear': return dowear(id)
    case 'drop': return dodrop(id)
    case 'pull': return dopull(id)
    case 'push': return dopush(id)
    case 'remove': return doremove(id)
    case 'lookunder': return dolookunder(id)
    case 'open': return doopen(id)
    case 'close': return doclose(id)
    case 'eat': return doeat(id)
    case 'drink': return dodrink(id)
    case 'read': return doread(id)
    case 'switchon': return doswitchon(id)
    case 'switchoff': return doswitchoff(id)
    case 'enter': return doenter(id)
    case 'climb':
    case 'sit': return doclimb(id)
    case 'exit': return doexit(id)
    case 'descend': return dodescend(id)
    default: return
  }
}
function hookdo(action,id,id2){
  let act=actions[id]
  if(act&&act[action])
    if(act[action](id,id2)) return true
  if(!id2) return false
  act=actions[id2]
  if(act&&act[action]) return act[action](id,id2)
  return false
}
function doenter(id,nohook){
  if(!nohook&&hookdo('enter',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const obj=getObj(id)
  if(getLoc()==id) return msg(x(w.Youalreadyin,obj))
  if(!obj.enterable) return msg(x(w.Cantenter,obj))
  if(isCarried(id)) return msg(x(w.Cantenterheld,obj))
  if(isWorn(id)) return msg(x(w.Cantenterworn,obj))
  if(obj.locked) return msg(x(w.Cantenter,obj)+' '+x(w.Itslocked,obj))
  if(obj.closed) return msg(x(w.Cantenter,obj)+' '+x(w.Itsclosed,obj))
  if(getLoc()!=obj.loc) return msg(x(w.Cantbecausenotin,getObj(obj.loc)))
  setLoc(id)
  msg(x(w.Youenter,obj))
  showAll()
}
function doexit(id,nohook){
  if(!nohook&&hookdo('exit',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const obj=getObj(id)
  if(getLoc()!=id) return msg(x(w.Arenotin,obj))
  if(obj.locked) return msg(x(w.Cantexit,obj)+' '+x(w.Itslocked,obj))
  if(obj.closed) return msg(x(w.Cantexit,obj)+' '+x(w.Itsclosed,obj))
  setLoc(obj.loc)
  msg(x(w.Youexit,obj))
  showAll()
}
function doclimb(id,nohook){
  if(!nohook&&hookdo('climb',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const obj=getObj(id)
  if(getLoc()==id) return msg(x(w.Youalreadyin,obj))
  if(!obj.climbable&&!obj.seatable) return msg(x(w.Cantgeton,obj))
  if(isCarried(id)) return msg(x(w.Cantenterheld,obj))
  if(isWorn(id)) return msg(x(w.Cantenterworn,obj))
  if(getLoc()!=obj.loc) return msg(x(w.Cantbecausein,getObj(getLoc())))
  setLoc(id)
  msg(x(w.Youenter,obj))
  showAll()
}
function dodescend(id,nohook){
  if(!nohook&&hookdo('descend',id)) return
  if(id=='@inventory') msg(x(w.Cantdo))
  const obj=getObj(id)
  if(getLoc()!=id) return msg(x(w.Arenoton,obj))
  setLoc(obj.loc)
  msg(x(w.Youexit,obj))
  showAll()
}
function dopull(id,nohook){
  if(!nohook&&hookdo('pull',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const sobj=getObj(id)
  if(!isvisible(sobj)) return msg(x(w.Cantsee,sobj))
  if(!isreachable(sobj)) return msg(x(w.Cantreach,sobj))
  if(imhere(sobj)) return msg(x(w.Cantdo)+' '+x(w.Arein,sobj))
  if(isFixed(sobj)&&!sobj.pullable) return msg(x(w.Cantpull,sobj))
  let sobjloc=getObj(sobj.loc)
  msg(x(w.Youpull,sobj))
  if(isSupporter(sobjloc)){
    sobj.loc=sobjloc.loc
    sobjloc=getObj(sobj.loc)
    msg(x(w.Hasfall,sobj,sobjloc))
  }
  showAll()
}
function dopush(id,toid,nohook){
  if(!nohook&&hookdo('push',id,toid)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const sobj=getObj(id)
  if(!isvisible(sobj)) return msg(x(w.Cantsee,sobj))
  if(!isreachable(sobj)) return msg(x(w.Cantreach,sobj))
  if(imhere(sobj)) return msg(x(w.Cantdo)+' '+x(w.Arein,sobj))
  if(isFixed(sobj)&&!sobj.pushable) return msg(x(w.Cantpush,sobj))
  if(!toid){
    const sobjloc=getObj(sobj.loc)
    msg(x(w.Youpush,sobj))
    if(isSupporter(sobjloc)){
      sobj.loc=sobjloc.loc
      sobjloc=getObj(sobj.loc)
      msg(x(w.Hasfall,sobj,sobjloc))
    }
    return showAll()
  }
  const dobj=getObj(toid)
  if(!sobj.pushablethrough||dobj.type=='portal'||dobj.type!='exit'||!dobj.crossable)
    return msg(x(w.Cantpushto,sobj,dobj))
  const loc=getObj(sobj.loc)
  remove(loc.objects,id)
  sobj.loc=dobj.roomto
  getObj(dobj.roomto).objects.push(id)
  msg(x(w.Youpushto,sobj,dobj))
  showAll()
}
function dotake(id,nohook){
  if(!nohook&&hookdo('take',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const sobj=getObj(id)
  if(!isvisible(sobj)) return msg(x(w.Cantsee,sobj))
  if(!isreachable(sobj)) return msg(x(w.Cantreach,sobj))
  if(imhere(sobj)) return msg(x(w.Cantdo)+' '+x(w.Arein,sobj))
  if(isFixed(sobj)) return msg(x(w.Canttake,sobj))
  if(isCarried(id)) return msg(x(w.Alreadycarry,sobj))
  if(isWorn(id)) return doremove(id)
  const org=getObj(sobj.loc)
  carry(sobj)
  if(org.underside&&org.underside.includes(id))
    msg(x(w.Youtakeunder,sobj,org))
  else
    msg(x(w.Youtake,sobj,org))
  showAll()
}
function doremove(id,nohook){
  if(!nohook&&hookdo('remove',id)) return
  const sobj=getObj(id)
  if(!isWorn(id)) return msg(x(w.Dontwear,sobj))
  carry(sobj)
  msg(x(w.Youremove,sobj))
  showAll()
}
function dowear(id,nohook){
  if(!nohook&&hookdo('wear',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const sobj=getObj(id)
  if(isWorn(id)) return msg(x(w.Alreadywear,sobj))
  if(!isCarried(id)) dotake(id)
  if(!isCarried(id)) return
  if(!sobj.wearable) return msg(x(w.Cantwear,sobj))
  wear(sobj)
  msg(x(w.Youwear,sobj))
  showAll()
}
function dodrop(id,nohook){
  if(!nohook&&hookdo('drop',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const sobj=getObj(id)
  if(isWorn(id)) doremove(id)
  const dobj=getObj(getLoc())
  if(!isvisible(dobj)) return msg(x(w.Cantsee,dobj))
  if(sobj.loc==dobj.id) return msg(x(w.Alreadyin,sobj,dobj))
  if(!isCarried(id)) dotake(id)
  if(!isCarried(id)) return
  remove(getCarried(),id)
  dobj.addObj(sobj)
  msg(x(w.Youdrop,sobj,dobj))
  showAll()
}
function doput(id,toid,nohook){
  if(!nohook&&hookdo('put',id,toid)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const dobj=getObj(toid)
  if(!isvisible(dobj)) return msg(x(w.Cantsee,dobj))
  if(!isreachable(dobj)) return msg(x(w.Cantreach,dobj))
  const sobj=getObj(id)
  if(imhere(sobj)) return msg(x(w.Cantdo)+' '+x(w.Arein,sobj))
  if(sobj.loc==dobj.id) return msg(x(w.Alreadyin,sobj,dobj))
  if(sobj==dobj) return msg(x(w.Cantputonself,sobj))
  if(!isCarried(id)) dotake(id)
  if(!isCarried(id)) return
  if(!dobj.objects) return msg(x(w.Cantputin,sobj,dobj))
  for(const id of dobj.rules)
    if(
      (id.charAt(0)=='-'&&sobj[id.substring(1)])
      ||(id.charAt(0)=='+'&&!sobj[id.substring(1)])
    )
      return msg(x(w.Cantputin,sobj,dobj))
  if(isContainer(dobj)){
    if(dobj.locked) return msg(x(w.Cantdo)+' '+x(w.Itslocked,dobj))
    if(dobj.closed) return msg(x(w.Cantdo)+' '+x(w.Itsclosed,dobj))
    remove(getCarried(),id)
    dobj.addObj(sobj)
    msg(x(w.Youput,sobj,dobj))
    return showAll()
  }
  if(isRoom(dobj)||isSupporter(dobj)){
    remove(getCarried(),id)
    dobj.addObj(sobj)
    msg(x(w.Youput,sobj,dobj))
    return showAll()
  }
  msg(x(w.Cantputin,sobj,dobj))
}
function dolookunder(id,nohook){
  if(!nohook&&hookdo('lookunder',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const obj=getObj(id)
  if(!isvisible(obj)) return msg(x(w.Cantsee,obj))
  if(!isreachable(obj)) return msg(x(w.Cantreach,obj))
  if(!obj.underside) return msg(x(w.Cantlookunder,obj))
  if(obj.underside.length<=0) return msg(x(w.Canseeno))
  msg(x(w.Youlookunder,obj,obj.underside))
  showAll()
}
function doopen(id,nohook){
  if(!nohook&&hookdo('open',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const obj=getObj(id)
  if(!isvisible(obj)) return msg(x(w.Cantsee,obj))
  if(!isreachable(obj)) return msg(x(w.Cantreach,obj))
  if(!isContainer(obj)) return msg(x(w.Cantopen,obj))
  if(!obj.closed) return msg(x(w.Alreadyopenclosed,obj))
  if(!obj.closable) return msg(x(w.Cantopen,obj))
  obj.closed=false
  if(obj.transparent||isempty(obj))
    msg(x(w.Youopen,obj))
  else
    msg(x(w.Youopenrevealing,obj,obj.objects))
  showAll()
}
function doclose(id,nohook){
  if(!nohook&&hookdo('close',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const obj=getObj(id)
  if(!isvisible(obj)) return msg(x(w.Cantsee,obj))
  if(!isreachable(obj)) return msg(x(w.Cantreach,obj))
  if(!isContainer(obj)) return msg(x(w.Cantclose,obj))
  if(obj.closed) return msg(x(w.Alreadyopenclosed,obj))
  if(!obj.closable) return msg(x(w.Cantclose,obj))
  obj.closed=true
  msg(x(w.Youclose,obj))
  showAll()
}
function doeat(id,nohook){
  if(!nohook&&hookdo('eat',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  if(isOffstage(id)) return msg(x(w.Cantsee,getObj(id)))
  if(!isCarried(id)) dotake(id)
  if(!isCarried(id)) return
  const obj=getObj(id)
  if(!obj.edible) return msg(x(w.Canteat,obj))
  remove(getCarried(),id)
  obj.loc='@void'
  msg(x(w.Youeat,obj))
  showAll()
}
function dodrink(id,nohook){
  if(!nohook&&hookdo('drink',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const obj=getObj(id)
  if(isOffstage(id)) return msg(x(w.Cantsee,obj))
  if(!isCarried(obj.loc)) dotake(obj.loc)
  if(!isCarried(obj.loc)) return
  if(!obj.drinkable) return msg(x(w.Cantdrink,obj))
  const objloc=getObj(obj.loc)
  remove(objloc.objects,id)
  obj.loc='@void'
  msg(x(w.Youdrink,obj))
  showAll()
}
function doread(id,nohook){
  if(!nohook&&hookdo('read',id)) return
  if(id=='@inventory') msg(x(w.Cantdo))
  const obj=getObj(id)
  if(!isvisible(obj)) return msg(x(w.Cantsee,obj))
  if(!obj.readable) return msg(x(w.Cantread,obj))
  msg(x(w.Youread,obj)+mark(x(obj.text)))
}
function doswitchon(id,nohook){
  if(!nohook&&hookdo('switchon',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const obj=getObj(id)
  if(!isvisible(obj)) return msg(x(w.Cantsee,obj))
  if(!obj.switchable) return msg(x(w.Cantswitchon,obj))
  if(obj.switchedon) return msg(x(w.Alreadyswitched,obj))
  obj.switchedon=true
  msg(x(w.Youswitchon,obj))
}
function doswitchoff(id,nohook){
  if(!nohook&&hookdo('switchoff',id)) return
  if(id=='@inventory') return msg(x(w.Cantdo))
  const obj=getObj(id)
  if(!isvisible(obj)) return msg(x(w.Cantsee,obj))
  if(!obj.switchable) return msg(x(w.Cantswitchoff,obj))
  if(!obj.switchedon) return msg(x(w.Alreadyswitched,obj))
  obj.switchedon=false
  msg(x(w.Youswitchoff,obj))
}

// show

function showRoom(){
  const room=getRoom()
  let title=cap(x(room.name))
  if(getLoc()!=room.id) title+=' ('+x(w.intheobject,getObj(getLoc()))+')'
  let str='<font color="red"><h2 id="'+room.id
    +'" draggable="false" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'
    +title+'</h2></font><p>'
  if(room.enteringfirst&&!room.visited) str+=mark(x(room.enteringfirst))+'<p>'
  else if(room.entering) str+=mark(x(room.entering))+'<p>'
  if(isvisible(room)){
    str+=mark(x(room.desc||'',room),true)
    if(!isempty(room)) str+='<p>'+yousee(room,true)
  }
  for(const id of room.objects){
    if(id==getCharId()) continue
    const obj=getObj(id)
    if(isvisible(obj)){
      const objs=obj.objects
      if(objs&&objs.length>0&&countnoscenery(objs)>0&&(obj.type!='container'||obj.transparent||!obj.closed||isinsidevisible(obj)))
        str+="<p>"+inyousee(obj,obj.closed,true)
    }
  }
  if(isvisible(room))
    str+='<p>'+(room.id.charAt(0)=='@'?menulist(room.exits,true):listexits(room,true))
  background('$header',room.colors)
  inner('$room',str)
}
function showInventory(){
  const c=getChar()
  let str='<font size="+2" color="red"><b id="@inventory" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">'
    +cap(x(c&&c.name?c.name:w.character,c))+"</b></font>: "
    +x(c&&c.desc?c.desc:w.chardesc,c)+"<p>"
  str+=youcarryandwear(true)
  for(const id of getCarried()){
    let obj=getObj(id)
    if(obj.objects&&obj.objects.length>0&&(obj.type!='container'||obj.transparent||!obj.closed))
      str+="<p>"+inyousee(obj,false,true)
  }
  for(const id of getWorn()){
    let obj=getObj(id)
    const objs=obj.objects
    if(objs&&objs.length>0&&countnoscenery(objs)>0&&(obj.type!='container'||obj.transparent||!obj.closed))
      str+="<p>"+inyousee(obj,false,true)
  }
  inner('$inventory',str)
}
function showAll(){
  showRoom()
  showInventory()
}

let dontSave=false

function restart(){
  window.localStorage.removeItem(TRAILER+'$AUTOSAVE')
  dontSave=true
  location.reload()
}

window.onbeforeunload=()=>dontSave?null:saveWorld('$AUTOSAVE')

window.onload=function(){
  darkMode=false
  const currentTheme=window.localStorage.getItem(TRAILER+'theme')
  if(currentTheme=="dark"){
    document.body.classList.add("dark-theme");
    getel("themecheckbox").checked=true
    darkMode=true
  }
  const currentLang=window.localStorage.getItem(TRAILER+'lang')
  langtag=currentLang||langdef
  refreshmenu()
  const flags=document.getElementsByClassName("flag");
  for(const flag of flags)
    if(flag.id=='$'+langtag)
      flagtoggle(flag)
  for(let ct=1;ct<=9;ct++){
    const el=document.createElement("li")
    el.id="$msg"+ct
    el.style.opacity="0."+(10-ct)
    getel("$msg").appendChild(el)
  }
  loadWorld('$AUTOSAVE',true)
  showAll()
}

function loadfile(ev) {
  const file=ev.target.files[0]
  const reader=new FileReader()
  reader.onload=function(){
    inflateWorld(reader.result)
    msg('"'+file.name+'" '+x(w.loaded)+'.')
  }
  reader.readAsText(file)
}

//// help

let r,t,t2

world=new World('@world-help')

r=new Room('help')
r.name={en:"tutorial room",it:"stanza del tutorial"}
r.it_femminile=true
r.desc={
en:
`<ul><li>Click on the highlighted words to perform the default action,
i.e. examine the corresponding objects, move through an exit, etc.</li><li>Drag and drop the words
to move the objects around, apply actions, and so on. You can even drag verbs and drop words on
the character's name, or the name of the room. Try different combinations!</li></ul>`
,it:
`<ul><li>Clicca sulle parole evidenziate per effettuare l'azione di base,
cioè esaminare gli oggetti corrispondenti, muoverti attraverso un'uscita, ecc.</li><li>Trascina
(drag & drop) le parole per cambiare la posizione degli oggetti, applicare azioni e così via.
Puoi anche trascinare verbi e spostare parole sul nome del personaggio o sul nome della stanza.
Tenta diverse combinazioni!</li></ul>`
}

t=new Person('@yourself')
t.name=w.character
t.proper=true
t.desc=w.chardesc
r.addObj(t)
setChar(t)
t=new Thing('cube')
t.addName('it','cubo')
t.desc={
  en:"A small {cube}. <i>Drag it on the character's name, or other objects.</i>",
  it:"Un piccolo {cube}. <i>Trascinalo sul nome del personaggio o su altri oggetti.</i>"
}
r.addObj(t)
t2=new Supporter('chair')
t2.addName('it','sedia')
t2.it_femminile=true
t2.desc={en:"A {chair}.",it:"Una {chair}."}
t2.seatable=true
r.addObj(t2)
t2=new Supporter('table')
t2.addName('it','tavolo')
t2.desc={
  en:"A {table}. <i>Drag objects on it.</i>",
  it:"Un {table}. <i>Trascina oggetti su di esso.</i>"
}
t2.climbable=true
t2.fixed=true
r.addObj(t2)
t=new Thing('apple')
t.addName('it','mela')
t.it_femminile=true
t.edible=true
t.desc={
  en:"An {apple}. <i>Try to eat it.</i>",
  it:"Una {apple}. <i>Prova a mangiarla.</i>"
}
t2.addObj(t)
t=new Thing('lamp')
t.addName('it','lampada')
t.it_femminile=true
t.switchable=true
t.desc={en:"A [on or off] {lamp}.",it:"Una {lamp} [acceso o spento]."}
t2.addObj(t)
t=new Container('box')
t.addName('it','scatola')
t.it_femminile=true
t.desc={
  en:"A small [open or closed] {box}. <i>Drag objects on it.</i>",
  it:"Una piccola {box} [aperto o chiuso]. <i>Trascina oggetti su di essa.</i>"
}
t.closed=false
t.closable=true
t2.addObj(t)
t2=new Supporter('hanger')
t2.addName('it','attaccapanni')
t2.desc={en:"A {hanger}.",it:"Un {hanger}."}
t2.fixed=true
t2.rules=['+wearable']
r.addObj(t2)
t=new Thing('hat')
t.addName('it','cappello')
t.wearable=true
t.desc={
  en:"A {hat}. <i>Drag it twice on the character's name to wear it.</i>",
  it:"Un {hat}. <i>Trascinalo due volte sul nome del personaggio per indossarlo.</i>"
}
t2.addObj(t)

t=new Exit("Go to the other room",r,'help-other')
t.addName("it","Vai all'altra stanza")

t=new Portal("help-exit",r,'@intro','@world')
t.name={en:'Back to the story',it:'Torna alla storia'}
t.proper=true

t=new Portal("About",r,'@about','@world-about')

r=new Room('help-other')
r.name={en:"tutorial other room",it:"altra stanza del tutorial"}
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
t.fixed=true
r.addObj(t)
t=new Container('wardrobe')
t.addName('it','armadio')
t.desc={
  en:"A large [open or closed] {wardrobe}.",
  it:"Una grande {wardrobe} [aperto o chiuso]."
}
t.closed=true
t.closable=true
t.enterable=true
t.fixed=true
r.addObj(t)

t=new Exit("Exit",r,'help')
t.addName("it","Uscita")
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

t=new Person('@yourself')
t.name=w.character
t.proper=true
t.desc=w.chardesc
r.addObj(t)
setChar(t)

t=new Thing('license')
t.addName('it','licenza')
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

t=new Portal("help-exit",r,'@intro','@world')
t.name={en:'Back to the story',it:'Torna alla storia'}

t=new Portal("Help",r,'help','@world-help')
t.addName("it","Aiuto")

world=worlds['@world']
