//// story world

TRAILER+='TLIB-'

{

let i,t,t2,t3,t4,r

// sentences

const ww={
  lecternName:{en:'lectern',it:'leggio'},
  LecternDesc:{
    en:'A common reading desk with a slanted top placed on a stand.',
    it:'Un comune leggio.'
  },
  noteName:{en:'sheet',it:'foglietto'},
  noteDesc:{
    en:'A piece of paper stuck to the lectern with some notes written on it.',
    it:'Un foglio appiccicato al leggio con alcune note scritte sopra.'
  },
  bookname:{en:'book',it:'libro'},
  markname:{en:'bookmark',it:'segnalibro'},
  Takingbook:{en:"Taking the book, ",it:"Prendendo il libro, "},
  Leavingbook:{en:"Leaving the book, ",it:"Lasciando il libro, "},
  Actiondone:{en:"Suddenly ",it:"All'improvviso "},
  jumpinroom:{
    en:"you were blinded by a glare and now you are [the object] [in2] [the object2].",
    it:"sei stato accecato da un bagliore e ora sei [l'oggetto] [in/su oggetto2]."
  },
  Canttake:{
    en:`You can't take the [object] of [object2]: he wouldn't like it.`,
    it:`Non puoi prendere [l'oggetto] di [oggetto2]: non gradirebbe.`
  },
  Cantakeonly:{
    en:`You can take the [object] only if you want to fill the [object2] for the pirate.`,
    it:`Puoi prendere [l'oggetto] solo se vuoi riempire [l'oggetto2] al pirata.`
  },
  Youfilled:{
    en:`You filled the [object] with the [object2].`,
    it:`Hai riempito [l'oggetto] con [l'oggetto2].`
  },
  Alreadyfullempty:{
    en:`[The object] is already [full or empty].`,
    it:`[L'oggetto] è già [pieno o vuoto].`
  },
  Eatingpill:{
    en:`After swallowing the pill, you felt yourself falling into a deep well, then `,
    it:`Dopo aver ingerito la pillola, ti sei sentito cadere in un pozzo profondo, poi `
  },
  Exiting:{en:'Exiting, ',it:'Uscendo, '},
  Dying:{en:'Dying, ',it:'Morendo, '},
  Youcantuntilfaria:{
    en:`You can't as long as the {faria_bag} contains the {faria_corpse}.`,
    it:`Non puoi finché il {faria_bag} contiene il {faria_corpse}.`
  },
  Youcanttooheavy:{
    en:`You can't because {faria_bag} is too heavy.`,
    it:`Non puoi perché il {faria_bag} è troppo pesante.`
  },
  Fariarolls:{
    en:`The {faria_corpse} rolls off the {faria_bed} onto the floor.`,
    it:`Il {faria_corpse} rotola giù dal {faria_bed} sul pavimento.`
  },
  Monsterrolls:{
    en:`The {fr_monster} rolls into the {fr_garbage}.`,
    it:'Il {fr_monster} rotola nel {fr_garbage}.'
  },
  Stangersonrolls:{
    en:`Turning the body, you discover the word RACHE written in letters of blood.`,
    it:'Rivoltando il corpo scopri la scritta RACHE tracciata con il sangue.'
  },
  Charonstops:{
    en:`Charon, placed on the shore in front of the boat, prevents you from getting on.<br>"I'm not making the trip for one soul. We'll leave when it's sold out. Be patient and wait."`,
    it:`Caronte, piazzato sulla riva di fronte alla barca, ti impedisce di salire.<br>"Non faccio il viaggio per un'anima sola. Partiremo quando ci sarà il tutto esaurito. Pazienta e aspetta."`
  },
  Aliceshrinks:{
    en:`After drinking the liquid you feel smaller, or rather, it seems that everything is getting bigger and, if you look closely, you would notice details that you had missed before.`,
    it:`Dopo aver bevuto il liquido ti senti rimpicciolire, o meglio, sembra che tutto si stia ingrandendo e, se guardassi bene, noteresti particolari che prima ti erano sfuggiti.`
  },
  Donteat:{
    en:`You are about to taste [the object], but after smelling it, you decide you don't like it.`,
    it:`Stai per assaggiare [l'oggetto], ma dopo averl[o] annusat[o], decidi che non ti piace.`
  },
  Edlookwig:{
    en:`Edmond admires the color of your {pi_wig}, then gives it back to you.`,
    it:`Edmond ammira il colore della tua {pi_wig}, poi te la restituisce.`
  },
  Mastclimb:{
    en:`Climb nimbly onto the mainmast and carefully observe the horizon, but there is no trace of the white whale's breath.`,
    it:`Sali con agilità sull'albero maestro e osservi con attenzione l'orizzonte, ma non c'è alcuna traccia del soffio della balena bianca.`
  },
  Glassempty:{
    en:`It's not a good idea. The {ti_glass} is empty and the pills would show.`,
    it:`Non è una buona idea. Il {ti_glass} è vuoto e le pillole si noterebbero.`
  },
  Iflarger:{
    en:`Yes, you got Gulliver's glasses, but they are so big you can't try them on. Maybe you could do it if you could get bigger thanks to some prodigy.`,
    it:`Sì, hai preso gli occhiali di Gulliver, ma sono così grandi che non riesci a provarli. Forse ci potresti riuscire se potessi ingrandirti grazie a qualche prodigio.`
  },
  Youshouldreadcare:{
    en:`You should carefully read the books. You died poisoned.`,
    it:`Dovresti leggere con attenzione i libri. Sei mort[o] avvelenat[o].`
  },
  Youshouldreadcare2:{
    en:`You should carefully read the books. One of the pills is poisoned!`,
    it:`Dovresti leggere con attenzione i libri. Una delle pillole è avvelenata!`
  },
  Youalreadydead:{
    en:`You cannot eat them and nothing would happen because you are already dead.`,
    it:`Non puoi mangiarle e non accadrebbe nulla perché sei già mort[o].`
  },
  Thanksbutrefuses:{
    en:`[The object] thanks you but declines the offer.`,
    it:`[L'oggetto] ti ringrazia ma rifiuta l'offerta.`
  },
  Itssleeping:{
    en:`[The object] cannot take [the object2] because it's asleep.`,
    it:`[L'oggetto] non può prendere [l'oggetto2] perché è addormentat[o].`
  },
  Itsdead:{
    en:`[The object] cannot take [the object2] because it's dead.`,
    it:`[L'oggetto] non può prendere [l'oggetto2] perché è mort[o].`
  },
  Dropcrutch:{
    en:`Leaving [the object] you fall to the ground.`,
    it:`Lasciando [l'oggetto] cadi a terra.`
  },
  Takecrutch:{
    en:`Picking up [the object] you get back on your foot <i>(<b>Ed.</b> no mistake here - John has only one foot)</i>.`,
    it:`Riprendendo [l'oggetto] ti rimetti sul piede <i>(<b>N.d.A.</b> qui non c'è alcun errore - John ha un solo piede)</i>.`
  },
  Cakedontwork:{
    en:`[The object] has no effect. Does it only works in books?`,
    it:`[L'oggetto] non ha alcun effetto. Che funzioni solo nei libri?`
  },
  Rumcorrodes:{
    en:`The rum in [the object] would corrode [the object2] without effect.`,
    it:`Il rum [nell'oggetto] corroderebbe [l'oggetto2] senza effetto.`
  },
  Becomehigher:{
    en:`You get as tall as Gulliver for a few moments, but then you come back as Lilliputian as before.`,
    it:`Diventi alto come Gulliver per qualche momento, ma poi torni lillipuziano come prima.`
  }
}

// intro

i=new Intro()
i.name={en:'The Library',it:"La Biblioteca"}
i.proper=true
i.author="Leonardo Boselli"
i.email="leonardo.boselli@youdev.it"
i.subtitle={en:"A textual nightmare",it:"Un incubo testuale"}
i.note={
  en:"<font size='-1'><i><b>N.B.</b> All the excerpts of the books are taken from the texts available on the <a href='https://www.gutenberg.org/'>Project Gutenberg</a> website.</i></font>",
  it:"<font size='-1'><i><b>N.B.</b> Tutti gli estratti dei libri sono presi dai testi disponibili sul sito del <a href='https://www.gutenberg.org/'>Progetto Gutenberg</a> e tradotti dall'inglese.</i></font>"
}
i.release="1.4"
i.date="2021-10-05"
i.entering={en:
`<blockquote><i>
&ldquo;The universe (which others call the Library) is composed of an indefinite, perhaps infinite number of hexagonal galleries. In the center of each gallery is a ventilation shaft, bounded by a low railing. From any hexagon one can see the floors above and below - one after another, endlessly&hellip;&rdquo;
(Jorge&nbsp;Luis&nbsp;Borges)</i></blockquote>`
,it:
`<blockquote><i>
&ldquo;L’universo (che altri chiamano la Biblioteca) si compone di un numero indefinito, e forse infinito, di gallerie esagonali, con vasti pozzi di ventilazione nel mezzo, circondati da ringhiere bassissime. Da qualunque esagono, si vedono i piani inferiori e superiori: interminabilmente&hellip;&rdquo;
(Jorge&nbsp;Luis&nbsp;Borges)</i></blockquote>`
}

t=new Person('@yourself')
t.name=w.character
t.proper=true
t.desc=w.chardesc
i.addObj(t)
setChar(t)

t=new Exit('Prologue',i,'prologue')
t.addName('it','Prologo')

t=new Portal("Help",i,'help','@world-help')
t.addName("it","Aiuto")

t=new Portal("About",i,'@about','@world-about')

//// prologue

r=new Room('prologue')
r.addName('it','prologo')
r.singleton=true
r.desc={
en:`You are in a dazzling white place.
In the distance you can see endless rows of bookcases overloaded with volumes.
In the middle of this indefinite space there is an elegant leather {armchair}.`,
it:`Ti trovi in un luogo di un bianco abbacinante.
In lontananza si notano file sterminate di scaffali stracarichi di libri.
Al centro di questo spazio indefinito c'è un'elegante {armchair} in pelle.`
}
r.entering={
en:`<i>When you read in the evening and a tale catches you, you immerse yourself in
reading late into the night, until you fall asleep.
<br>It's night. You are reading the "Library of Babel" by Jorge Luis Borges. You imagine
that huge collection of all possible books, some of which are been or could be written,
but most of them nonsense, when&hellip;</i>
<br>You notice in front of you a creepy guy who looks like Laurence Fishburne
playing Morpheus in the movie "The Matrix".
<br>He glances at you with a pleased smirk behind his round dark glasses.`,
it:`<i>Quando leggi la sera e un racconto ti prende, ti immergi nella
lettura fino a notte fonda, finché non ti addormenti.
<br>È notte. Stai leggendo la &ldquo;Biblioteca di Babele&rdquo; di Jorge Luis Borges.
Immagini quell'immensa collezione di tutti i libri possibili, alcuni dei quali sono
stati o potrebbero essere scritti, ma la maggior parte dei quali insensati
quando&hellip;</i>
<br>Di fronte a te noti un tizio inquietante che somiglia a Laurence
Fishburne mentre interpreta il Morpheus di "Matrix".
<br>Ti osserva con un sorrisetto compiaciuto dietro ai suoi tondi occhialini scuri.`
}

t=new Container('armchair')
t.addName('it','poltrona')
t.it_femminile=true
t.desc={en:"An elegant leather {armchair}.",it:"Un'elegante {armchair} in pelle."}
t.scenery=true
r.addObj(t)

t2=new Person('uncanny_guy')
t2.name={en:'uncanny guy',it:'tizio inquietante'}
t2.desc={en:
`An {uncanny_guy} who looks just like Morpheus with his dark glasses and leather raincoat.`
,it:
`Un {uncanny_guy} che sembra proprio Morpheus con l'impermeabile di pelle e gli occhialetti scuri.`
}
t.addObj(t2)

newTopic('morpheus_whoishe',
'who he is','chi è',true,
`"Who are you?" you ask hesitantly.`,`"Chi sei?" chiedi titubante.`,
`"You can call me &ldquo;Librarian&rdquo;, but you shouldn't be asking who I am, you should be asking who you are."`,`"Puoi chiamarmi &ldquo;Bibliotecario&rdquo;, ma non dovresti chiedere chi sono io, dovresti chiederti chi sei tu."`,
['morpheus_whoiam','morpheus_iknow'],null,t2
)
newTopic('morpheus_whoiam',
'who you are','chi sei tu',true,
`"Who am I?" you ask in confusion.`,`"Chi sono io?" chiedi in preda alla confusione.`,
`"You'll find out. You know, I've been waiting for you for a long time, because I have a mission for you."`,`"Lo scoprirai. Sai, ti stavo aspettando da molto tempo, perché ho una missione per te."`,
['morpheus_mission','morpheus_where'],['morpheus_iknow']
)
newTopic('morpheus_iknow',
'that you know who you are','che sai chi sei',false,
`"I know who I am!" you exclaim, but with little conviction.`,`"Io so chi sono!" esclami, ma con poca convinzione.`,
`"I like your confidence in yourself. You know, I've been waiting for you for a long time, because I have a mission for you."`,`"Mi piace la tua sicurezza. Sai, ti stavo aspettando da molto tempo, perché ho una missione per te."`,
['morpheus_mission','morpheus_where'],['morpheus_whoiam']
)
newTopic('morpheus_where',
'where you are','dove vi trovate',true,
`"What is this place?" you ask looking around.`,`"Che posto è mai questo?" chiedi guardandoti intorno.`,
`"The where is not important, but the why."`,`"Non è importante il dove, ma il perché."`,
['morpheus_why']
)
newTopic('morpheus_why',
'the why','il perché',true,
`"So why am I here?"`,`"E quindi perché sarei qui?"`,
`"Because I need your help. Was I talking to you about a mission? Actually I have two. You can choose which one you prefer."`,`"Perché mi serve il tuo aiuto. Ti stavo parlando di una missione? In realtà ne avrei due. Puoi scegliere quale preferisci."`,
['morpheus_whattodo'],['morpheus_mission']
)
newTopic('morpheus_mission',
'about the mission','della missione',true,
`"A mission? Which one?"`,`"Una missione? Quale?"`,
`"You can choose, because in reality I would have two to entrust to you."`,`"Puoi scegliere, perché in realtà ne avrei due da affidarti."`,
['morpheus_whattodo'],['morpheus_why','morpheus_where']
)
newTopic('morpheus_whattodo',
'what you need to do','cosa devi fare',true,
`"In conclusion, what should I do?"`,`"In conclusione, cosa dovrei fare?"`,
`"See this {red_pill}? If you choose it, you'll have to free Edmond Dantès from his cell in the Château d'If."`,`"Vedi questa {red_pill}? Se la scegli, dovrai liberare Edmond Dantès dalla sua cella nello Château d'If."`,
['morpheus_whatelse'],
)
newTopic('morpheus_whatelse',
'what you need to do otherwise','cosa devi fare altrimenti',true,
`"Who should I free?", you ask in amazement and add: "Isn't there something more sensible?"`,`"Chi dovrei liberare?", chiedi con stupore e aggiungi: "Non c'è qualcosa di più sensato?"`,
`"Sure, do you see this {blue_pill}? If you choose it, you'll have to free Ulysses from Polyphemus's cave."`,`"Certo, vedi questa {blue_pill}? Se la scegli, dovrai liberare Ulisse dalla caverna di Polifemo."`,
['morpheus_thirdway','morpheus_choice'],
)
newTopic('morpheus_thirdway',
'that you just want to wake up','che vuoi solo svegliarti',false,
`"It doesn't make sense, but I realized this is just a dream. Couldn't I just wake up?"`,`"Non ha senso, ma ho capito che questo è solo un sogno. Non potrei semplicemente svegliarmi?"`,
`"Go ahead, but you're missing all the fun. Don't you want to find out how deep the white rabbit hole is? Choose: the {red_pill} or the {blue_pill}?"`,`"Fai pure, ma ti perdi tutto il divertimento. Non vuoi scoprire quanto è profonda la tana del bianconiglio? Scegli: {red_pill} o {blue_pill}?"`,
['morpheus_pills']
)
newTopic('morpheus_choice',
'if there are alternative missions','se ci sono missioni alternative',true,
`"It doesn't make sense! Isn't there something simpler like… killing Count Dracula?" you ask in a sarcastic tone.`,`"Non ha senso! Non c'è qualcosa di più semplice tipo&hellip; uccidere il conte Dracula?" chiedi con tono sarcastico.`,
`"I was told that you had initiative. You can complete the secondary missions that you think are most appropriate.
Now choose the {red_pill} or the {blue_pill} and you'll find out how deep the rabbit hole is."`,`"Mi avevano detto che avevi spirito d'iniziativa. Puoi portare a termine le missioni secondarie che ritieni più opportune. Ora scegli la {red_pill} o la {blue_pill} e scoprirai quant'è profonda la tana del bianconiglio."`,
['morpheus_pills']
)
newTopic('morpheus_pills',
'to show you the pills','di mostrarti le pillole',true,
`"Show me the pills again."`,`"Mostrami di nuovo le pillole".`,
`"Here they are: the {red_pill} (Edmond Dantès) or the {blue_pill} (Ulysses)?"`,`"Eccole: {red_pill} (Edmond Dantès) o {blue_pill} (Ulisse)?"`,
['morpheus_pills']
)

const eatpill = () => msg(x(ww.Eatingpill)+x(ww.jumpinroom,getChar(),getRoom()))

t=new Thing('red_pill')
t.name={en:'red pill',it:'pillola rossa'}
t.it_femminile=true
t.desc={en:'A regular {red_pill}',it:'Una normale {red_pill}.'}
t.loc='prologue'
t.edible=true
actions.red_pill={
  eat:()=>{
    doeat('red_pill',true)
    delete world.objects['blue_pill']
    backtolibrary('a_room',eatpill)
    return true
  }
}
t=new Thing('blue_pill')
t.name={en:'blue pill',it:'pillola blu'}
t.it_femminile=true
t.desc={en:'A regular {blue_pill}.',it:'Una normale {blue_pill}.'}
t.loc='prologue'
t.edible=true
actions.blue_pill={
  eat:()=>{
    doeat('blue_pill',true)
    delete world.objects['red_pill']
    backtolibrary('a_room',eatpill)
    return true
  }
}

////

const dyingback=()=>msg(x(ww.Dying)+x(ww.jumpinroom,getChar(),getRoom()))

const exitingback=()=>msg(x(ww.Exiting)+x(ww.jumpinroom,getChar(),getRoom()))

function movebookto(bookid,suppid){
  const book=getObj(bookid)
  const supp=getObj(suppid)
  remove(getObj(book.loc).objects,bookid)
  supp.addObj(book)
}

//// new classes

let lastroominlib='d_room'

class LabExit extends Exit {
  constructor(id, room, roomto, type) {
    super(id, room, roomto, type||'labexit')
    this.style='exit'
  }
  get name(){
    if(!world.prevroom.endsWith('_room'))
      world.prevroom=lastroominlib
    const tofirst=this.roomto.charAt(0)
    const fromfirst=world.prevroom.charAt(0)
    if(tofirst==fromfirst) return w.back
    const labexits=getObj(this.loc).labexits
    const ito=labexits.indexOf(tofirst)
    let ifrom=labexits.indexOf(fromfirst)
    if(--ifrom<0)ifrom=2
    if(ifrom==ito) return w.left
    return w.right
  }
  set name(val){}
}

function createObj2(type,id) {
  switch(type){
    case 'labexit': return new LabExit(id)
    default: return null
  }
}

otherCreators.push(createObj2)

//// labyrinth

const takebook = () => msg(x(ww.Takingbook)+x(ww.jumpinroom,getChar(),getRoom()))
const dropbook = () => msg(x(ww.Leavingbook)+x(ww.jumpinroom,getChar(),getRoom()))
const actiondone = () => msg(x(ww.Actiondone)+x(ww.jumpinroom,getChar(),getRoom()))

function flashtodream(bookid,charid,roomid,carriedid){
  dotake(bookid,true)
  if(carriedid&&!isCarried(carriedid)) dotake(carriedid,true)
  const book=getObj(bookid)
  book.closed=true
  book.closable=true
  const oldchar=getChar()
  world.char=charid
  for(let ct=oldchar.objects.length-1;ct>=0;ct--){
    const item=oldchar.objects[ct]
    const obj=getObj(item)
    if(obj.transfer)
      carry(obj)
  }
  for(let ct=oldchar.wears.length-1;ct>=0;ct--){
    const item=oldchar.wears[ct]
    const obj=getObj(item)
    if(obj.transfer)
      wear(obj)
  }
  lastroominlib=world.prevroom
  jumpto(roomid,null,takebook)
  return true
}
function transferobjs(){
  const oldchar=getChar()
  world.char='@yourself'
  for(let ct=oldchar.objects.length-1;ct>=0;ct--) {
    const item=oldchar.objects[ct]
    const obj=getObj(item)
    if(obj.transfer){
      remove(oldchar.objects,item)
      getChar().objects.push(item)
      obj.loc='@yourself'
    }
  }
  for(let ct=oldchar.wears.length-1;ct>=0;ct--) {
    const item=oldchar.wears[ct]
    const obj=getObj(item)
    if(obj.transfer){
      remove(oldchar.wears,item)
      getChar().wears.push(item)
      obj.loc='@yourself'
    }
  }
}
function backtolibrary(roomid,waitfun){
  transferobjs()
  jumpto(roomid,null,waitfun)
  world.prevroom=lastroominlib
  return true
}
function missiondone(roomid,waitfun){
  transferobjs()
  jumpto(roomid,null,waitfun)
  world.prevroom=lastroominlib
  return true
}
function gamedone(roomid,waitfun){
  transferobjs()
  jumpto(roomid,null,waitfun)
  world.prevroom=lastroominlib
  jumpto('@epilogue')
  return true
}

//// Lewis Carroll

r=new Room('a_room')
r.name={en:'room &ldquo;Lewis Carroll&rdquo;',it:'sala &ldquo;Lewis Carroll&rdquo;'}
r.singleton=true
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_a}.`,
it:`Al centro della stanza c'è un {lectern_a}.`
}
r.enteringfirst={
en:
`You are in a circular room with three entrances. One behind you, the other two on the right and left.
At the top, a plaque bears the name of Lewis Carroll printed in golden letters that shine illuminated by the central light.
Along the walls there are shelves overloaded with books arranged in bulk.`
,it:
`Ti trovi in una sala circolare con tre ingressi. Uno alle tue spalle, gli altri due a destra e a sinistra.
In alto una targa riporta stampato il nome di Lewis Carroll in caratteri dorati che brillano illuminati dalla luce centrale.
Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
}

t=new Supporter('lectern_a')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_a={
  put:(id)=>{
    if(isOffstage('book_a')) return false
    if(getObj(id).transfer) flashtodream('book_a','Alice','Wonderland',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_a')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "Alice’s Adventures in Wonderland".',
  it:'Un libro intitolato "Alice nel paese delle meraviglie".'
}
function dropbook_a() {
  movebookto('book_a','lectern_a')
  dropbook()
}
actions.book_a={
  take:()=>flashtodream('book_a','Alice','Wonderland'),
  drop:()=>backtolibrary('a_room',dropbook_a),
  put:()=>backtolibrary('a_room',dropbook_a)
}
t.addObj(t2)

t3=new Text('mark_a')
t3.name=ww.markname
t3.fixed=true
t3.par=[
{en:`
Alice was beginning to get very tired of sitting by her sister on the
bank, and of having nothing to do: once or twice she had peeped into
the book her sister was reading, but it had no pictures or
conversations in it, “and what is the use of a book,” thought Alice
“without pictures or conversations?”
`,it:`
Alice cominciava a sentirsi assai stanca di sedere sul poggetto accanto a sua sorella, senza far niente: aveva una o due volte data un'occhiata al libro che la sorella stava leggendo, ma non v'erano nè dialoghi nè figure, — e a che serve un libro, — pensò Alice, — senza dialoghi nè figure?
`},
{en:`  
So she was considering in her own mind (as well as she could, for the
hot day made her feel very sleepy and stupid), whether the pleasure of
making a daisy-chain would be worth the trouble of getting up and
picking the daisies, when suddenly a White Rabbit with pink eyes ran
close by her.
`,it:`
E si domandava alla meglio, (perchè la canicola l'aveva mezza assonnata e istupidita), se per il piacere di fare una ghirlanda di margherite mettesse conto di levarsi a raccogliere i fiori, quand'ecco un coniglio bianco dagli occhi rosei passarle accanto, quasi sfiorandola.
`},
{
en:`
There was nothing so <i>very</i> remarkable in that; nor did Alice think it
so <i>very</i> much out of the way to hear the Rabbit say to itself, “Oh
dear! Oh dear! I shall be late!” (when she thought it over afterwards,
it occurred to her that she ought to have wondered at this, but at the
time it all seemed quite natural); but when the Rabbit actually <i>took a
watch out of its waistcoat-pocket</i>, and looked at it, and then hurried
on, Alice started to her feet, for it flashed across her mind that she
had never before seen a rabbit with either a waistcoat-pocket, or a
watch to take out of it, and burning with curiosity, she ran across the
field after it, and fortunately was just in time to see it pop down a
large rabbit-hole under the hedge.
`,it:`
Non c'era troppo da meravigliarsene, nè Alice pensò che fosse troppo strano sentir parlare il Coniglio, il quale diceva fra sè: “Oimè! oimè! ho fatto tardi!” (quando in seguito ella se ne ricordò, s'accorse che avrebbe dovuto meravigliarsene, ma allora le sembrò una cosa naturalissima): ma quando il Coniglio trasse un orologio dal taschino della sottoveste e lo consultò, e si mise a scappare, Alice saltò in piedi pensando di non aver mai visto un co-niglio con la sottoveste e il taschino, nè con un orologio da cavar fuori, e, ardente di curiosità, traversò il campo correndogli appresso e arrivò appena in tempo per vederlo entrare in una spaziosa conigliera sotto la siepe.
`
},
{
en:`
In another moment down went Alice after it, never once considering how
in the world she was to get out again.
<br>
The rabbit-hole went straight on like a tunnel for some way, and then
dipped suddenly down, so suddenly that Alice had not a moment to think
about stopping herself before she found herself falling down a very
deep well.
`,it:`
Un istante dopo, Alice scivolava giù correndogli appresso, senza pensare a come avrebbe fatto poi per uscirne.
<br>La buca della conigliera filava dritta come una galleria, e poi si sprofondava così improvvisamente che Alice non ebbe un solo istante l'idea di fermarsi: si sentì cader giù rotoloni in una specie di precipizio che rassomigliava a un pozzo profondissimo.
`
},
]
t2.addObj(t3)

r.labexits='bcd'

new LabExit("a_b",r,'b_room')
new LabExit("a_c",r,'c_room')
new LabExit("a_d",r,'d_room')

t=new Thing('note_a')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;Why do you waste time reading? You have a mission to accomplish!&rdquo;</i>`,
  it:`<i>&ldquo;Perché perdi tempo a leggere? Hai una missione da compiere!&rdquo;</i>`
}
function dyingback_a() {
  movebookto('book_a','lectern_a')
  dyingback()
}
function dontdroptext_a() {
  movebookto('book_a','lectern_a')
  actiondone()
}
function droptext_a() {
  remove(getChar().objects,'book_a')
  getObj('book_a').loc='@void'
  const lect=getObj('lectern_a')
  remove(lect.objects,'book_a')
  lect.addObj(getObj('note_a'))
  actiondone()
}

t=new Sequence('wo_final')
action.wo_final=()=>missiondone('a_room',droptext_a)
t.par=[
{en:`
After eating the pastry, everything around you shrinks and returns to normal size. Who knows what would have happened if you had eaten the pastry while you were your normal size. But you realize that there is a new pastry in the box, so you want to try, but at that moment you hear a voiceover that says:
`,it:`
Dopo aver mangiato il pasticcino, tutto intorno a te si rimpicciolisce e torna alle dimensioni normali. Chissà cosa sarebbe successo se tu avessi mangiato il pasticcino mentre eri delle tue dimensioni normali. Però ti accorgi che nella cassettina c'è un nuovo pasticcino, perciò ti viene voglia di provare, ma in quel momento senti una voce fuori campo che dice:
`},
{en:`
"I see that you have learned to experiment with the strange rules of this world. As a reward you can keep the small box: <i>if you need to pass it to other characters, just place it on the corresponding lectern</i>. Have fun!"
`,it:`
"Vedo che hai imparato a sperimentare le strane regole di questo mondo. Come ricompensa puoi tenere la cassettina: <i>se ti servisse passarla ad altri personaggi, basta che l'appoggi sul leggio corrispondente</i>. Buon divertimento!"
`},
]

//

r=new Room('Wonderland')
r.name={en:'long and low hall',it:'sala lunga e bassa'}
r.altname={en:'very long and high hall',it:'sala molto lunga e alta'}
r.it_femminile=true
r.desc={
en:`You are in a room lit by a row of lamps hanging from the roof with closed {wo_doors} around it and a small {wo_smalltable} in the center.`,
it:`Ti trovi in una sala illuminata da una fila di lampade pendenti dalla volta con intorno delle {wo_doors} chiuse e al centro un piccolo {wo_smalltable}.`
}
r.altdesc={
  en:`You are in a very large room lit by a row of huge lamps hanging from the roof with closed large {wo_doors} around it and a high {wo_smalltable} in the center.`,
  it:`Ti trovi in una sala illuminata da una fila di grandi lampade pendenti dalla volta con intorno delle enormi {wo_doors} chiuse e al centro un altissimo {wo_smalltable}.`
}

t=new Exit("wo_doorsexit",r)
t.name={en:'doors',it:'porte'}
t.plural=true
t.it_femminile=true
t.closed=true
t.locked=true

t=new Person('Alice')
t.proper=true
t.it_femminile=true
t.desc={
  en:`A typical girl from the Victorian era.`,
  it:`Una tipica ragazza dell'era Vittoriana.`
}
r.addObj(t)

t=new Container('wo_doors')
t.name={en:'doors',it:'porte'}
t.plural=true
t.it_femminile=true
t.desc={en:'A series of closed {wo_doors}.',it:'Una serie di {wo_doors} chiuse.'}
t.scenery=true
t.rules=['+nothing']
r.addObj(t)
t=new Supporter('wo_smalltable')
t.name={en:'table',it:'tavolo'}
t.desc={en:'A three-legged {wo_smalltable} made of solid glass.',it:'Un {wo_smalltable} di cristallo a tre gambe.'}
t.scenery=true
r.addObj(t)
t2=new Thing('wo_key')
t2.name={en:'little key',it:'chiavettina'}
t2.it_femminile=true
t2.desc={en:'A golden {wo_key}.',it:'Una {wo_key} d\'oro.'}
t.addObj(t2)
t2=new Container('wo_vial')
t2.name={en:'little bottle',it:'ampolla'}
t2.it_femminile=true
t2.desc={
  en:'A crystal {wo_vial}. There is a paper label around the neck with the words &ldquo;DRINK ME&rdquo;.',
  it:'Un\'{wo_vial} di cristallo con sopra scritto &ldquo;Bevi&rdquo;.'}
t.addObj(t2)
t3=new Thing('wo_liquid')
t3.name={en:'liquid',it:'liquido'}
t3.uncount=true
t3.desc={en:`A {wo_liquid} that smells like a mixture of cherry-tart, custard, pine-apple, roast turkey, toffee, and hot buttered toast.`,
it:`Un {wo_liquid} cha ha un odore misto di torta di ciliegie, di crema, d'ananasso, di gallinaccio arrosto, di torrone, e di crostini imburrati.`
}
t3.fixed=true
t3.drinkable=true
actions.wo_liquid={
  drink:id=>{
    const done=isOffstage(id)
    dodrink(id,true)
    if(done) return true
    msg(x(ww.Aliceshrinks))
    getObj('wo_smalltable').underside=['wo_smallbox']
    if(!isCarried('wo_key')) getObj('wo_key').fixed=true
    const room=getObj('Wonderland')
    let temp=room.desc
    room.desc=room.altdesc
    room.altdesc=temp
    temp=room.name
    room.name=room.altname
    room.altname=temp
    showAll()
    return true
  }
}
t2.addObj(t3)
t=new Container('wo_smallbox')
t.name={en:'little box',it:'cassettina'}
t.it_femminile=true
t.loc='wo_smalltable'
t.desc={en:'A {wo_smallbox} made of glass. It bears an inscription: "Inexhaustible".',it:'Una {wo_smallbox} di cristallo. Reca una scritta: "Inesauribile".'}
t.closed=true
t.closable=true
t.rules=['+small']
actions.wo_smallbox={
  put:(id,id2)=>{
    const person=getObj(id2)
    if(person.type=='person'){
      if(person.asleep)
        msg(x(ww.Itssleeping,person,getObj(id)))
      else if(person.dead)
        msg(x(ww.Itsdead,person,getObj(id)))
      else
        msg(x(ww.Thanksbutrefuses,person))
      return true
    }
    return false
  }
}
t3=new Thing('wo_cake')
t3.name={en:'very small cake',it:'pasticcino'}
t3.desc={
en:`A {wo_cake} on which the words “EAT ME” were beautifully marked in currants.`,
it:`Un {wo_cake} su cui c'è scritto &ldquo;Mangia&rdquo; con uva di Corinto.`
}
t3.edible=true
t3.small=true
actions.wo_cake={
  put:(id,id2)=>{
    if(id2=='ti_glass'){
      msg(x(ww.Rumcorrodes,getObj(id2),getObj(id)))
      return true
    }
    const person=getObj(id2)
    if(person.type=='person'){
      if(person.asleep)
        msg(x(ww.Itssleeping,person,getObj(id)))
      else if(person.dead)
        msg(x(ww.Itsdead,person,getObj(id)))
      else
        msg(x(ww.Thanksbutrefuses,person))
      return true
    }
    return false
  },
  eat:id=>{
    switch(getCharId()){
      case '@yourself':{
        doeat(id,true)
        const cake=getObj('wo_cake')
        cake.loc='wo_smallbox'
        getObj('wo_smallbox').addObj(cake)
        msg(x(ww.Cakedontwork,cake))
        break
      }
      case 'Alice':{
        doeat(id,true)
        const cake=getObj('wo_cake')
        cake.loc='wo_smallbox'
        getObj('wo_smallbox').addObj(cake)
        getObj('wo_final').execute()
        const box=getObj('wo_smallbox')
        box.closed=true
        box.transfer=true
        cake.transfer=true
        carry(box)
        showAll()
        break
      }
      case 'Clefrin_Frelock':{
        if(!isCarried('gt_eyeglasses')){
          msg(x(ww.Becomehigher))
          return true
        }
        doeat(id,true)
        const glasses=getObj('gt_eyeglasses')
        glasses.desc={en:'A {gt_eyeglasses}. They wouldn\'t clash on a giant.',it:'Un {gt_eyeglasses}. Non stonerebbero su un gigante.'}
        glasses.giant=true
        glasses.transfer=true
        getObj('gt_final').execute()
        break
      }
      default:{
        const cake=getObj('wo_cake')
        msg(x(ww.Donteat,cake))
        break
      }
    }
    return true
  }
}
t.addObj(t3)

//// Mary Shelley

r=new Room('b_room')
r.name={
  en:'room &ldquo;Mary Shelley&rdquo;',
  it:'sala &ldquo;Mary Shelley&rdquo;'
}
r.singleton=true
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_b}.`,
it:`Al centro della stanza c'è un {lectern_b}.`
}
r.enteringfirst={
en:
`You are in a circular room.
At the top, a plaque bears the name of Mary Shelley printed
in golden letters that shine illuminated by the central light.
Along the walls there are shelves overloaded with books arranged in bulk.`
,it:
`Ti trovi in una sala circolare.
In alto una targa riporta stampato il nome di Mary Shelley
in caratteri dorati che brillano illuminati dalla luce centrale.
Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
}

t=new Supporter('lectern_b')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_b={
  put:(id)=>{
    if(isOffstage('book_b')) return false
    if(getObj(id).transfer) flashtodream('book_b','Frankenstein','laboratory',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_b')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "Frankenstein or The Modern Prometheus".',
  it:'Un libro intitolato "Frankenstein o il moderno Prometeo".'
}

function exitingback_b() {
  movebookto('book_b','lectern_b')
  exitingback()
}
function dropbook_b() {
  movebookto('book_b','lectern_b')
  dropbook()
}
actions.book_b={
  take:()=>flashtodream('book_b','Frankenstein','laboratory'),
  drop:()=>backtolibrary('b_room',dropbook_b),
  put:()=>backtolibrary('b_room',dropbook_b)
}
t.addObj(t2)

t3=new Text('mark_b')
t3.name=ww.markname
t3.fixed=true
t3.par=[
{en:`
I started from my sleep with horror; a cold dew covered my forehead, my
teeth chattered, and every limb became convulsed; when, by the dim and
yellow light of the moon, as it forced its way through the window
shutters, I beheld the wretch—the miserable monster whom I had
created.
`,it:`
Mi svegliai con orrore; un sudore freddo mi copriva la fronte, i miei denti battevano, e le mie membra erano in preda a una convulsione; allora, alla luce pallida e gialla della luna, che penetrava attraverso le imposte della finestra, vidi lo sventurato, il miserabile mostro che avevo creato.
`},
{en:`
He held up the curtain of the bed; and his eyes, if eyes they
may be called, were fixed on me. His jaws opened, and he muttered some
inarticulate sounds, while a grin wrinkled his cheeks. He might have
spoken, but I did not hear; one hand was stretched out, seemingly to
detain me, but I escaped and rushed downstairs.
`,it:`
Alzò la cortina del letto; i suoi occhi, se occhi si possono chiamare, erano fissi su di me. Aprì le mascelle, ed emise alcuni suoni disarticolati, mentre una smorfia gli increspò le guance. Poteva aver parlato, ma io non udii; una mano era tesa, come se volesse trattenermi, ma io scappai e mi precipitai giù dalle scale.
`},
{en:`
I took refuge in the
courtyard belonging to the house which I inhabited, where I remained
during the rest of the night, walking up and down in the greatest
agitation, listening attentively, catching and fearing each sound as if
it were to announce the approach of the demoniacal corpse to which I
had so miserably given life.
`,it:`
Mi rifugiai nel cortile che faceva parte della casa in cui abitavo, vi rimasi per il resto della notte, camminando su e giù nella più grande agitazione, ascoltando attentamente, cogliendo e temendo ogni suono come se annunciasse l’avvicinarsi del demoniaco cadavere al quale io avevo così miserabilmente dato vita.
`},
{en:`
Oh! No mortal could support the horror of that countenance. A mummy
again endued with animation could not be so hideous as that wretch. I
had gazed on him while unfinished; he was ugly then, but when those
muscles and joints were rendered capable of motion, it became a thing
such as even Dante could not have conceived.
`,it:`
Oh! Nessun mortale potrebbe sopportare l’orrore di quel volto. Una mummia riportata in vita non potrebbe essere così spaventosa come quello sventurato. Lo avevo osservato quando non era ancora finito; allora era ripugnante, ma quando quei muscoli e quelle articolazioni furono resi capaci di movimento, divenne una cosa che nemmeno Dante avrebbe potuto concepire.
`},
]
t2.addObj(t3)

r.labexits='efa'

new LabExit("b_e",r,'e_room')
new LabExit("b_f",r,'f_room')
new LabExit("b_a",r,'a_room')

t=new Thing('note_b')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;Dr. Frankenstein kept the Hippocratic Oath, for a good price. The next patient will be Captain Ahab, but you've done enough for now. Secondary mission accomplished!&rdquo;</i>`,
  it:`<i>&ldquo;Il Dr. Frankenstein ha tenuto fede al giuramento di Ippocrate, dietro lauto compenso. Il prossimo paziente sarà il capitano Achab, ma per ora hai fatto abbastanza. Missione secondaria compiuta!&rdquo;</i>`
}
function dyingback_b() {
  movebookto('book_b','lectern_b')
  dyingback()
}
function dontdroptext_b() {
  movebookto('book_b','lectern_b')
  actiondone()
}
function droptext_b() {
  remove(getChar().objects,'book_b')
  getObj('book_b').loc='@void'
  const lect=getObj('lectern_b')
  remove(lect.objects,'book_b')
  lect.addObj(getObj('note_b'))
  actiondone()
}

//

r=new Room('laboratory')
r.name={en:'Dr. Frankenstein\'s laboratory',it:'laboratorio del Dr. Frankenstein'}
r.singleton=true
r.desc={
en:`The laboratory is a gloomy environment in which you can barely notice eerie instruments around a table well lit by the central light.`,
it:`Il laboratorio è un ambiente cupo in cui si notano a malapena inquietanti strumenti intorno a un {fr_table} ben illuminato dalla luce centrale.`
}

t=new Exit("fr_doorexit",r)
t.name={en:'door',it:'porta'}
t.it_femminile=true
t.closed=true
actions.fr_doorexit={gothrough:()=>backtolibrary('b_room',exitingback_b)}

t=new Person('Frankenstein')
t.name='Victor Frankenstein'
t.proper=true
t.desc={en:'An austere and professional looking man.',it:'Un uomo dall\'aspetto austero e professionale.'}
r.addObj(t)

t=new Person('fr_Long_John_Silver')
t.name="Long John Silver"
t.proper=true
t.desc={
  en:'A pirate with his left leg cut up below the hip and under the armpit a crutch which he uses with prodigious dexterity, hopping on it like a bird; he is tall and robust, with a face as broad as a ham, dull and vulgar, but illuminated by an intelligent smile.',
  it:'Un pirata con la gamba sinistra tagliata fin sotto l’anca e sotto l’ascella una gruccia della quale si serve con prodigiosa destrezza, saltellandovi sopra come un uccello; è alto e robusto, con una faccia larga come un prosciutto, scialba e volgare, ma rischiarata da un intelligente sorriso.'
}

newTopic('long_hi',
'where he is','dove si trova',false,
`"Welcome to my laboratory," you say to the pirate. "Here I carry out my daring experiments. Unfortunately they are very expensive operations and sometimes they fail, but aren't you ready to sacrifice yourself for the progress of science?"`,
`"Benvenuto nel mio laboratorio", dici al pirata. "Qui svolgo i miei arditi esperimenti. Purtroppo sono operazioni molto costose e talvolta non riescono, ma non siete pronto a immolarvi per il progresso della scienza?"`,
`Long Jonh smiled menacingly: "For your sake, surgery on the leg had better to be successful. I'm tired of jumping on this crutch!"`,
`Long Jonh sorrise: "Per il vostro bene è meglio che l'operazione chirurgica alla gamba riesca. Sono stanco di saltellare su questa gruccia!"`,
['long_money','long_ahab'],null,t
)

newTopic('long_money',
'about the money trasfer','del trasferimento di denaro',true,
`"Of course! Have you made the payment? These are expensive surgical operations."`,
`"Ma certo! Avete provveduto al versamento? Sono operazioni chirurgiche costose."`,
`"Expensive to say the least. The amount has already been paid into the Swiss account you have indicated. Your secretary knows about it, but can we go ahead now? I'm a little worried."`,
`"Costoso a dir poco. L'importo è già stato versato sul conto svizzero che mi avete indicato. La vostra segretaria ne è al corrente, ma ora possiamo precedere? Sono un po' preoccupato."`
)

newTopic('long_ahab',
'about his friends','dei suoi amici',true,
`"Of course! I hope you have told your pirate friends about this possibility. I also have a top-notch hand."`,
`"Ma certo! Spero che abbiate parlato di questa possibilità ai vostri amici pirati. Ho anche una mano di prima qualità."`,
`"I'll talk about it when I see the result. In fact, I have an acquaintance in mind who has a bone prosthesis in place of a leg. But now let's move on because I'm a little apprehensive."`,
`"Ne parlerò quando vedrò il risultato. In effetti, ho in mente un conoscente che ha una protesi d'osso al posto della gamba. Ora però procediamo perché sono un po' in apprensione."`
)

t=new Supporter('fr_table')
t.name={en:'autopsy table',it:'tavolo autoptico'}
t.desc={en:'The {fr_table} on which the doctor carries out his gruesome experiments.',it:'Il {fr_table} su cui il dottore svolge i suoi raccapriccianti esperimenti.'}
t.scenery=true
r.addObj(t)
t2=new Thing('fr_monster')
t2.name={en:'monster',it:'mostro'}
t2.desc={
en:'A gruesome inanimate {fr_monster}. You look at it disconsolately: despite all your efforts it doesn\'t work.',
it:'Un raccapricciante {fr_monster} inanimato. Lo osservi sconsolato: nonostante tutti i tuoi sforzi non funziona.'
}
t2.fixed=true
t2.pushable=true
actions.fr_monster={
  push:()=>{
    const garbage=getObj('fr_garbage')
    if(garbage.closed) msg(x(w.Cantdo)+' '+x(w.Itsclosed,garbage))
    else{
      const corpse=getObj('fr_monster')
      if(!corpse.pushable) msg(x(w.Cantdo))
      else{
        corpse.pushable=false
        msg(mark(x(ww.Monsterrolls,corpse,garbage)))
        const table=getObj('fr_table')
        remove(table.objects,'fr_monster')
        garbage.addObj(corpse)
        getObj('fr_monster').pushable=false
        showAll()
      }
    }
    return true
  },
}
t.addObj(t2)
t=new Container('fr_garbage')
t.name={en:'garbage dumpster',it:'cassonetto della spazzatura'}
t.fixed=true
t.desc={
  en:'The receptacle for your failed experiments that now is [open or closed].',
  it:'Il ricettacolo dei tuoi esperimenti falliti che ora è [aperto o chiuso].'
}
t.fixed=true
t.closed=true
t.closable=true
r.addObj(t)

t=new Container('fr_icer')
t.name={en:'icebox',it:'ghiacciaia'}
t.it_femminile=true
t.desc={en:'A {fr_icer}.',it:'Una {fr_icer}.'}
t.closed=true
t.closable=true
t.fixed=true
r.addObj(t)
t2=new Thing('fr_leg')
t2.name={en:'leg',it:'gamba'}
t2.it_femminile=true
t2.desc={en:'A whole {fr_leg} without the rest of the body.',it:'Una {fr_leg} intera senza il resto del corpo.'}
actions.fr_leg={
  put:(id,id2)=>{
    if(id2=='fr_Long_John_Silver'){
      getObj('fr_final').execute()
      return true
    }
    return false
  }
}
t.addObj(t2)
t2=new Thing('fr_hand')
t2.name={en:'hand',it:'mano'}
t2.it_femminile=true
t2.desc={en:'A {fr_hand} without the arm.',it:'Una {fr_hand} senza il resto del braccio.'}
t.addObj(t2)

t=new Sequence('fr_final')
action.fr_final=()=>missiondone('b_room',droptext_b)
t.par=[
{en:`
Dr. Frankenstein gets to work. A nice anesthesia, a wipe to the surfaces to fit together and everything is ready for the surgical operation. We hope that the confidence in the progress of science is well placed.
`,it:`
Il dr. Frankenstein si mette al lavoro. Una bella anestesia, una pulitina alle superfici da far combaciare e tutto è pronto per l'operazione chirurgica. Speriamo che la fiducia nei progressi della scienza sia ben riposta.
`}
]

//// Jules Verne

r=new Room('c_room')

r.name={
  en:'room &ldquo;Jules Verne&rdquo;',
  it:'sala &ldquo;Jules Verne&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_c}.`,
it:`Al centro della stanza c'è un {lectern_c}.`
}
r.enteringfirst={
en:`
You are in a circular room.
At the top, a plaque bears the name of Jules Verne printed
in golden letters that shine illuminated by the central light.
Along the walls there are shelves overloaded with books arranged in bulk.
`,it:`
Ti trovi in una sala circolare.
In alto una targa riporta stampato il nome di Jules Verne
in caratteri dorati che brillano illuminati dalla luce centrale.
Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.
`}

t=new Supporter('lectern_c')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_c={
  put:(id)=>{
    if(isOffstage('book_c')) return false
    if(getObj(id).transfer) flashtodream('book_c','Passepartout','London',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_c')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "Around the World in Eighty Days", translated from French by G.M. Towle.',
  it:'Un libro intitolato "Il giro del mondo in ottanta giorni".'
}
t.addObj(t2)
function dropbook_c() {
  movebookto('book_c','lectern_c')
  dropbook()
}
actions.book_c={
  take:()=>flashtodream('book_c','Passepartout','London'),
  drop:()=>backtolibrary('c_room',dropbook_c),
  put:()=>backtolibrary('c_room',dropbook_c)
}

t3=new Text('mark_c')
t3.name=ww.markname
t3.fixed=true
action.mark_c=()=>{
  const mark=getObj('mark_c')
  if(mark.cur==2){
    const burner=getObj('fr_burner')
    burner.desc={
      en:'A gas {fr_burner}. It is used to illuminate and heat the room. The burner is [on or off].',
      it:'Un {fr_burner} a gas. Viene usato per illuminare e riscaldare la stanza. Il bruciatore è [acceso o spento].'
    }
    burner.switchable=true
  }
}
t3.par=[
{en:`
In journeying eastward he had gone towards the sun, and the days
therefore diminished for him as many times four minutes as he crossed
degrees in this direction. There are three hundred and sixty degrees on
the circumference of the earth; and these three hundred and sixty
degrees, multiplied by four minutes, gives precisely twenty-four
hours—that is, the day unconsciously gained.
`,it:`
Viaggiando verso oriente, Phileas Fogg andava incontro al sole, e, per conseguenza, i giorni diminuivano per lui di quattro minuti quanti erano i gradi ch’egli percorreva in quella direzione. Ora, si contano trecentosessanta gradi sulla circonferenza terrestre, e questi trecentosessanta gradi, moltiplicati per quattro minuti, danno precisamente ventiquattr’ore, – vale a dire quel giorno inconsapevolmente guadagnato.
`},
{en:`
In other words, while
Phileas Fogg, going eastward, saw the sun pass the meridian <i>eighty</i>
times, his friends in London only saw it pass the meridian
<i>seventy-nine</i> times. This is why they awaited him at the Reform Club
on Saturday, and not Sunday, as Mr. Fogg thought.
<br>And Passepartout’s famous family watch, which had always kept London
time, would have betrayed this fact, if it had marked the days as well
as the hours and the minutes!
`,it:`
In altri termini, mentre Phileas Fogg, viaggiando verso oriente, vedeva il sole passare ottanta volte al meridiano, i suoi colleghi rimasti a Londra non lo vedevano passare che settantanove volte. Ecco perchè, quel giorno stesso, che era il sabato e non la domenica, come credeva il signor Fogg, questi lo aspettavano nel salone del Reform Club.
<br>Ed ecco ciò che il famoso orologio di Passepartout, ‒ che aveva sempre conservato l’ora di Londra, – avrebbe dimostrato, se, insieme ai minuti ed alle ore, avesse segnato anche i giorni!
`},
{en:`
Phileas Fogg, then, had won the twenty thousand pounds; but, as he had
spent nearly nineteen thousand on the way, the pecuniary gain was
small. His object was, however, to be victorious, and not to win money.
He divided the one thousand pounds that remained between Passepartout
and the unfortunate Fix, against whom he cherished no grudge. <i>He
deducted, however, from Passepartout’s share the cost of the gas which
had burned in his room for nineteen hundred and twenty hours, for the
sake of regularity</i>.
`,it:`
Phileas Fogg, dunque, aveva vinto le ventimila sterline; ma, avendone spesi quasi diciannovemila per strada, il guadagno fu mediocre. Tuttavia il suo obiettivo era quello di riuscire nell'impresa e non quello di vincere denaro.
Divise le mille sterline rimaste tra Passepartout
e lo sfortunato Fix, contro il quale non nutriva rancore. <i>Detrasse, invece, dalla quota di Passepartout il costo del gas che aveva bruciato nella sua stanza per millenovecentoventi ore, per amor di precisione</i>.
`},
]
t2.addObj(t3)

r.labexits='gha'

new LabExit("c_g",r,'g_room')
new LabExit("c_h",r,'h_room')
new LabExit("c_a",r,'a_room')

t=new Thing('note_c')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;You have successfully completed a secondary mission. Now Passepartout will no longer have to refund his master for the gas he forgot to turn off. You earned his {fr_watch}. Make good use of it.&rdquo;</i>`,
  it:`<i>&ldquo;Hai completato con successo una missione secondaria. Ora Passepartout non dovrà più rimborsare il suo padrone per il gas che si era dimenticato di spegnere. Ci hai guadagnato il suo {fr_watch}. Fanne buon uso.&rdquo;</i>`
}
function dyingback_c() {
  movebookto('book_c','lectern_c')
  dyingback()
}
function dontdroptext_c() {
  movebookto('book_c','lectern_c')
  actiondone()
}
function droptext_c() {
  remove(getChar().objects,'book_c')
  getObj('book_c').loc='@void'
  const lect=getObj('lectern_c')
  remove(lect.objects,'book_c')
  lect.addObj(getObj('note_c'))
  actiondone()
}

//

r=new Room('London')
r.name={en:'Passepartout\'s room',it:'stanza di Passepartout'}
r.it_femminile=true
r.desc={
en:`A comfortable room that houses the butler.`,
it:`Una stanza confortevole che ospita il maggiordomo della casa.`
}

t=new Supporter('fr_mantel')
t.name={en:'mantel',it:'mensola'}
t.it_femminile=true
t.desc={en:'A {fr_mantel}.',it:'Una {fr_mantel}.'}
t.fixed=true
r.addObj(t)
t2=new Thing('fr_clock')
t2.name={en:'clock',it:'orologio'}
t2.desc={
  en:'An electric {fr_clock}. It\'s [hour and minutes].',
  it:'Un {fr_clock} elettrico. Indica le [ora e minuti].'}
t2.fixed=true
t.addObj(t2)
t=new Thing('fr_bell')
t.name={en:'bell',it:'campanella'}
t.it_femminile=true
t.desc={en:'An electric {fr_bell}. It\'s ringing.',it:'Una {fr_bell} elettrica. Sta suonando.'}
t.fixed=true
r.addObj(t)
t=new Thing('fr_tube')
t.name={en:'tube',it:'tubo'}
t.desc={
  en:'A {fr_tube} to communicate remotely by voice. Through it, you hear Phileas Fogg repeating: "Move Passepartout! We must leave."',
  it:'Un {fr_tube} per comunicare a voce a distanza. Attraverso di esso, senti Phileas Fogg che ripete: "Muoviti Passepartout! Dobbiamo partire".'}
t.fixed=true
r.addObj(t)
t=new Thing('fr_burner')
t.name={en:'burner',it:'bruciatore'}
t.desc={
  en:'A gas {fr_burner}. It is used to illuminate and heat the room.',
  it:'Un {fr_burner} a gas. Viene usato per illuminare e riscaldare la stanza.'}
t.fixed=true
t.switchedon=true
r.addObj(t)

t=new Person('Passepartout')
t.name='Jean Passepartout'
t.proper=true
t.desc={
  en:`A nice guy with a mild and helpful disposition.`,
  it:`Un bravo ragazzo dal carattere mite e servizievole.`
}
r.addObj(t)
t2=new Thing('fr_watch')
t2.name={en:'watch',it:'orologio'}
t2.desc={
  en:'A pocket {fr_watch}. It\'s [hour and minutes].',
  it:'Un {fr_watch} da taschino. Indica le [ora e minuti].'}
t2.wearable=true
actions.fr_watch={
  put:(id,id2)=>{
    const person=getObj(id2)
    if(person.type=='person'){
      if(person.asleep)
        msg(x(ww.Itssleeping,person,getObj(id)))
      else if(person.dead)
        msg(x(ww.Itsdead,person,getObj(id)))
      else
        msg(x(ww.Thanksbutrefuses,person))
      return true
    }
    return false
  }
}
wear(t2,t)

t=new Exit("fr_door",r)
t.name={en:'door',it:'porta'}
actions.fr_door={
  gothrough:()=>{
    if(getObj('fr_burner').switchedon)
      backtolibrary('c_room',dropbook_c)
    else{
      const watch=getObj('fr_watch')
      wear(watch,getObj('Passepartout'))
      watch.transfer=true
      missiondone('c_room',droptext_c)
    }
    return true
  }
}

//// Robert Louis Stevenson

r=new Room('d_room')
r.name={
  en:'room &ldquo;Robert Louis Stevenson&rdquo;',
  it:'sala &ldquo;Robert Louis Stevenson&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_d}.`,
it:`Al centro della stanza c'è un {lectern_d}.`
}
r.enteringfirst={
en:
`You are in a circular room.
At the top, a plaque bears the name of Robert Stevenson printed
in golden letters that shine illuminated by the central light.
Along the walls there are shelves overloaded with books arranged in bulk.`
,it:
`Ti trovi in una sala circolare.
In alto una targa riporta stampato il nome di Robert Stevenson
in caratteri dorati che brillano illuminati dalla luce centrale.
Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
}

t=new Supporter('lectern_d')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_d={
  put:(id)=>{
    if(isOffstage('book_d')) return false
    if(getObj(id).transfer) flashtodream('book_d','Long_John_Silver','ti_tavern',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_d')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "Treasure Island".',
  it:'Un libro intitolato "L\'isola del tesoro".'
}

function dropbook_d() {
  movebookto('book_d','lectern_d')
  dropbook()
}
actions.book_d={
  take:()=>flashtodream('book_d','Long_John_Silver','ti_tavern'),
  drop:()=>backtolibrary('d_room',dropbook_d),
  put:()=>backtolibrary('d_room',dropbook_d)
}
t.addObj(t2)

t3=new Text('mark_d')
t3.name=ww.markname
t3.fixed=true
t3.par=[
{en:`
ALL that night we were in a great bustle getting things stowed in their
place, and boatfuls of the squire’s friends, Mr. Blandly and the like,
coming off to wish him a good voyage and a safe return. We never had
a night at the Admiral Benbow when I had half the work; and I was
dog-tired when, a little before dawn, the boatswain sounded his pipe
and the crew began to man the capstan-bars. I might have been twice
as weary, yet I would not have left the deck, all was so new and
interesting to me--the brief commands, the shrill note of the whistle,
the men bustling to their places in the glimmer of the ship’s lanterns.
`,it:`
Tutta quella notte ci fu un grande trambusto a bordo per stivare a dovere ogni cosa e ricevere canotti pieni di amici del cavaliere, tra cui il signor Blandly, che venivano per augurare buona traversata e felice ritorno. Non ebbi mai all’“Ammiraglio Benbow” una notte dove faticassi così tanto; sicché, quando poco prima dell’alba il nostromo soffiò nel suo fischietto e la ciurma s’affrettò alle barre dell’argano, io ero stanco come una bestia da soma. Ma, anche due volte piú stanco, non avrei abbandonato il ponte: ogni cosa m’era cosí nuova e curiosa: i rapidi comandi, il suono acuto del fischietto, le ombre degli uomini correnti ai loro posti nella debole luce dei fanali di bordo.
`},
{en:`
“Now, Barbecue, tip us a stave,” cried one voice.
<br>“The old one,” cried another.
<br>“Aye, aye, mates,” said Long John, who was standing by, with his crutch
under his arm, and at once broke out in the air and words I knew so
well:
<br>“Fifteen men on the dead man’s chest--”
<br>And then the whole crew bore chorus:--
<br>“Yo-ho-ho, and a bottle of rum!”
<br>And at the third “Ho!” drove the bars before them with a will.
`,it:`
«Su, Barbecue» gridò uno «dacci un ritornello.»
<br>«Quello d’una volta» gridò un altro.
<br>«Sì, compagni, sì» rispose Long John, che stava lì vicino con la sua gruccia sotto l’ascella e senza indugio intonò la canzone a me ben nota.
<br><i>«Quindici uomini sopra la cassa del morto&hellip;»</i>
<br>E l’intero equipaggio riprese in coro:
<br><i>«Yò hò-hò – e una bottiglia di rum!»</i>
<br>Al terzo <i>hò!</i> tutti insieme fecero forza sulle barre dell’argano.
`},
{en:`
Even at that exciting moment it carried me back to the old Admiral
Benbow in a second, and I seemed to hear the voice of the captain piping
in the chorus. But soon the anchor was short up; soon it was hanging
dripping at the bows; soon the sails began to draw, and the land and
shipping to flit by on either side; and before I could lie down to
snatch an hour of slumber the HISPANIOLA had begun her voyage to the
Isle of Treasure.
`,it:`
Per quanto interessante fosse quella scena, io d’un tratto fui riportato al vecchio “Ammiraglio Benbow” e mi sembrò di distinguere nel coro la voce del capitano. Ma presto l’àncora emerse e penzolò gocciolante alla prua, presto le vele incominciarono a gonfiarsi e la terra e le navi a fuggire da una banda e dall’altra. Prima che io fossi sceso giú a schiacciare un sonnellino, già l’Hispaniola s’era incamminata verso l’Isola del Tesoro.
`},
]
t2.addObj(t3)

r.labexits='ija'

new LabExit("d_i",r,'i_room')
new LabExit("d_j",r,'j_room')
new LabExit("d_a",r,'a_room')

t=new Thing('note_d')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;And so Long John Silver got hold of Billy Bones' key and was able to open the chest in his room finding Captain Flint's treasure island map. How he recovered the treasure is another story, but we are interested in the sequel. In fact, the treasure will be used to pay an expensive operation: a leg transplant. But who could carry out such a daring surgical operation? This secondary mission is not over yet.&rdquo;</i>`,
  it:`<i>&ldquo;E così Long John Silver si impadronì della chiave di Billy Bones e potè aprire il baule nella sua camera trovando la mappa dell'isola del tesoro del capitano Flint. Come recuperò il tesoro è un'altra storia, ma a noi interessa il seguito. Infatti il tesoro servirà a pagare una costosa operazione: un trapianto di gamba. Ma chi potrebbe compiere un'operazione chirurgica così ardita? Questa missione non è ancora terminata.&rdquo;</i>`
}
function exitingback_d() {
  movebookto('book_d','lectern_d')
  exitingback()
}
function dyingback_d() {
  movebookto('book_d','lectern_d')
  dyingback()
}
function dontdroptext_d() {
  movebookto('book_d','lectern_d')
  actiondone()
}
function droptext_d() {
  remove(getChar().objects,'book_d')
  getObj('book_d').loc='@void'
  const lect=getObj('lectern_d')
  remove(lect.objects,'book_d')
  lect.addObj(getObj('note_d'))
  const monster=getObj('fr_monster')
  const table=getObj('fr_table')
  remove(table.objects,'fr_monster')
  table.addObj(getObj('fr_Long_John_Silver'))
  actiondone()
}

//

r=new Room('ti_tavern')
r.name={en:`hall of &ldquo;Admiral Benbow&rdquo;'s inn`,it:`sala della locanda &ldquo;Ammiraglio Benbow&rdquo;`}
t.it_femminile=true
r.desc={
en:`A {ti_table} that {Billy_Bones} is sitting at.`,
it:`Un {ti_table} a cui è seduto {Billy_Bones}.`
}

t=new Exit("ti_door",r)
t.name={en:'entrance door',it:'porta d\'ingresso'}
t.it_femminile=true
t.closed=true
actions.ti_door={gothrough:()=>backtolibrary('d_room',exitingback_d)}

t=new Exit("ti_stairs",r)
t.name={en:'stairs to the upper floor',it:'scale per il piano superiore'}
t.plural=true
t.it_femminile=true
t.closed=true
actions.ti_stairs={gothrough:()=>backtolibrary('d_room',exitingback_d)}

t=new Supporter('ti_table')
t.name={en:'table',it:'tavolo'}
t.desc={en:'A plank of rough wood.',it:'Un tavolaccio di legno grezzo.'}
t.scenery=true
r.addObj(t)
t2=new Thing('ti_bottle')
t2.name={en:'bottle',it:'bottiglia'}
t2.it_femminile=true
t2.desc={en:'A {ti_bottle} of rum.',it:'Una {ti_bottle} di rum.'}
actions.ti_bottle={
  take:(id)=>{
    const billy=getObj('Billy_Bones')
    if(billy.dead) return false
    msg(x(ww.Cantakeonly,getObj(id),getObj('ti_glass')))
    return true
  },
  put:(id,id2)=>{
    if(id2!='ti_glass') return false
    const glass=getObj('ti_glass')
    if(glass.objects.length>0) {
      msg(x(ww.Alreadyfullempty,glass))
      return true
    }
    const rum=getObj('ti_rum')
    msg(x(ww.Youfilled,glass,rum))
    glass.addObj(rum)
    return true
  }
}
t.addObj(t2)
t2=new Container('ti_glass')
t2.name={en:'glass',it:'bicchiere'}
t2.desc={en:'The {ti_glass} is [full or empty].',it:'Un {ti_glass} [pieno o vuoto].'}
t2.rules=['+small']
actions.ti_glass={
  take:(id)=>{
    const billy=getObj('Billy_Bones')
    if(billy.dead) return false
    msg(x(ww.Canttake,getObj(id),billy))
    return true
  },
}
t.addObj(t2)
t3=new Thing('ti_rum')
t3.name='rum'
t3.uncount=true
t3.small=true
t3.desc={en:'Some {ti_rum} that burns guts.',it:'Del {ti_rum} bruciabudella.'}
t3.fixed=true
t3.drinkable=true

t=new Person('Billy_Bones')
t.name='Billy Bones'
t.proper=true
t.desc={
  en:'A true retired pirate. Around his neck he wears a key that you want to get hold of.',
  it:'Un vero pirata in pensione. Al collo porta una chiave di cui ti vuoi impadronire.'}
t.scenery=true
r.addObj(t)

newTopic('billy_talk',
'about the good old days','dei bei vecchi tempi',false,
`You talk to him nostalgically of the good old days.`,`Gli parli con nostalgia dei bei vecchi tempi.`,
`He takes the opportunity to feed you some boring anecdote.`,`Lui ne approfitta per propinarti qualche suo noioso aneddoto.`,
['billy_talk'],null,t
)

t=new Supporter('ti_bench')
t.name={en:'bench',it:'panca'}
t.it_femminile=true
t.desc={en:'A {ti_bench} near the {Billy_Bones}\'s {ti_table}.',it:'Una {ti_bench} accanto al {ti_table} di {Billy_Bones}.'}
t.fixed=true
t.seatable=true
r.addObj(t)

t=new Person('Long_John_Silver')
t.name="Long John Silver"
t.proper=true
t.desc={
  en:'A tall and robust pirate with the left leg cut up below the hip.',
  it:'Un pirata alto e robusto con la gamba sinistra tagliata fin sotto l’anca.'}
r.addObj(t)

t2=new Thing('ti_crutch')
t2.name={en:'crutch',it:'gruccia'}
t2.it_femminile=true
t2.desc={
  en:'A {ti_crutch} that you keep under the left armpit and use with prodigious dexterity, hopping on it like a little bird.',
  it:'Una {ti_crutch} che tieni sotto l’ascella sinistra e di cui ti servi con prodigiosa destrezza, saltellandovi sopra come un uccellino.'
}
actions.ti_crutch={
  drop:id=>{
    dodrop(id,true)
    msg(x(ww.Dropcrutch,getObj(id)))
    return true
  },
  take:id=>{
    dotake(id,true)
    msg(x(ww.Takecrutch,getObj(id)))
    return true
  }
}
t.addObj(t2)

t=new Sequence('ti_final')
action.ti_final=()=>missiondone('d_room',droptext_d)
t.par=[
{en:`
It's time to put the plan into action. If you understand correctly reading a book, one of those pills is poisoned. But which? You think about it and you conclude that it doesn't matter. You'll put them both in Billy Bones's glass. But you have to find a way to distract him, because he would certainly notice even if half drunk.
`,it:`
È il momento di mettere in atto il piano. Se hai ben capito leggendo un libro, una di quelle pillole è avvelenata. Ma quale? Ci rifletti e concludi che non importa. Le metterai entrambe nel bicchiere di Billy Bones. Però bisogna trovare un modo per distrarlo, perché se ne accorgerebbe di certo anche se mezzo ubriaco.
`},
{en:`
Thinking hard, you remeber of a pirate trick old like piracy.
<br>You point to a spot behind Billy and yell, "Look! A three-headed monkey!"
<br>The pirate turns and you take the opportunity to throw the pills into the rum.
`,it:`
Pensa che ti ripensa, ti viene in mente un trucco piratesco vecchio come la pirateria.
<br>Indichi un punto alle spalle di Billy e gridi: "Guarda! Una scimmia a tre teste!"
<br>Il pirata si volta e ne approfitti per gettare le pillole nel rum.
`},
{en:`
After a moment of bewilderment, Billy turns around smiling. "Same old trick and I always fall for it."
<br>You reply: "Sooner or later the three-headed monkey will really be there."
<br>"But no one will turn around anymore," Billy adds laughing and gulps down the rum in his glass.
`,it:`
Dopo un'istante di sconcerto, Billy si volta sorridendo. "Il solito vecchio trucco e ci casco sempre".
<br>Rispondi: "Prima o poi la scimmia a tre teste ci sarà davvero".
<br>"Ma non si volterà più nessuno", aggiunge Billy ridendo e tracanna il rum che ha nel bicchiere.
`},
{en:`
Billy Bones colors: red, Pompeian red, lobster orange, purple, purple funeral decoration, dark blue. When dark blue, Billy went into a cardiorespiratory crisis and soon passed away.
`,it:`
Colori di Billy Bones: rosso, rosso pompeiano, arancio aragosta, viola, viola addobbo funebre, blu tenebra. Sul blu tenebra Billy andò in crisi cardiorespiratoria e dopo poco spirò.
`},
{en:`
The event caused quite a stir in the inn and you took the opportunity to steal the key of the Billy Bones' chest. Then it took a little while to find the room, open the chest and get Captain Flint's treasure map. Sure, you kind of felt sorry for poor Billy, but the treasure would serve a good cause.
`,it:`
L'evento provocò non poco trambusto nella locanda e tu ne approfittasti per appropriarti della chiave del baule di Billy Bones. Poi ci volle poco per trovare la camera, aprire il baule e ottenere la mappa del tesoro di capitan Flint. Certo, un po' ti dispiaceva per il povero Billy, ma il tesoro sarebbe servito per una buona causa.
`},
]

//// Arthur Conan Doyle

r=new Room('e_room')
r.name={
  en:'room &ldquo;Arthur Conan Doyle&rdquo;',
  it:'sala &ldquo;Arthur Conan Doyle&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_e}.`,
it:`Al centro della stanza c'è un {lectern_e}.`
}
r.enteringfirst={
  en:
  `You are in a circular room.
  At the top, a plaque bears the name of Arthur Conan Doyle printed
  in golden letters that shine illuminated by the central light.
  Along the walls there are shelves overloaded with books arranged in bulk.`
  ,it:
  `Ti trovi in una sala circolare.
  In alto una targa riporta stampato il nome di Arthur Conan Doyle
  in caratteri dorati che brillano illuminati dalla luce centrale.
  Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
  }
  
t=new Supporter('lectern_e')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_e={
  put:(id)=>{
    if(isOffstage('book_e')) return false
    if(getObj(id).transfer) flashtodream('book_e','Lestrade','sr_room',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_e')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "A Study In Scarlet".',
  it:'Un libro intitolato "Uno studio in rosso".'
}

function dropbook_e() {
  movebookto('book_e','lectern_e')
  dropbook()
}
actions.book_e={
  take:()=>flashtodream('book_e','Lestrade','sr_room'),
  drop:()=>backtolibrary('e_room',dropbook_e),
  put:()=>backtolibrary('e_room',dropbook_e)
}
t.addObj(t2)

t3=new Text('mark_e')
t3.name=ww.markname
t3.fixed=true
action.mark_e=()=>{
  const mark=getObj('mark_e')
  if(mark.cur==2) getObj('sr_window').closable=true
}
t3.par=[
{en:`
As he spoke he turned the contents of the wine glass into a saucer and
placed it in front of the terrier, who speedily licked it dry. Sherlock
Holmes’ earnest demeanour had so far convinced us that we all sat in
silence, watching the animal intently, and expecting some startling
effect. None such appeared, however. The dog continued to lie stretched
upon the cushion, breathing in a laboured way, but apparently
neither the better nor the worse for its draught.
`,it:`
Così dicendo, versò il contenuto del bicchiere in un piattino e lo mise davanti al terrier che subito lo asciugò con la lingua.
<br>La sfrontata sicurezza di Holmes ci aveva convinti a tal punto che tutti e tre restammo in silenzio a osservare l'animale, con la massima attenzione, aspettandoci di notare qualche sintomo sconcertante. Ma non accadde nulla. Il cane rimase adagiato sul cuscino. Continuava a respirare affannosamente, ma era chiaro che la miscela non gli aveva fatto né caldo né freddo.
`},
{en:`
Holmes had taken out his watch, and as minute followed minute without
result, an expression of the utmost chagrin and disappointment appeared
upon his features. He gnawed his lip, drummed his fingers upon the
table, and showed every other symptom of acute impatience. So great
was his emotion, that I felt sincerely sorry for him, while the two
detectives smiled derisively, by no means displeased at this check which
he had met.
`,it:`
Holmes aveva tirato fuori l'orologio. Col passar dei minuti, un'espressione di profondo sconforto e di disappunto apparve sulla sua faccia. Egli si mordicchiava le labbra, tamburellava con le dita sulla tavola, tradiva, insomma, una grande impazienza. La sua emozione era tanto profonda che io provai un vero senso di pena per lui, ma i due
investigatori lo fissavano con un sorriso di derisione, tutt'altro che scontenti di quello scacco.
`},
{en:`
“It can’t be a coincidence,” he cried, at last springing from his chair
and pacing wildly up and down the room; “it is impossible that it should
be a mere coincidence. <i>The very pills which I suspected in the case of
Drebber are actually found on the window sill after the death of Stangerson</i>.
And yet they are inert. What can it mean? Surely my whole chain of reasoning
cannot have been false. It is impossible! And yet this wretched dog is none the worse.
`,it:`
"Non può essere una semplice coincidenza!" proruppe Holmes balzando in piedi e mettendosi a passeggiare su e giù per la stanza. "Non è ammissibile che si tratti di una pura coincidenza. <i>Proprio le pillole di cui io sospettavo l'esistenza nel caso Drebber vengono trovate sul davanzale della finestra dopo la morte di Stangerson</i>&hellip; eppure sono innocue. Che cosa significa? La mia tesi non può essere errata da cima a fondo. É impossibile! Eppure, il cane sta benissimo".
`},
{en:`
“Ah, I have it! I have it!” With a perfect shriek of delight he
rushed to the box, cut the other pill in two, dissolved it, added milk,
and presented it to the terrier. The unfortunate creature’s tongue
seemed hardly to have been moistened in it before it gave a convulsive
shiver in every limb, and lay as rigid and lifeless as if it had been
struck by lightning.
`,it:`
"Ah, ho trovato. Ho trovato"
<br>Con un grido di gioia si precipitò a riprendere la scatoletta, tagliò in due l'altra pillola, la
sciolse, vi aggiunse il latte e tornò a porgere il piattino al cane.
La povera bestiola aveva appena bagnato la lingua nel liquido, quando fu scossa in tutte le
membra da un fremito convulso, poi si afflosciò senza vita come se fosse stata fulminata.
`},
]
t2.addObj(t3)

r.labexits='kbj'

new LabExit("e_k",r,'k_room')
new LabExit("e_b",r,'b_room')
new LabExit("e_j",r,'j_room')

t=new Thing('note_e')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;What use could the pills that Lestrade recovered from the crime scene serve? Maybe to commit another crime!&rdquo;</i>`,
  it:`<i>&ldquo;A cosa potrebbero servire le pillole che Lestrade ha recuperato dal luogo del delitto? Magari per compiere un altro delitto!&rdquo;</i>`
}
function dyingback_e() {
  movebookto('book_e','lectern_e')
  dyingback()
}
function exitingback_e() {
  movebookto('book_e','lectern_e')
  exitingback()
}
function dontdroptext_e() {
  movebookto('book_e','lectern_e')
  actiondone()
}
function droptext_e() {
  remove(getChar().objects,'book_e')
  getObj('book_e').loc='@void'
  const lect=getObj('lectern_e')
  remove(lect.objects,'book_e')
  lect.addObj(getObj('note_e'))
  actiondone()
}


//

r=new Room('sr_room')
r.name={en:'room in Halliday’s Private Hotel',it:'stanza dell\'Halliday’s Private Hotel'}
r.it_femminile=true
r.desc={
en:`A hotel room with a single {sr_window} facing the street and {sr_blood} on the floor.`,
it:`Una stanza d'albergo con una singola {sr_window} che dà sulla strada e del {sr_blood} sul pavimento.`
}

t=new Thing('sr_blood')
t.name={en:'blood',it:'sangue'}
t.desc={
  en:`The blood with a trickle has reached the door jamb. Be careful not to slip on it.`,
  it:`Il sangue con un rivolo è giunto fin sullo stipite della porta. Fai attenzione a non scivolarci sopra.`}
t.scenery=true
r.addObj(t)

t=new Person('sr_body')
t.name={en:'body',it:'corpo'}
t.desc={
  en:`The {sr_body} of a man in his nightdress, limbs rigid and cold, deep stab in the left side, which must have penetrated the heart.`,
  it:`Il {sr_body} di un uomo in camicia da notte, arti rigidi e freddi, profonda pugnalata al fianco sinistro, che deve essere penetrata nel cuore.`
}
t.dead=true
t.pushable=true
t.pullable=true
const showrache=()=>{
  msg(x(ww.Stangersonrolls))
  const body=getObj('sr_body')
  body.pushable=false
  body.pullable=false
  return true
}
actions.sr_body={
  pull:()=>showrache(),
  push:()=>showrache(),
}
r.addObj(t)

t=new Container('sr_basin')
t.name={en:'basin',it:'bacinella'}
t.it_femminile=true
t.desc={en:`There is blood-stained water in the {sr_basin}.`,it:'C\'è dell\'acqua macchiata di sangue nella {sr_basin}.'}
t.fixed=true
r.addObj(t)
t2=new Thing('sr_sheet')
t2.name={en:'sheet',it:'asciugamano'}
t2.desc={
  en:`A {sr_sheet} with marks where the culprit had deliberately wiped his knife.`,
  it:'Un {sr_sheet} con segni in cui il colpevole ha deliberatamente pulito il coltello.'
}
t.addObj(t2)

t=new Supporter('sr_chair')
t.name={en:'chair',it:'sedia'}
t.it_femminile=true
t.desc={en:`A {sr_chair}.`,it:`Una {sr_chair}.`}
t.seatable=true
r.addObj(t)

t2=new Thing('sr_pipe')
t2.name={en:'pipe',it:'pipa'}
t2.it_femminile=true
t2.desc={en:`A {sr_pipe}.`,it:`Una {sr_pipe}.`}
t.addObj(t2)

t=new Supporter('sr_table')
t.name={en:'table',it:'tavolo'}
t.desc={en:`A {sr_table}.`,it:`Un {sr_tavolo}.`}
t.fixed=true
r.addObj(t)

t2=new Container('sr_glass')
t2.name={en:'glass',it:'bicchiere'}
t2.desc={en:`A {sr_glass}.`,it:`Un {sr_glass}.`}
t.addObj(t2)

t3=new Thing('sr_water')
t3.name={en:'water',it:'acqua'}
t3.it_femminile=true
t3.uncount=true
t3.drinkable=true
t3.fixed=true
t3.desc={en:`Some {sr_water}.`,it:`Dell'{sr_water}.`}
t2.addObj(t3)

t2=new Container('sr_purse')
t2.name={en:'purse',it:'portafoglio'}
t2.desc={en:`A {sr_purse}.`,it:`Un {sr_purse}.`}
t2.closed=true
t2.closable=true
t.addObj(t2)

t3=new Thing('sr_money')
t3.name={en:'80 pounds',it:'80 sterline'}
t3.it_femminile=true
t3.plural=true
t3.desc={en:`{sr_money}.`,it:`{sr_money}.`}
t2.addObj(t3)

t3=new Thing('sr_telegram')
t3.name={en:'telegram',it:'telegramma'}
t3.desc={en:`A {sr_telegram}.`,it:`Un {sr_telegram}.`}
t3.readable=true
t3.text={
  en:`‘J.H. is in Europe’. There is no name appended to the message sent from Cleveland about a month ago.`,
it:`‘J.H. è in Europa’. Non c'è nessun nome in calce al messaggio inviato da Cleveland circa un mese fa.`}
t2.addObj(t3)

t=new Supporter('sr_bed')
t.name={en:'bed',it:'letto'}
t.desc={en:`A {sr_bed}.`,it:`Un {sr_bed}.`}
t.fixed=true
t.seatable=true
r.addObj(t)

t2=new Container('sr_novel')
t2.name={en:'novel',it:'romanzo'}
t2.desc={en:`A {sr_novel} entitled "Mody Dick".`,it:`Un {sr_novel} intitolato "Moby Dick".`}
t.addObj(t2)

t3=new Text('mark_sr')
t3.name={en:'folded page',it:'pagina piegata'}
t3.it_femminile=true
t3.fixed=true
t3.par=[
{en:`
Call me Ishmael. Some years ago—never mind how long precisely—having
little or no money in my purse, and nothing particular to interest me
on shore, I thought I would sail about a little and see the watery part
of the world. It is a way I have of driving off the spleen and
regulating the circulation.
`,it:`
Chiamatemi Ismaele. Alcuni anni fa – non importa quanti esattamente – avendo pochi o punti denari in tasca e nulla di particolare che m’interessasse a terra, pensai di darmi alla navigazione e vedere la parte acquea del mondo. È un modo che ho io di cacciare la malinconia e di regolare la circolazione.
`},
{en:`
Whenever I find myself growing grim about
the mouth; whenever it is a damp, drizzly November in my soul; whenever
I find myself involuntarily pausing before coffin warehouses, and
bringing up the rear of every funeral I meet; and especially whenever
my hypos get such an upper hand of me, that it requires a strong moral
principle to prevent me from deliberately stepping into the street, and
methodically knocking people’s hats off—then, I account it high time to
get to sea as soon as I can. This is my substitute for pistol and ball.
`,it:`
Ogni volta che m’accorgo di atteggiare le labbra al torvo, ogni volta che nell’anima mi scende come un novembre umido e piovigginoso, ogni volta che m’accorgo di fermarmi involontariamente dinanzi alle agenzie di pompe funebri e di andar dietro a tutti i funerali che incontro, e specialmente ogni volta che il malumore si fa tanto forte in me che mi occorre un robusto principio morale per impedirmi di scendere risoluto in istrada e gettare metodicamente per terra il cappello alla gente, allora decido che è tempo di mettermi in mare al più presto. Questo è il mio surrogato della pistola e della pallottola.
`},
{en:`
With a philosophical flourish Cato throws himself upon his sword; I
quietly take to the ship. There is nothing surprising in this. If they
but knew it, almost all men in their degree, some time or other,
cherish very nearly the same feelings towards the ocean with me.`
,it:`
Con un bel gesto filosofico Catone si getta sulla spada: io cheto cheto mi metto in mare. Non c’è nulla di sorprendente in questo. Se soltanto lo sapessero, quasi tutti gli uomini nutrono, una volta o l’altra, ciascuno nella sua misura, su per giù gli stessi sentimenti che nutro io verso l’oceano.
`},
]
t2.addObj(t3)

t=new Person('Lestrade')
t.name='Inspector Lestrade'
t.proper=true
t.desc={
  en:`A little sallow rat-faced, dark-eyed fellow.`,
  it:`Un tipo minuto, olivastro, con la faccia da topo e gli occhi scuri.`
}
r.addObj(t)

t=new Container("sr_window")
t.name={en:'window',it:'finestra'}
t.it_femminile=true
t.desc={
  en:`A window overlooking the street below. Nobody is passing.`,
  it:`Una finestra con vista sulla strada sottostante. Non sta passando nessuno.`
}
t.scenery=true
t.closed=true
r.addObj(t)

t2=new Supporter('sr_sill')
t2.name={en:'sill',it:'davanzale'}
t2.desc={en:`The {sr_sill} of the window.`,it:`Il {sr_sill} della finestra.`}
t2.fixed=true
t.addObj(t2)

t3=new Container('sr_box')
t3.name={en:'ointment box',it:'scatoletta'}
t3.it_femminile=true
t3.desc={en:`An {sr_box}.`,it:`Una {sr_box}.`}
t3.closed=true
t3.closable=true
t2.addObj(t3)

t4=new Thing('sr_pills')
t4.name={en:'couple of pills',it:'paio di pillole'}
t4.edible=true
t4.small=true
t4.desc={en:`A {sr_pills}.`,it:`Un {sr_pills}.`}
actions.sr_pills={
  eat:()=>{
    if(getCharId()=='@yourself'){
      msg(x(ww.Youshouldreadcare2,getChar()))
      return true
    }
    msg(x(ww.Youshouldreadcare,getChar()))
    switch(getCharId()){
      case 'Lestrade':
        backtolibrary('e_room',dyingback_e)
        break
      case 'Alice':
        backtolibrary('a_room',dyingback_a)
        break
      case 'Frankenstein':
        backtolibrary('b_room',dyingback_b)
        break
      case 'Passepartout':
        backtolibrary('c_room',dyingback_c)
        break
      case 'Morris':
        backtolibrary('f_room',dyingback_f)
        break
      case 'Clefrin_Frelock':
        backtolibrary('g_room',dyingback_g)
        break
      case 'Edmond':
        backtolibrary('h_room',dyingback_h)
        break
      case 'Ulysses':
        backtolibrary('i_room',dyingback_i)
        break
      case 'Ishmael':
        backtolibrary('j_room',dyingback_j)
        break
      case 'Dante':
        msg(x(ww.Youalreadydead,getChar()))
        break
      case 'Geppetto':
        backtolibrary('l_room',dyingback_l)
        break
    }
    return true
  },
  put:(id,id2)=>{
    const person=getObj(id2)
    if(person.type=='person'){
      if(person.asleep)
        msg(x(ww.Itssleeping,person,getObj(id)))
      else if(person.dead)
        msg(x(ww.Itsdead,person,getObj(id)))
      else
        msg(x(ww.Thanksbutrefuses,person))
      return true
    }
    if(id2=='ti_glass') {
      const glass=getObj('ti_glass')
      if(isempty(glass)){
        msg(mark(x(ww.Glassempty,glass)))
        return true
      }
      doput('sr_pills','ti_glass',true)
      getObj('ti_final').execute()
      return true
    }
    return false
  },
  take:(id)=>{
    const pills=getObj(id)
    if(pills.loc!='sr_box') return false
    carry(pills)
    pills.transfer=true
    missiondone('e_room',droptext_e)
    return true
  }
}
t3.addObj(t4)

t=new Exit("sr_door",r)
t.name={en:'door',it:'porta'}
actions.sr_door={gothrough:()=>backtolibrary('e_room',exitingback_e)}

//// Bram Stoker

r=new Room('f_room')
r.name={
  en:'room &ldquo;Bram Stoker&rdquo;',
  it:'sala &ldquo;Bram Stoker&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_f}.`,
it:`Al centro della stanza c'è un {lectern_f}.`
}
r.enteringfirst={
  en:
  `You are in a circular room.
  At the top, a plaque bears the name of Bram Stoker printed
  in golden letters that shine illuminated by the central light.
  Along the walls there are shelves overloaded with books arranged in bulk.`
  ,it:
  `Ti trovi in una sala circolare.
  In alto una targa riporta stampato il nome di Bram Stoker
  in caratteri dorati che brillano illuminati dalla luce centrale.
  Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
  }
  

t=new Supporter('lectern_f')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_f={
  put:(id)=>{
    if(isOffstage('book_f')) return false
    if(getObj(id).transfer) flashtodream('book_f','Morris','dr_woods',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_f')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "Dracula".',
  it:'Un libro intitolato "Dracula".'
}

function dropbook_f() {
  movebookto('book_f','lectern_f')
  dropbook()
}
actions.book_f={
  take:()=>flashtodream('book_f','Morris','dr_woods'),
  drop:()=>backtolibrary('f_room',dropbook_f),
  put:()=>backtolibrary('f_room',dropbook_f)
}
t.addObj(t2)

t3=new Text('mark_f')
t3.name=ww.markname
t3.fixed=true
action.mark_f=()=>{
  const mark=getObj('mark_f')
  if(mark.cur==1){
    getObj('Morris').addObj(getObj('dr_knife'))
    showAll()
  }
}
t3.par=[
{en:`
By this time the gypsies, seeing themselves covered by the Winchesters,
and at the mercy of Lord Godalming and Dr. Seward, had given in and made
no resistance. The sun was almost down on the mountain tops, and the
shadows of the whole group fell long upon the snow. I saw the Count
lying within the box upon the earth, some of which the rude falling from
the cart had scattered over him. He was deathly pale, just like a waxen
image, and the red eyes glared with the horrible vindictive look which I
knew too well.
`,it:`
Nel frattempo, gli zingari vistisi sotto la minaccia dei Winchester, alla merce' di Lord Godalming e del dottor Seward, avevano rinunciato a ulteriori resistenze. Il disco del sole quasi sfiorava le vette, e le ombre degli uomini si proiettavano lunghe sulla neve. Ed ecco, ecco il Conte che giace nella sua cassa al suolo, in parte coperto di neve e terriccio in seguito alla brusca caduta. Era mortalmente
pallido, lo si sarebbe detto una figura di cera, e i rossi occhi ardevano di quell'orribile sguardo vendicativo che tanto bene conoscevo.
`},
{en:`
As I looked, the eyes saw the sinking sun, and the look of hate in them
turned to triumph.
<br>But, on the instant, came the sweep and flash of Jonathan's great knife.
I shrieked as I saw it shear through the throat; <i>whilst at the same
moment Mr. Morris's bowie knife plunged into the heart</i>.
<br>It was like a miracle; but before our very eyes, and almost in the
drawing of a breath, the whole body crumble into dust and passed from
our sight.
`,it:`
Mentre guardavo, gli occhi hanno scorto il sole calante e in essi l'espressione di odio si è mutata in una di trionfo. Ma, proprio in quel momento, giù piomba il lampo del coltellaccio di Jonathan. Ho lanciato un urlo quando l'ho visto fendere la gola, <i>e contemporaneamente il coltello "bowie" del signor Morris è sprofondato nel cuore del Vampiro</i>.
<br>È stato come un miracolo; sotto i nostri occhi, il tempo di un sospiro, l'intero corpo si è dissolto in polvere, scomparendo alla vista.
`},
{en:`
I shall be glad as long as I live that even in that moment of final
dissolution, there was in the face a look of peace, such as I never
could have imagined might have rested there.
<br>The Castle of Dracula now stood out against the red sky, and every stone
of its broken battlements was articulated against the light of the
setting sun.
`,it:`
Sarò lieta, finché avrò vita, del fatto che proprio in quell'attimo di dissoluzione finale sul volto gli si è dipinta un'espressione di pace, quale mai avrei
immaginato di scorgervi.
<br>Il castello di Dracula ora si stagliava sul cielo rosso, disegnando controluce ogni pietra degli spalti diroccati.
`},
]
t2.addObj(t3)

r.labexits='gbl'

new LabExit("f_g",r,'g_room')
new LabExit("f_b",r,'b_room')
new LabExit("f_l",r,'l_room')

t=new Thing('note_f')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;You have successfully completed the secondary mission you cared so much by freeing us from the cumbersome presence of Count Dracula. You've earned Quincey Morris' bowie knife. Make good use of it.&rdquo;</i>`,
  it:`<i>&ldquo;Hai completato con successo la missione secondaria a cui tenevi tanto liberandoci dall'ingombrante presenza del conte Dracula. Ci hai guadagnato il coltello bowie di Quincey Morris. Fanne buon uso.&rdquo;</i>`
}
function dyingback_f() {
  movebookto('book_f','lectern_f')
  dyingback()
}
function dontdroptext_f() {
  movebookto('book_f','lectern_f')
  actiondone()
}
function droptext_f() {
  remove(getChar().objects,'book_f')
  getObj('book_f').loc='@void'
  const lect=getObj('lectern_f')
  remove(lect.objects,'book_f')
  lect.addObj(getObj('note_f'))
  actiondone()
}

//

r=new Room('dr_woods')
r.name={en:'path to the Count\'s castle',it:'sentiero per il castello del conte'}
r.onloc=true
r.desc={
en:`
The setting sun is blushing the castle walls. Time seems to have crystallized, motionless, but at any moment even the last ray of sunshine will be eclipsed by the horizon. Terror paralyzes you.
`,
it:`Il sole al tramonto sta arrossando le mura del castello. Il tempo sembra cristallizzato, immobile, ma da un momento all'altro anche l'ultimo raggio di sole sarà eclissato dall'orizzonte. Il terrore ti paralizza.`
}

t=new Person('Morris')
t.name='Quincey Morris'
t.proper=true
t.desc={en:'A classic Texan, rich in addition.',it:'Un classico texano, per giunta ricco.'}
r.addObj(t)

t2=new Thing('dr_knife')
t2.name={en:'knife',it:'coltello'}
t2.desc={en:'A bowie {dr_knife}.',it:'Un {dr_knife} bowie.'}
actions.dr_knife={
  put:(id,id2)=>{
    if(id2!='Dracula') {
      const person=getObj(id2)
      if(person.type=='person'){
        if(person.asleep)
          msg(x(ww.Itssleeping,person,getObj(id)))
        else if(person.dead)
          msg(x(ww.Itsdead,person,getObj(id)))
        else
          msg(x(ww.Thanksbutrefuses,person))
        return true
      }
      return false
    }
    if(getObj('Morris').loc=='dr_wagon'){
      getObj('dr_knife').transfer=true
      getObj('dr_final').execute()
      return true
    }
    msg(x(w.Cantdo)+' '+x(w.Arenoton,getObj('dr_wagon')))
    return true
  }
}

t=new Supporter('dr_wagon')
t.name={en:'wagon',it:'carro'}
t.desc={en:'A {dr_wagon}.',it:'Un {dr_wagon}.'}
t.fixed=true
t.climbable=true
r.addObj(t)

t2=new Container('dr_box')
t2.name={en:'box',it:'cassa'}
t2.it_femminile=true
t2.desc={en:'A {dr_box}.',it:'Una {dr_box}.'}
t2.fixed=true
t.addObj(t2)

t3=new Person('Dracula')
t3.proper=true
t3.desc={
  en:'{Dracula} seems to gain strength as the darkness progresses. It\'s time to do something.',
  it:'{Dracula} sembra acquistare sempre più forze man mano che l\'oscurità avanza. È tempo di fare qualcosa.'}
t3.asleep=true
t2.addObj(t3)

t=new Sequence('dr_final')
action.dr_final=()=>missiondone('f_room',droptext_f)
t.par=[
{en:`
The last rays of sunshine dissolve and, just then, you drive your bowie knife into Count Dracula's chest piercing his heart.
`,it:`
Gli ultimi raggi di sole si dissolvono e, proprio in quel momento, conficchi il tuo coltello bowie nel petto del conte Dracula trafiggendogli il cuore.
`},
{en:`
In an instant the count's body crumbles, but first you have time to see a semblance of serenity spread like a veil over his face.
`,it:`
In un istante il corpo del conte si sbriciola, ma prima fai in tempo a vedere una parvenza di serenità stendersi come un velo sul suo volto.
`},
{en:`
The evening progresses and it's all over. What other adventures await you?
`,it:`
La sera avanza ed è tutto finito. Quali altre avventure ti attendono?
`},
]

//// Jonathan Swift

r=new Room('g_room')
r.name={
  en:'room &ldquo;Jonathan Swift&rdquo;',
  it:'sala &ldquo;Jonathan Swift&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_g}.`,
it:`Al centro della stanza c'è un {lectern_g}.`
}
r.enteringfirst={
  en:
  `You are in a circular room.
  At the top, a plaque bears the name of Jonathan Swift printed
  in golden letters that shine illuminated by the central light.
  Along the walls there are shelves overloaded with books arranged in bulk.`
  ,it:
  `Ti trovi in una sala circolare.
  In alto una targa riporta stampato il nome di Jonathan Swift
  in caratteri dorati che brillano illuminati dalla luce centrale.
  Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
  }
  
t=new Supporter('lectern_g')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_g={
  put:(id)=>{
    if(isOffstage('book_g')) return false
    if(getObj(id).transfer) flashtodream('book_g','Clefrin_Frelock','Lilliput',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_g')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "Gulliver’s Travels into several remote nations of the world".',
  it:'Un libro intitolato "Viaggi di Gulliver in vari paesi lontani del mondo".'
}

function dropbook_g() {
  movebookto('book_g','lectern_g')
  dropbook()
}
actions.book_g={
  take:()=>flashtodream('book_g','Clefrin_Frelock','Lilliput'),
  drop:()=>backtolibrary('g_room',dropbook_g),
  put:()=>backtolibrary('g_room',dropbook_g)
}
t.addObj(t2)

t3=new Text('mark_g')
t3.name=ww.markname
t3.fixed=true
action.mark_g=()=>{
  const mark=getObj('mark_g')
  if(mark.cur==1){
    const pocket=getObj('private_pocket')
    if(pocket.loc!='Gulliver') getObj('Gulliver').addObj(pocket)
  }
}
t3.par=[
{en:`
I arrived at the fleet in less than half an hour. The enemy was so
frightened when they saw me, that they leaped out of their ships, and
swam to shore, where there could not be fewer than thirty thousand
souls. I then took my tackling, and, fastening a hook to the hole at
the prow of each, I tied all the cords together at the end. While I was
thus employed, the enemy discharged several thousand arrows, many of
which stuck in my hands and face, and, beside the excessive smart, gave
me much disturbance in my work.
`,it:`
In meno di mezz'ora arrivai vicino alla flotta. <br>I nemici furono così atterriti al solo vedermi, che
si gettarono fuori dai loro vascelli come tanti ranocchi, e
si misero in salvo sulla terra ferma; giudicai che fossero
in numero di circa trentamila. Allora misi mano alle mie
funi, attaccai un gancio alla prua di ciascun vascello e
passai una fune in ogni gancio.
<br>Durante il mio lavoro fui bersaglio di una scarica di
molte migliaia di frecce, parecchie delle quali mi
colpirono al viso e alle mani, producendomi un gran
dolore e disturbandomi non poco.
`},
{en:`
My greatest apprehension was for my
eyes, which I should have infallibly lost, if I had not suddenly
thought of an expedient. <i>I kept, among other little necessaries, a pair
of spectacles in a private pocket, which, as I observed before, had
escaped the emperor’s searchers</i>. These I took out and fastened as
strongly as I could upon my nose, and thus armed, went on boldly with
my work, in spite of the enemy’s arrows, many of which struck against
the glasses of my spectacles, but without any other effect, further
than a little to discompose them.
`,it:`
Ma più che altro ero molto preoccupato per i miei occhi, che l'avrebbero veramente vista brutta se non avessi fatto appello all'espediente di <i>tirar fuori gli occhiali dal mio taschino segreto che, come ho detto, era sfuggito ai mandatari dell'imperatore</i>, e attaccarmeli sul naso più solidamente che potei. Così provvisto e difeso potei proseguire l'impresa senza curarmi della grandine di strali che mi cadeva addosso, perché battendo sui vetri degli occhiali non potevano far altro che scompormeli alquanto sul naso.
`},
{en:`
I had now fastened all the hooks,
and, taking the knot in my hand, began to pull; but not a ship would
stir, for they were all too fast held by their anchors, so that the
boldest part of my enterprise remained. I therefore let go the cord,
and leaving the hooks fixed to the ships, I resolutely cut with my
knife the cables that fastened the anchors, receiving about two hundred
shots in my face and hands; then I took up the knotted end of the
cables, to which my hooks were tied, and with great ease drew fifty of
the enemy’s largest men of war after me.
`,it:`
Attaccati tutti i ganci, cominciai a tirare, ma invano, perché tutti i vascelli erano ancorati; allora col mio coltellaccio tagliai i cavi che tenevano le ancore, e ciò fatto potei facilmente portar via i cinquanta vascelli più grossi e trascinarli dietro a me.
`},
]
t2.addObj(t3)

r.labexits='cfk'

new LabExit("g_c",r,'c_room')
new LabExit("g_f",r,'f_room')
new LabExit("g_k",r,'k_room')

t=new Thing('note_g')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;What could Gulliver's oversized glasses be for? Maybe to improve the sight of a giant who, for some reason, sees little.&rdquo;</i>`,
  it:`<i>&ldquo;A cosa potrebbero servire gli occhiali ingigantiti di Gulliver? Magari per migliorare la vista di un gigante che, per qualche ragione, ci vede poco.&rdquo;</i>`
}
function dyingback_g() {
  movebookto('book_g','lectern_g')
  dyingback()
}
function dontdroptext_g() {
  movebookto('book_g','lectern_g')
  actiondone()
}
function droptext_g() {
  remove(getChar().objects,'book_g')
  getObj('book_g').loc='@void'
  const lect=getObj('lectern_g')
  remove(lect.objects,'book_g')
  lect.addObj(getObj('note_g'))
  actiondone()
}

//

r=new Room('Lilliput')
r.name={en:`beach of Lilliput`,it:`spiaggia di Lilliput`}
r.it_femminile=true
r.onloc=true
r.desc={
en:`That giant on the beach has attracted the attention of the inhabitants of Lilliput who now surround him a little frightened but very intrigued.`,
it:`Quel gigante sulla spiaggia ha attirato l'attenzione degli abitanti di Lilliput che ora lo circondano un po' intimoriti ma molto incuriositi.`
}

t=new Person('Clefrin_Frelock')
t.name='Clefrin Frelock'
t.proper=true
t.desc={en:'A Lilliputian officer six inches tall.',it:'Un ufficiale lillipuziano alto 15 centimetri.'}
r.addObj(t)

t=new Person('Gulliver')
t.name='Lemuel Gulliver'
t.proper=true
t.fixed=true
t.asleep=true
t.desc={
en:'A true giant by Lilliputian standards. He is now on his back, unconscious and tied with ropes and pegs on the sand of the beach.',
it:'Un vero gigante per gli standard lillipuziani. Ora è supino, privo di sensi e legato con corde e picchetti sulla sabbia della spiaggia.'
}
r.addObj(t)

t2=new Container('private_pocket')
t2.name={en:'private pocket',it:'tasca nascosta'}
t2.it_femminile=true
t2.desc={
  en:'A {private_pocket} you wouldn\'t have noticed if you hadn\'t read the novel.',
  it:'Una {private_pocket} che non avresti notato se non avessi letto il romanzo.'
}
t2.closed=true
t2.closable=true
t2.fixed=true

t3=new Thing('gt_eyeglasses')
t3.name={en:'pair of eyeglasses',it:'paio di occhiali'}
t3.desc={en:'A {gt_eyeglasses}.',it:'Un {gt_eyeglasses}.'}
actions.gt_eyeglasses={
  take:id=>{
    dotake(id,true)
    msg(x(ww.Iflarger,getObj(id)))
    return true
  },
  put:(id,id2)=>{
    if(getObj('od_final').done) return false
    const glasses=getObj(id)
    if(glasses.giant&&id2=='od_polyfemus'){
      remove(getObj(glasses.loc).objects,id)
      glasses.loc='@void'
      getObj('inf_bank').addObj(getObj('pi_Ulysses'))
      getObj('od_final').execute()
      return true
    }
    return false
  }
}
t2.addObj(t3)

t=new Sequence('gt_final')
action.gt_final=()=>missiondone('g_room',droptext_g)
t.par=[
{en:`
After you eat the pastry you get bigger and reach the size of Gulliver, but also the glasses grow, becoming the right size for a being who would turn out to be a giant even for that castaway on the beach.
`,it:`
Dopo aver mangiato il pasticcino ti ingrandisci e raggiungi le dimensioni di Gulliver, ma anche gli occhiali si ingrandiscono, diventando della misura adatta a un essere che risulterebbe un gigante anche per quel naufrago sulla spiaggia.
`},
{en:`
The effect does not last long, but you have time to throw away the book you have with you and, immediately, leaving the role of Clefrin Frelock, you find yourself in the Library.
`,it:`
L'effetto dura poco, ma fai in tempo a gettare il libro che hai con te e, immediatamente, ti ritrovi nella Biblioteca.
`},
]

//// Alexandre Dumas

r=new Room('h_room')
r.name={
  en:'room &ldquo;Alexandre Dumas, père&rdquo;',
  it:'sala &ldquo;Alexandre Dumas, padre&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_h}.`,
it:`Al centro della stanza c'è un {lectern_h}.`
}
r.enteringfirst={
  en:
  `You are in a circular room.
  At the top, a plaque bears the name of Alexandre Dumas printed
  in golden letters that shine illuminated by the central light.
  Along the walls there are shelves overloaded with books arranged in bulk.`
  ,it:
  `Ti trovi in una sala circolare.
  In alto una targa riporta stampato il nome di Alexandre Dumas
  in caratteri dorati che brillano illuminati dalla luce centrale.
  Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
  }
  
t=new Supporter('lectern_h')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_h={
  put:(id)=>{
    if(isOffstage('book_h')) return false
    if(getObj(id).transfer) flashtodream('book_h','Edmond','ed_cell',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_h')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "The Count of Monte Cristo", translated from French.',
  it:'Un libro intitolato "Il conte di Montecristo".'
}

function dropbook_h() {
  movebookto('book_h','lectern_h')
  dropbook()
}
actions.book_h={
  take:()=>flashtodream('book_h','Edmond','ed_cell'),
  drop:()=>backtolibrary('h_room',dropbook_h),
  put:()=>backtolibrary('h_room',dropbook_h)
}
t.addObj(t2)

t3=new Text('mark_h')
t3.name=ww.markname
t3.fixed=true
t3.par=[
{en:`
The jailer came in the evening. Dantès was on his bed. It seemed to him
that thus he better guarded the unfinished opening. Doubtless there was
a strange expression in his eyes, for the jailer said, “Come, are you
going mad again?”
<br>Dantès did not answer; he feared that the emotion of his voice would
betray him. The jailer went away shaking his head. Night came; Dantès
hoped that his neighbor would profit by the silence to address him, but
he was mistaken. The next morning, however, just as he removed his bed
from the wall, he heard three knocks; he threw himself on his knees.
`,it:`
La sera venne il carceriere. Dantès era sul letto. Gli pareva che, stando su quello, avrebbe meglio fatto la guardia all'apertura appena iniziata. Senza dubbio stava fissando il suo visitatore importuno con uno sguardo stravagante, perchè questi gli disse:
<br>"Oh! siete per ridivenir pazzo?"
<br>Dantès non rispose, perchè temette che l'emozione della voce lo tradisse. Il carceriere si ritirò scuotendo la testa. Giunta la notte, Dantès credette che il suo vicino avrebbe approfittato del silenzio e della oscurità per riannodare la conversazione con lui, ma s'ingannò. La notte passò senza che alcun rumore rispondesse alla sua febbrile aspettativa. Ma dopo la visita del mattino, intese battere tre colpi distinti da intervalli uguali e si precipitò in ginocchio.
`},
{en:`
“Is it you?” said he; “I am here.”
<br>“Is your jailer gone?”
<br>“Yes,” said Dantès; “he will not return until the evening; so that we
have twelve hours before us.”
<br>“I can work, then?” said the voice.
<br>“Oh, yes, yes; this instant, I entreat you.”
`,it:`
"Siete voi?" disse, "eccomi".
<br>"Il carceriere se n'è andato?" domandò la voce.
<br>"Sì, rispose Dantès, non ritornerà che questa sera&hellip; abbiamo dunque dodici ore di libertà!"
<br>"Posso operare?" disse la voce.
<br>"Sì! senza indugio, subito ve ne supplico!"
`},
{en:`
In a moment that part of the floor on which Dantès was resting his two
hands, as he knelt with his head in the opening, suddenly gave way; he
drew back smartly, while a mass of stones and earth disappeared in a
hole that opened beneath the aperture he himself had formed. Then from
the bottom of this passage, the depth of which it was impossible to
measure, he saw appear, first the head, then the shoulders, and lastly
the body of a man, who sprang lightly into his cell.
`,it:`
In un attimo la porzione di terra sulla quale Dantès, per metà addentrato nell'apertura, appoggiava le mani sembrò cadergli sotto: egli si gettò indietro mentre un ammasso di terra e di rottami precipitava in un foro che veniva ad aprirsi al di sotto dello scavo da lui fatto. Allora dal fondo di questo foro oscuro, e di cui non poteva misurare la profondità, vide comparire una testa, poi due spalle e finalmente un uomo tutto intero che con molta agilità uscì dallo scavo.
`},
]
t2.addObj(t3)

r.labexits='icl'

new LabExit("h_i",r,'i_room')
new LabExit("h_c",r,'c_room')
new LabExit("h_l",r,'l_room')

t=new Thing('note_h')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
en:`
<i>&ldquo;You haven't completed one of the main missions yet. Do you think that having made Edmond Dantès escape to be swallowed by the Shark can be considered a success? Try to put in a little more effort.&rdquo;</i>
`,
it:`
<i>&ldquo;Non hai ancora completato una delle missioni principali. Non crederai che aver fatto fuggire Edmond Dantès per farlo inghiottire dal Pescecane possa essere considerato un successo? Cerca di impegnarti un po' di più.&rdquo;</i>
`
}
function dyingback_h() {
  movebookto('book_h','lectern_h')
  dyingback()
}
function dontdroptext_h() {
  movebookto('book_h','lectern_h')
  actiondone()
}
function droptext_h() {
  remove(getChar().objects,'book_h')
  getObj('book_h').loc='@void'
  const lect=getObj('lectern_h')
  remove(lect.objects,'book_h')
  lect.addObj(getObj('note_h'))
  getObj('pi_whale').addObj(getObj('pi_Edmond'))
  actiondone()
}

//

r=new Room('ed_cell')
r.name={en:`Edmond's cell at Château d'If`,it:`cella di Edmond allo Château d'If`}
r.it_femminile=true
r.desc={
en:`A semi-dark room with stone walls.`,
it:`Una stanza semibuia dalle pareti in pietra.`
}

t=new Exit("ed_door",r)
t.name={en:'door',it:'porta'}
t.it_femminile=true
t.closed=true
t.locked=true

t=new Container('ed_dish')
t.name={en:`dish`,it:`piatto`}
t.desc={en:`A {ed_dish} worn out by time.`,it:`Un {ed_dish} consumato dal tempo.`}
t2=new Thing('ed_food')
t2.name={en:`food`,it:`cibo`}
t2.desc={en:`Unidentified {ed_food}.`,it:`Del {ed_food} non meglio identificato.`}
t2.uncount=true
t2.edible=true
t.addObj(t2)
r.addObj(t)
t=new Container('ed_cup')
t.name={en:`cup`,it:`tazza`}
t.it_femminile=true
t.desc={en:`A cracked {ed_cup}.`,it:`Una {ed_cup} incrinata.`}
t2=new Thing('ed_water')
t2.name={en:`water`,it:`acqua`}
t2.uncount=true
t2.fixed=true
t2.it_femminile=true
t2.desc={en:`Simple {ed_water}.`,it:`Della semplice {ed_water}.`}
t2.drinkable=true
t.addObj(t2)
r.addObj(t)
t=new Exit('ed_tunnel',null,'faria_cell')
t.name='tunnel'
t.crossable=true
t=new Thing('ed_stone')
t.name={en:`large loose stone`,it:`grossa pietra smossa`}
t.it_femminile=true
t.desc={en:`A {ed_stone} that stands out among the others.`,it:`Una {ed_stone} che spicca tra le altre.`}
t.loc='ed_cell'
t.fixed=true
t.pullable=true
actions.ed_stone={
  pull:()=>{
    getObj('ed_stone').pushable=true
    let room=getObj('ed_cell')
    if(room.exits.length<=1) room.addExit('ed_tunnel')
    return false
  },
  push:()=>{
    let room=getObj('ed_cell')
    if(room.exits.length>1) room.removeExit('ed_tunnel')
    return false
  }
}
t=new Supporter('ed_bed')
t.name={en:`plank`,it:`tavolaccio`}
t.desc={en:`A {ed_bed} to sleep on.`,it:`Uno scomodo {ed_bed}.`}
t.fixed=true
t.seatable=true
t.underside=['ed_stone']
r.addObj(t)

t=new Person('Edmond')
t.name='Edmond Dantès'
t.proper=true
t.desc={en:`A man tried for the long years of imprisonment.`,it:`Un uomo provato dai lunghi anni di prigionia.`}
r.addObj(t)

r=new Room('faria_cell')
r.name={en:`abbé Faria's cell`,it:`cella dell'abate Faria`}
r.it_femminile=true
r.desc={
en:`A semi-dark room with stone walls.`,
it:`Una stanza semibuia dalle pareti in pietra.`
}

t=new Thing('faria_stone')
t.name={en:`large loose stone`,it:`grossa pietra smossa`}
t.it_femminile=true
t.desc={en:`A {faria_stone} that stands out among the others.`,it:`Una {faria_stone} che spicca tra le altre.`}
t.loc='faria_cell'
t.fixed=true
t.pushable=true
actions.faria_stone={
  pull:()=>{
    let room=getObj('faria_cell')
    if(room.exits.length<=1) room.addExit('faria_tunnel')
    return false
  },
  push:()=>{
    getObj('faria_stone').pullable=true
    let room=getObj('faria_cell')
    if(room.exits.length>1) room.removeExit('faria_tunnel')
    return false
  }
}
t=new Supporter('faria_bed')
t.name={en:`plank`,it:`tavolaccio`}
t.desc={en:`A {ed_bed} to sleep on.`,it:`Uno scomodo {faria_bed}.`}
t.fixed=true
t.seatable=true
t.underside=['faria_stone']
r.addObj(t)

t2=new Container('faria_bag')
t2.name={en:`jute sack`,it:`sacco di juta`}
t2.desc={
  en:`A {faria_bag} used to contain the prisoners' corpses to bury them at sea.`,
  it:`Un {faria_bag} usato per contenere i cadaveri dei prigionieri per seppellirli in mare.`}
t2.fixed=true
t2.closed=true
t2.closable=true
t2.pullable=true
t2.enterable=true
actions.faria_bag={
  take:()=>{
    const obj=getObj('faria_bag')
    if(!obj.objects.includes('faria_corpse')) return false
    msg(mark(x(ww.Youcanttooheavy,obj)))
    showAll()
    return true
  },
  enter:()=>{
    const obj=getObj('faria_bag')
    if(obj.closed){
      msg(x(w.Cantdo)+' '+x(w.Itsclosed,obj))
      return true
    }
    if(!obj.objects.includes('faria_corpse')) return false
    msg(mark(x(ww.Youcantuntilfaria,obj,getObj('faria_corpse'))))
    showAll()
    return true
  },
  close:()=>{
    if(getObj('faria_corpse').loc!='ed_cell'){
      getObj('ed_final_corpse').execute()
      return true
    }
    if(!isOffstage('faria_tunnel')){
      getObj('ed_final_tunnel').execute()
      return true
    }
    if(!isCarried('dr_knife')&&getObj('dr_knife').loc!='faria_bag'){
      getObj('ed_final_knife').execute()
      return true
    }
    doclose('faria_bag',true)
    getObj('ed_final').execute()
    return true
  },
}
t.addObj(t2)

t3=new Person('faria_corpse')
t3.name={en:`abbé Faria's corpse`,it:`cadavere dell'abate Faria`}
t3.singleton=true
t3.desc={
  en:`The {faria_corpse}.`,
  it:`Il {faria_corpse}.`}
t3.fixed=true
t3.pullable=true
t3.pushable=true
t3.pushablethrough=true
t3.dead=true
actions.faria_corpse={
  pull:()=>{
    const corpse=getObj('faria_corpse')
    if(corpse.loc!='faria_bag') return false
    msg(mark(x(ww.Fariarolls,corpse,getObj('faria_bed'))))
    const bag=getObj('faria_bag')
    bag.fixed=false
    remove(bag.objects,'faria_corpse')
    getObj('faria_cell').addObj(corpse)
    showAll()
    return true
  },
}

t2.addObj(t3)

t=new Exit('faria_tunnel',r,'ed_cell')
t.crossable=true
t.name='tunnel'

t=new Exit("faria_door",r)
t.name={en:'door',it:'porta'}
t.it_femminile=true
t.closed=true
t.locked=true

t=new Sequence('ed_final_corpse')
action.ed_final_corpse=()=>{
  const edmond=getObj('Edmond')
  missiondone('h_room',dontdroptext_h)
}
t.par=[
{en:`
As soon as you have closed the sack, you hear the jailers enter the cell who notice the corpse of abbot Faria and wonder who is in the sack. After a moment of bewilderment, they decide to beat the bag properly, to make it pass the desire to play jokes.
`,it:`
Appena hai chiuso il sacco, senti entrare nella cella i carcerieri che notano il cadavere dell'abate Faria e si chiedono chi ci sia nel sacco. Dopo un attimo di sconcerto, decidono di manganellare come si deve il sacco, per fargli passare la voglia di fare scherzi.
`},
]

t=new Sequence('ed_final_tunnel')
action.ed_final_tunnel=()=>{
  const edmond=getObj('Edmond')
  missiondone('h_room',dontdroptext_h)
}
t.par=[
{en:`
As soon as you have closed the sack, you hear the jailers enter the cell and notice the loose stone under the plank. After a moment, they decide to beat the sack properly, in case the dead man in there wasn't really dead.
`,it:`
Appena hai chiuso il sacco, senti entrare nella cella i carcerieri che notano la pietra smossa sotto al tavolaccio. Dopo un attimo, decidono di manganellare come si deve il sacco, nel caso che il morto là dentro non fosse proprio morto.
`},
]

t=new Sequence('ed_final_knife')
action.ed_final_knife=()=>{
  const edmond=getObj('Edmond')
  missiondone('h_room',dontdroptext_h)
}
t.par=[
{en:`
As soon as you have closed the sack, you hear the jailers enter the cell. They load you on their backs, carry you to the top of the walls and throw you into the sea. Unfortunately they have tied a stone to your feet and you drown because you have nothing with which you can free yourself.
`,it:`
Appena hai chiuso il sacco, senti entrare nella cella i carcerieri. Ti caricano sulle spalle, ti portano in cima alle mura e ti scaraventano in mare. Purtroppo ti hanno legato una pietra ai piedi e tu anneghi perché non hai nulla con cui tu possa liberarti.
`},
]

t=new Sequence('ed_final')
action.ed_final=()=>{
  const edmond=getObj('Edmond')
  remove(edmond.objects,'dr_knife')
  remove(getObj('faria_bag').objects,'Edmond')
  missiondone('h_room',droptext_h)
}
t.par=[
{en:`
As soon as you close the bag, you hear the cell door open. Two jailers must have entered, because you hear them confabulating with each other. They complain because that thankless task is always theirs.
`,it:`
Appena hai chiuso il sacco, senti aprire la porta della cella. Devono essere entrati due carcerieri, perché li senti confabulare tra loro. Si lamentano perché quel compito ingrato tocca sempre a loro.
`},
{en:`
They grab you carelessly and drag you out of the cell and then up steep stairs. All the edges are yours, but you don't groan.
`,it:`
Ti afferrano senza troppi riguardi e ti trascinano fuori dalla cella e poi su per ripide scale. Tutti gli spigoli sono tuoi, ma non emetti un gemito.
`},
{en:`
One of the jailers says to the other: "This old man, all skin and bones, weighs a ton. The food here is too good!" <br>The other replies: "You can say it loudly! We treat these gallows pendants too well."
`,it:`
Uno dei carcerieri dice all'altro: "Questo vecchio tutto pelle ed ossa pesa un quintale. Il vitto qui è troppo buono!"
<br>L'altro risponde: "Puoi dirlo forte! Li trattiamo troppo bene questi pendagli da forca".
`},
{en:`
After getting to know the edges of the Château d'If one by one, you begin to hear the surf and the shrill cry of the seagulls. The two jailers pause to catch their breath as they tie a heavy stone to the feet of what they believe to be a corpse.
`,it:`
Dopo aver conosciuto uno a uno gli spigoli dello Château d'If, cominci a sentire la risacca e il verso stridulo dei gabbiani. I due carcerieri si fermano per riprendere fiato, mentre legano una pesante pietra ai piedi di quello che credono un cadavere.
`},
{en:`
"Do you want to say something?" asks one of the jailers.<br>The other responds with a belch and the sack with Edmond Dantès flies off the walls and quickly disappears into the waves.
`,it:`
"Vuoi dire qualcosa?" chiede uno dei carcerieri.<br>L'altro risponde con un rutto e il sacco con dentro Edmond Dantès vola giù dalle mura e sparisce rapidamente tra le onde.
`},
{en:`
As you descend towards the bottom dragged by the stone, you grab the knife you have with you, free yourself and return to breathe the air of freedom on the surface. In front of you rise the walls of the Château d'If on which the waves of the rough sea break.
`,it:`
Mentre scendi verso il fondo trascinato dalla pietra, afferri il coltello che hai con te, ti liberi e torni a respirare aria di libertà in superficie. Di fronte a te s'innalzano le mura delle Château d'If su cui si frangono le onde del mare mosso.
`},
{en:`
So you decide to swim away from there. Unfortunately, you notice that a huge dark shape is approaching you. You only have time to see three rows of teeth that open wide and a giant mouth swallows you whole.
`,it:`
Quindi decidi di nuotare lontano da lì. Sfortunatamente, ti accorgi che un'enorme sagoma scura si avvicina a te. Fai in tempo solo a vedere tre file di denti che si spalancano e una gigantesca bocca ti inghiotte intero.
`},
]

//// Homer

r=new Room('i_room')
r.name={
  en:'room &ldquo;Homer&rdquo;',
  it:'sala &ldquo;Homer&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_i}.`,
it:`Al centro della stanza c'è un {lectern_i}.`
}
r.enteringfirst={
  en:
  `You are in a circular room.
  At the top, a plaque bears the name of Homer printed
  in golden letters that shine illuminated by the central light.
  Along the walls there are shelves overloaded with books arranged in bulk.`
  ,it:
  `Ti trovi in una sala circolare.
  In alto una targa riporta stampato il nome di Omero
  in caratteri dorati che brillano illuminati dalla luce centrale.
  Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
  }

t=new Supporter('lectern_i')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_i={
  put:(id)=>{
    if(isOffstage('book_i')) return false
    if(getObj(id).transfer) flashtodream('book_i','Ulysses','od_cavern',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_i')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "The Odyssey", translated from the Greek by Samuel Butler.',
  it:'Un libro intitolato "Odissea".'
}

function dropbook_i() {
  movebookto('book_i','lectern_i')
  dropbook()
}
actions.book_i={
  take:()=>flashtodream('book_i','Ulysses','od_cavern'),
  drop:()=>backtolibrary('i_room',dropbook_i),
  put:()=>backtolibrary('i_room',dropbook_i)
}
t.addObj(t2)

t3=new Text('mark_i')
t3.name=ww.markname
t3.fixed=true
t3.par=[
{en:`
‘Look here, Cyclops,’ said I, ‘you have been eating a great deal of
man's flesh, so take this bowl and drink some wine, that you may see what
kind of liquor we had on board my ship. I was bringing it to you as a
drink-offering, in the hope that you would take compassion upon me and
further me on my way home, whereas all you do is to go on ramping and
raving most intolerably. You ought to be ashamed of yourself; how can
you expect people to come see you any more if you treat them in this
way?’
`,it:`
"Guarda qui, Ciclope", dissi, "hai mangiato molta carne umana, quindi prendi questa coppa e bevi del vino, affinché tu possa apprezzare quale sorta di liquore avevamo a bordo della mia nave. Te lo stavo portando come dono, nella speranza che tu avessi compassione di me per aiutarmi a ritornare a casa, mentre tutto ciò che fai è continuare a correre e delirare nel modo più intollerabile. Dovresti vergognarti di te stesso. Come si può? Ti aspetti che le persone vengano a trovarti se le tratti in questo modo modo?"
`},
{en:`
He then took the cup and drank. He was so delighted with the taste of
the wine that he begged me for another bowl full. ‘Be so kind,’ he
said, ‘as to give me some more, and tell me your name at once. I want
to make you a present that you will be glad to have. We have wine even
in this country, for our soil grows grapes and the sun ripens them, but
this drinks like Nectar and Ambrosia all in one.’
`,it:`
Poi prese la coppa e bevve. Era così Contento del gusto di
quel vino che mi pregò di versargliene un'altra coppa piena.
<br>"Sii così gentile", disse: "di darmene  ancora, e dimmi subito il tuo nome. Voglio farti un regalo che sarai felice di ricevere. Qui abbiamo vino, perché si coltiva l'uva e il sole la fa maturare, ma questo sembra Nettare e Ambrosia tutto in uno."
`},
{en:`
I then gave him some more; three times did I fill the bowl for him,
and three times did he drain it without thought or heed; then, when I
saw that the wine had got into his head, I said to him as plausibly as
I could: ‘Cyclops, you ask my name and I will tell it you; give me,
therefore, the present you promised me; my name is Noman; this is what
my father and mother and my friends have always called me.’
`,it:`
Allora gliene diedi dell'altro; tre volte gli ho riempito la coppa, e tre volte la prosciugò senza pensarci. Poi, quando vidi che il vino gli aveva dato alla testa, gli dissi nel modo più convincente che mi fu possibile: "Ciclope, chiedi il mio nome e te lo dirò. Ma fammi il regalo che mi hai promesso. Il mio nome è Nessuno: in questo modo mio padre, mia madre e i miei amici mi hanno sempre chiamato."
`},
{en:`
But the cruel wretch said, ‘Then I will eat all Noman’s comrades
before Noman himself, and will keep Noman for the last. This is the
present that I will make him.’
`,it:`
Ma quel crudele miserabile disse: "Allora mangerò tutti i compagni di Nessuno prima di Nessuno stesso, e lo terrò per ultimo. Questo è il regalo che gli farò."
`},
]
t2.addObj(t3)

r.labexits='dhk'

new LabExit("i_d",r,'d_room')
new LabExit("i_h",r,'h_room')
new LabExit("i_k",r,'k_room')

t=new Thing('note_i')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;Polyphemus's gratitude was bogus. Now Ulysses' ship is destroyed and the hero drowned, a better end than being devoured, perhaps. Hades, or some more modern afterlife, awaits him. But is this really the end of the ingenious hero? Maybe one of your main missions is not yet complete.&rdquo;</i>`,
  it:`<i>&ldquo;La riconoscenza di Polifemo era fasulla. Ora la nave di Ulisse è distrutta e l'eroe annegato, una fine migliore di quella d'esser divorato, forse. L'Ade, o qualche aldilà più moderno, l'attende. Ma è davvero questa la fine dell'eroe dal multiforme ingegno? Forse una delle tue missioni principali non è ancora compiuta.&rdquo;</i>`
}
function dyingback_i() {
  movebookto('book_i','lectern_i')
  dyingback()
}
function dontdroptext_i() {
  movebookto('book_i','lectern_i')
  actiondone()
}
function droptext_i() {
  remove(getChar().objects,'book_i')
  getObj('book_i').loc='@void'
  const lect=getObj('lectern_i')
  remove(lect.objects,'book_i')
  lect.addObj(getObj('note_i'))
  actiondone()
}

//

r=new Room('od_cavern')
r.name={en:`cave of Polyphemus`,it:`caverna di Polifemo`}
r.it_femminile=true
r.desc={
en:`A semi-dark cave with a {od_rock} blocking the entrance.`,
it:`Un'antro semibuio con una {od_rock} che ostruisce l'ingresso.`
}

t=new Person('Ulysses')
t.addName('it','Ulisse')
t.proper=true
t.desc={en:`An athletic man with blond hair and an olive complexion.`,it:`Un uomo dal fisico atletico, con i capelli biondi e la carnagione olivastra.`}
r.addObj(t)

t=new Thing('od_trunk')
t.name={en:`trunk`,it:`tronco`}
t.desc={en:`A very heavy {od_trunk}. All your companions have been devoured and you can't lift it alone.`,it:`Un {od_trunk} molto pesante. Tutti i tuoi compagni sono stati divorati e non puoi sollevarlo da solo.`}
t.fixed=true
r.addObj(t)
t=new Thing('od_fire')
t.name={en:`campfire`,it:`catasta di legna`}
t.it_femminile=true
t.desc={en:`An extinguished {od_fire}.`,it:`Una {od_fire} spenta.`}
t.fixed=true
r.addObj(t)
t=new Person('od_polyfemus')
t.name={en:`Polyphemus`,it:`Polifemo`}
t.proper=true
t.desc={en:`The cyclops {od_polyfemus} asleep.`,it:`Il ciclope {od_polyfemus} addormentato.`}
t.fixed=true
t.asleep=true
r.addObj(t)
t=new Container('od_cup')
t.name={en:`bowl`,it:`coppa`}
t.it_femminile=true
t.desc={en:`An empty {od_cup}.`,it:`Una {od_cup} di vino vuota.`}
r.addObj(t)
t=new Thing('od_sheeps')
t.name={en:`sheeps`,it:`pecore`}
t.uncont=true
t.plural=true
t.it_femminile=true
t.desc={en:`A flock of {od_sheeps}.`,it:`Un gregge di {od_sheeps}.`}
t.fixed=true
r.addObj(t)
t=new Thing('od_rock')
t.name={en:`rock`,it:`roccia`}
t.it_femminile=true
t.desc={en:`A {od_rock} blocking the entrance.`,it:`Una {od_rock} che ostruisce l'ingresso.`}
t.scenery=true
r.addObj(t)

t=new Exit("od_rockexit",r)
t.name={en:'blocked entrance',it:'entrata bloccata'}
t.it_femminile=true
t.closed=true

t=new Sequence('od_final')
action.od_final=()=>missiondone('i_room',droptext_i)
t.par=[
{en:`
You approach Polyphemus and, after some effort, you manage to wake him from his alcoholic sleep. The cyclops, rubbing his eye, immediately proves very upset for being disturbed and decides that a last snack could help him fall asleep again.
`,it:`
Ti avvicini a Polifemo e, dopo un po' di fatica, riesci a svegliarlo dal suo sonno alcolico. Il ciclope, stropicciandosi l'occhio, si dimostra subito molto contrariato per essere stato disturbato e decide che un ultimo spuntino potrebbe aiutarlo a riaddormentarsi.
`},
{en:`
Before he can grab you, you hand him Gulliver's oversized glasses. Polyphemus takes them, observes that strange object curiously and then looks through them with his eye.
`,it:`
Prima che riesca ad afferrarti, gli porgi gli occhiali ingigantiti di Gulliver. Polifemo li prende, osserva quello strano oggetto incuriosito e poi ci guarda attraverso con l'unico occhio.
`},
{en:`
"But it's unbearable, Noman" (you told him to call you Noman&hellip; who knows why), "I can see very well! I've always suffered from myopia, but with the help of this magical tool I can see even distant objects. What witchcraft is this?"
`,it:`
"Ma è increbibile, Nessuno" (gli hai detto di chiamarti Nessuno&hellip; chissà perché), "ci vedo benissimo! Ho sempre sofferto di miopia, ma con l'aiuto di questo magico strumento riesco a vedere oggetti anche lontani. Che stregoneria è questa?"
`},
{en:`
"It's my last gift to you, who have shown yourself so magnanimous as to devour me last."
<br>At those words, Polyphemus' eye fills with tears: "I wasn't really a good guest. First the gift of wine, then this. I will not devour you Noman and I will leave you free to go."
`,it:`
"È l'ultimo mio dono per te, che ti sei dimostrato così magnanimo da divorarmi per ultimo".
<br>A quelle parole, l'occhio di Polifemo si riempie di lacrime: "Non sono stato un buon ospite davvero. Prima il dono del vino, poi questo. Non divorerò Nessuno e lo lascerò libero di andare".
`},
{en:`
Having said those words, the cyclops removes the stone that blocked the entrance and you immediately take advantage of it to run away.
<br> After reaching the cove where your ship was aground with the few companions left waiting, you hurry to take off.
`,it:`
Pronunciate quelle parole, il ciclope rimuove la pietra che ostruiva l'ingresso e tu ne approfitti subito per dartela a gambe.
<br>Dopo aver raggiunto la cala dove la tua nave era in secca con i pochi compagni rimasti ad aspettarti, ti affretti a prendere il largo.
`},
{en:`
In the meantime, Polyphemus had gone up to the promontory overlooking the bay to try on the new glasses. He picks up a boulder and takes good aim looking through a lens of the glasses you have given him (he didn't even close his second eye since he doesn't have it).
`,it:`
Nel frattempo Polifemo era salito sul promontorio che domina la baia per provare i nuovi occhiali. Raccoglie un macigno e prende bene la mira guardando attraverso una lente degli occhiali che gli hai donato (non dovette neppure chiudere il secondo occhio visto che non l'aveva).
`},
{en:`
Then he shouts: "Noman, give my best greetings to my father Poseidon!"
<br>You answer aloud: "My name isn't Noman! Tell everyone that the man who gave you the eyeglasses is&hellip;", but you are unable to finish the sentence, because the boulder precisely thrown ends its parable by ripping through the hull and the ship sinks, dragging all its occupants to the bottom, including the ingenious Ulysses.
`,it:`
Poi grida: "Nessuno, porta i miei saluti a mio padre Poseidone!"
<br>Rispondi ad alta voce: "Non mi chiamo Nessuno! Di' a tutti che gli occhiali te li ha regalati&hellip;", ma non riesci a concludere la frase, perché il macigno scagliato con precisione termina la sua parabola squarciando lo scafo e la nave affonda trascinando sul fondo tutti i suoi occupanti, compreso Ulisse dal multiforme ingegno.
`},
]

//// Herman Melville

r=new Room('j_room')
r.name={
  en:'room &ldquo;Herman Melville&rdquo;',
  it:'sala &ldquo;Herman Melville&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_j}.`,
it:`Al centro della stanza c'è un {lectern_j}.`
}
r.enteringfirst={
  en:
  `You are in a circular room.
  At the top, a plaque bears the name of Herman Melville printed
  in golden letters that shine illuminated by the central light.
  Along the walls there are shelves overloaded with books arranged in bulk.`
  ,it:
  `Ti trovi in una sala circolare.
  In alto una targa riporta stampato il nome di Herman Melville
  in caratteri dorati che brillano illuminati dalla luce centrale.
  Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
  }

t=new Supporter('lectern_j')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_j={
  put:(id)=>{
    if(isOffstage('book_j')) return false
    if(getObj(id).transfer) flashtodream('book_j','Ishmael','md_pequod',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_j')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "Moby-Dick, or The Whale".',
  it:'Un libro intitolato "Moby Dick, o La balena".'
}

function dropbook_j() {
  movebookto('book_j','lectern_j')
  dropbook()
}
actions.book_j={
  take:()=>flashtodream('book_j','Ishmael','md_pequod'),
  drop:()=>backtolibrary('j_room',dropbook_j),
  put:()=>backtolibrary('j_room',dropbook_j)
}
t.addObj(t2)

t3=new Text('mark_j')
t3.name=ww.markname
t3.fixed=true
t3.par=[
{en:`
But, they were all eagerness again, as Ahab, now half-revolving in his
pivot-hole, with one hand reaching high up a shroud, and tightly,
almost convulsively grasping it, addressed them thus:—
<br>“All ye mast-headers have before now heard me give orders about a white
whale. Look ye! d’ye see this Spanish ounce of gold?”—holding up a
broad bright coin to the sun—“it is a sixteen dollar piece, men. D’ye
see it? Mr. Starbuck, hand me yon top-maul.”
`,it:`
Ma tornarono tutti attentissimi, quando Achab mezzo volgendosi ora sul suo perno, con una mano stesa in alto a una sartia, che stringeva strettamente, quasi convulsamente, così parlò all’equipaggio:
<br>«Tutti voi di vedetta, mi avete prima d'ora sentito dar ordini per una balena bianca. Guardate! vedete quest’oncia d’oro spagnola?» e levò al sole una grossa moneta splendente. «È una pezza da sedici dollari, marinai. La vedete? Signor Starbuck, dammi quella mazza».
`},
{en:`
While the mate was getting the hammer, Ahab, without speaking, was
slowly rubbing the gold piece against the skirts of his jacket, as if
to heighten its lustre, and without using any words was meanwhile lowly
humming to himself, producing a sound so strangely muffled and
inarticulate that it seemed the mechanical humming of the wheels of his
vitality in him.
`,it:`
Mentre l’ufficiale prendeva il martello, Achab senza dir nulla si sfregava con cautela la pezza d’oro sulle falde della giacca, come per aumentarne lo splendore, e senza usar parole canterellava intanto a bassa voce tra sè, emettendo un suono così stranamente soffocato e inarticolato che pareva il ronzìo macchinale delle ruote della vitalità che aveva dentro.
`},
{en:`
Receiving the top-maul from Starbuck, he advanced towards the main-mast
with the hammer uplifted in one hand, exhibiting the gold with the
other, and with a high raised voice exclaiming: “Whosoever of ye raises
me a white-headed whale with a wrinkled brow and a crooked jaw;
whosoever of ye raises me that white-headed whale, with three holes
punctured in his starboard fluke—look ye, whosoever of ye raises me
that same white whale, he shall have this gold ounce, my boys!”
`,it:`
Ricevendo la mazza da Starbuck, s’avanzò verso l’albero maestro con lo strumento alzato in una mano, mettendo con l’altra l’oro bene in vista. A gran voce esclamò: «Chiunque di voi mi segnali una balena dalla testa bianca, dalla fronte rugosa e dalla mandibola storta, chiunque di voi mi segnali quella balena bianca che ha tre buchi nella pinna dritta della coda, state attenti! chiunque mi segnali proprio questa balena, riceverà quest’oncia d’oro, marinai!»
`},
]
t2.addObj(t3)

r.labexits='edl'

new LabExit("j_e",r,'e_room')
new LabExit("j_d",r,'d_room')
new LabExit("j_l",r,'l_room')

t=new Thing('note_j')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;Geppetto and Edmond were rescued. Admittedly, you did little work to complete this last part of the mission. The crew of the Pequod did all the work, however what less can one expect from Nantucket natives? However, I'll credit you for the success.&rdquo;</i>`,
  it:`<i>&ldquo;Geppetto e Edmond sono stati tratti in salvo. Bisogna ammettere che per completare quest'ultima parte della missione hai lavorato poco. Ha fatto tutto l'equipaggio del Pequod, tuttavia cosa ci si può aspettare di meno da nativi di Nantucket? Comunque ti attribuirò il merito della riuscita.&rdquo;</i>`
}
function dyingback_j() {
  movebookto('book_j','lectern_j')
  dyingback()
}
function dontdroptext_j() {
  movebookto('book_j','lectern_j')
  actiondone()
}
function droptext_j() {
  remove(getChar().objects,'book_j')
  getObj('book_j').loc='@void'
  const lect=getObj('lectern_j')
  remove(lect.objects,'book_j')
  lect.addObj(getObj('note_j'))
  actiondone()
}

//

r=new Room('md_pequod')
r.name={en:'bridge of the Pequod',it:'ponte del Pequod'}
r.onloc=true
r.desc={
en:`The bridge of the Pequod is as messy as only the bridge of a whaler can be. All around there is the {md_ocean}.`,
it:`Il ponte del Pequod è disordinato come può esserlo solo il ponte di una baleniera. Tutto intorno c'è l'{md_ocean}.`
}

t=new Person('Ishmael')
t.name={en:`Ishmael`,it:`Ismaele`}
t.proper=true
t.desc={en:`A man with an adventurous spirit.`,it:`Un uomo dallo spirito avventuroso.`}
r.addObj(t)

t=new Person('Ahab')
t.name={en:`Ahab`,it:`Achab`}
t.proper=true
t.desc={
en:`A particular man: in addition to a missing leg due to a clash with Moby Dick, he has a scar that arises from gray hair, which runs along one side of his face and neck and then disappears under his clothes.
<br>He paces nervously back and forth across the bridge, scanning the horizon.`,
it:`Un uomo particolare: oltre alla gamba mancante a causa di uno scontro con Moby Dick, ha una cicatrice che nasce dai capelli grigi, che percorre un lato del volto e del collo per poi scomparire sotto i vestiti.
<br>Passeggia nervosamente avanti e indietro sul ponte scrutando l'orizzonte.`
}
r.addObj(t)

t=new Person('Starbuck')
t.name={en:`Mr. Starbuck`,it:`il signor Starbuck`}
t.proper=true
t.desc={
en:`The most cautious man on the whaling ship. A prudent, conscientious man, but certainly not a coward.
<br>He is busy making those scrubbers of the sailors work.`,
it:`L'uomo più cauto che si possa trovare sulla baleniera. Un uomo prudente, coscienzioso, ma di certo non codardo.
<br>È impegnato a far lavorare quei lavativi dei marinai`}
r.addObj(t)

t=new Supporter('md_mainmast')
t.name={en:`main mast`,it:`albero maestro`}
t.desc={en:`The {md_mainmast}.`,it:`L'{md_mainmast}.`}
t.singleton=true
t.fixed=true
t.climbable=true
t.rules=['+person']
actions.md_mainmast={
  climb:id=>{
    doclimb(id,true)
    if(!isOffstage('book_l')){
      msg(x(ww.Mastclimb))
      return true
    }
    getObj('md_final').execute()
    return true
  }
}
r.addObj(t)

t=new Sequence('md_final')
action.md_final=()=>{
  if(world.objects['red_pill'])
    gamedone('j_room',droptext_j)
  else
    missiondone('j_room',droptext_j)
}
t.par=[
{en:`
You climb the mast and see a silhouette in the distance. No, it's not the white whale that Ahab covets. It's a huge shark, bigger than a sperm whale. What coveted prey it must be. You shout: "Sea monster to starboard!"
`,it:`
Sali sull'albero maestro e avvisti in lontananza una sagoma. No, non è la balena bianca agognata da Achab. Si tratta di un pescecane enorme, più grande d'un capodoglio. Quale preda ambita dev'essere. Urli: "Mostro marino a dritta!"
`},
{en:`
At that cry Ahab is alarmed and scans the horizon towards the point you have indicated. He is disappointed because it's not the white whale he's looking for, but on the other hand it's a prey that looks particularly interesting. So he orders the crews to lower the hunting boats.
`,it:`
A quel grido Achab si allarma e scruta l'orizzonte verso il punto che gli hai indicato. Rimane deluso perché non vede la balena bianca che cerca, ma d'altra parte è una preda che sembra particolarmente interessante. Perciò ordina agli equipaggi di ammainare le scialuppe.
`},
{en:`
You quickly drop from the mast and join the boat where your friend Queequeg has placed himself on the prow with his harpoon. All the crews row to be the first to reach the Shark.
`,it:`
Ti cali rapidamente dall'albero e ti aggreghi alla scialuppa dove il tuo amico Queequeg si è piazzato sulla prua col suo rampone. Tutti gli equipaggi remano per raggiungere per primi il Pescecane.
`},
{en:`
The fight is furious and more than one boat is broken by the triple row of teeth of the huge fish, until Queequeg hits one eye of the Shark and reaches the brain. At that point, the escape of the animal is short-lived and soon the carcass floats helpless.
`,it:`
La lotta è furibonda e più di una scialuppa viene spezzata dalla triplice fila di denti dell'enorme pesce, finché Queequeg non centra in pieno un occhio del Pescecane e raggiunge il cervello. A quel punto, la fuga dell'animale dura poco e presto la carcassa galleggia inerme.
`},
{en:`
As you approach to tow the prey you are amazed at the sight of two emaciated men appearing between the half-open jaws of the Shark.
<br>Once loaded on board, they never stop thanking the crew who saved them. One of the two happily says to the other: "Yes, miracles happen twice!"
`,it:`
Mentre vi avvicinate per rimorchiare la preda rimanete stupefatti alla vista di due uomini emaciati che compaiono tra le fauci semiaperte del Pescecane.
<br>Una volta caricati a bordo non finiscono di ringraziare l'equipaggio che li ha salvati. Uno dei due dice felice all'altro: "Sì, i miracoli accadono due volte!"
`},
]

t=new Thing('md_ocean')
t.name={en:`ocean`,it:`oceano`}
t.desc={en:`The {md_ocean}: boundless and majestic.`,it:`L'{md_ocean}: sconfinato e maestoso.`}
t.scenery=true
actions.md_ocean={
  examine:id=>{
    if(isOffstage('book_l')&&getObj('Ishmael').loc=='md_mainmast'){
      getObj('md_final').execute()
      return true
    }
    msg(mark(x(getObj(id).desc)))
    return true
  }
}
r.addObj(t)

//// Dante Alighieri

r=new Room('k_room')
r.name={
  en:'room &ldquo;Dante Alighieri&rdquo;',
  it:'sala &ldquo;Dante Alighieri&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_k}.`,
it:`Al centro della stanza c'è un {lectern_k}.`
}
r.enteringfirst={
  en:
  `You are in a circular room.
  At the top, a plaque bears the name of Dante Alighieri printed
  in golden letters that shine illuminated by the central light.
  Along the walls there are shelves overloaded with books arranged in bulk.`
  ,it:
  `Ti trovi in una sala circolare.
  In alto una targa riporta stampato il nome di Dante Alighieri
  in caratteri dorati che brillano illuminati dalla luce centrale.
  Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
  }

t=new Supporter('lectern_k')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_k={
  put:(id)=>{
    if(isOffstage('book_k')) return false
    if(getObj(id).transfer) flashtodream('book_k','Dante','inferno',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_k')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "The Divine Comedy", translated from Italian by H.F. Cary.',
  it:'Un libro intitolato "La Divina Commedia".'
}

function dropbook_k() {
  movebookto('book_k','lectern_k')
  dropbook()
}
actions.book_k={
  take:()=>flashtodream('book_k','Dante','inferno'),
  drop:()=>backtolibrary('k_room',dropbook_k),
  put:()=>backtolibrary('k_room',dropbook_k)
}

t.addObj(t2)

t3=new Text('mark_k')
t3.name=ww.markname
t3.fixed=true
t3.par=[
{en:`
"THROUGH me you pass into the city of woe:
<br>Through me you pass into eternal pain:
<br>Through me among the people lost for aye.
<br>Justice the founder of my fabric mov'd:
<br>To rear me was the task of power divine,
<br>Supremest wisdom, and primeval love.
<br>Before me things create were none, save things
<br>Eternal, and eternal I endure.
<br>All hope abandon ye who enter here."
`,it:`
«Per me si va ne la città dolente,
<br>per me si va ne l'etterno dolore,
<br>per me si va tra la perduta gente.
<br>Giustizia mosse il mio alto fattore;
<br>fecemi la divina podestate,
<br>la somma sapïenza e 'l primo amore.
<br>Dinanzi a me non fuor cose create
<br>se non etterne, e io etterno duro.
<br>Lasciate ogne speranza, voi ch'intrate». 
`},
{en:`
Such characters in colour dim I mark'd
<br>Over a portal's lofty arch inscrib'd:
<br>Whereat I thus: "Master, these words import
<br>Hard meaning."  He as one prepar'd replied:
<br>"Here thou must all distrust behind thee leave;
<br>Here be vile fear extinguish'd. We are come
<br>Where I have told thee we shall see the souls
<br>To misery doom'd, who intellectual good
<br>Have lost."  And when his hand he had stretch'd forth
<br>To mine, with pleasant looks, whence I was cheer'd,
<br>Into that secret place he led me on.
`,it:`
Queste parole di colore oscuro
<br>vid'ïo scritte al sommo d'una porta;
<br>per ch'io: «Maestro, il senso lor m'è duro».
<br>Ed elli a me, come persona accorta:
<br>«Qui si convien lasciare ogne sospetto;
<br>ogne viltà convien che qui sia morta.
<br>Noi siam venuti al loco ov'i' t'ho detto
<br>che tu vedrai le genti dolorose
<br>c'hanno perduto il ben de l'intelletto».
<br>E poi che la sua mano a la mia puose
<br>con lieto volto, ond'io mi confortai,
<br>mi mise dentro a le segrete cose.    
`},
{en:`
Here sighs with lamentations and loud moans
<br>Resounded through the air pierc'd by no star,
<br>That e'en I wept at entering.  Various tongues,
<br>Horrible languages, outcries of woe,
<br>Accents of anger, voices deep and hoarse,
<br>With hands together smote that swell'd the sounds,
<br>Made up a tumult, that for ever whirls
<br>Round through that air with solid darkness stain'd,
<br>Like to the sand that in the whirlwind flies.
`,it:`
Quivi sospiri, pianti e alti guai
<br>risonavan per l'aere sanza stelle,
<br>per ch'io al cominciar ne lagrimai.
<br>Diverse lingue, orribili favelle,
<br>parole di dolore, accenti d'ira,
<br>voci alte e fioche, e suon di man con elle
<br>facevano un tumulto, il qual s'aggira
<br>sempre in quell'aura sanza tempo tinta,
<br>come la rena quando turbo spira.    
`},
]
t2.addObj(t3)

r.labexits='eig'

new LabExit("k_e",r,'e_room')
new LabExit("k_i",r,'i_room')
new LabExit("k_g",r,'g_room')

t=new Thing('note_k')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;Admittedly, you did little work to complete this last part of the mission. Ulysses did it all by himself, however what less can one expect from a Homeric hero? However, I'll credit you for the success.&rdquo;</i>`,
  it:`<i>&ldquo;Bisogna ammettere che per completare quest'ultima parte della missione hai lavorato poco. Ulisse ha fatto tutto da solo, tuttavia cosa ci si può aspettare di meno da un eroe omerico? Comunque ti attribuirò il merito dell'impresa.&rdquo;</i>`
}
function dyingback_k() {
  movebookto('book_k','lectern_k')
  dyingback()
}
function dontdroptext_k() {
  movebookto('book_k','lectern_k')
  actiondone()
}
function droptext_k() {
  remove(getChar().objects,'book_k')
  getObj('book_k').loc='@void'
  const lect=getObj('lectern_k')
  remove(lect.objects,'book_k')
  lect.addObj(getObj('note_k'))
  actiondone()
}

//

r=new Room('inferno')
r.name={en:'gate of hell',it:'porta dell\'inferno'}
r.singleton=true
r.it_femminile=true
r.onloc=true
r.desc={
en:`The nature all around is parched and twisted. The door of hell opens in front of you. You would like to be accompanied by Virgil again, but there is no trace of the latin poet.`,
it:`La natura tutt'intorno è riarsa e contorta. Di fronte a te si apre la porta dell\'inferno. Vorresti essere ancora accompagnato da Virgilio, ma non c'è traccia del poeta latino.`
}

t=new Exit("inf_door",r,'antinferno')
t.name={en:'door of hell',it:'porta dell\'inferno'}
t.it_femminile=true

t=new Person('Dante')
t.desc={
en:`A man of average height with long face, large eyes, aquiline nose, lower lip protruding from the upper one and pronounced jaws.`,
it:`Un uomo di statura media dal volto allungato, occhi grandi, naso aquilino, labbro inferiore sporgente rispetto al superiore e mascelle pronunciate.`
}
t.proper=true
r.addObj(t)

r=new Room('antinferno')
r.name={en:'wastelands',it:'landa desolata'}
r.it_femminile=true
r.desc={
en:`You ventured beyond the door. The dark atmosphere of the place oppresses you, but you are also surprised not to find a&hellip; soul, as if there were no longer the damned that you had seen centuries ago in those places.`,
it:`Ti sei avventurato oltre la porta. L'atmosfera oscura del luogo ti opprime, ma sei anche sorpreso nel non trovare anima&hellip; morta, come se non ci fossero più i dannati che avevi visto secoli fa in quei luoghi.`
}

t=new Exit("inf_ravine",r,'inf_bank')
t.name={en:'steep ravine',it:'frana scoscesa'}
t.it_femminile=true

r=new Room('inf_bank')
r.name={en:'bank of Acheron',it:'riva dell\'Acheronte'}
r.it_femminile=true
r.desc={
en:`You are on the bank of the Acheron. To enter the real hell you have to go through it. This place is also deserted and there is no gathering of souls.`,
it:`Ti trovi sulla riva dell'Acheronte. Per accedere all'inferno vero e proprio lo devi attraversare. Anche questo luogo è deserto e non c'è alcun assembramento di anime.`
}

t=new Vehicle('inf_boat')
t.name={en:`boat`,it:`barca`}
t.desc={en:`A patched boat with sagging planking.`,it:`Una barca rattoppata con fasciame cadente.`}
t.enterable=true
t.fixed=true
actions.inf_boat={
  enter:()=>{msg(x(ww.Charonstops));return true}
}
r.addObj(t)

t=new Person('inf_charon')
t.name={en:`Charon`,it:`Caronte`}
t.desc={en:`A grubby old man with a white beard and eyes surrounded by flames.`,it:`Un vecchio sudicio coperto da una barba bianca e occhi circondati da fiamme.`}
t.proper=true
r.addObj(t)

newTopic('charon_hi',
'that you\'ve seen each other before','che vi siete già visti',false,
`"Do you remember me? We met about 700 years ago."`,`"Vi ricordate di me? Ci siamo incontrati circa 700 anni fa".`,
`"Of course. I see that now you are alone."`,`"Certo. Vedo che ora siete da solo."`,
['charon_virgil','charon_nobody'],null,t
)
newTopic('charon_virgil',
'about Virgil','di Virgilio',false,
`"I don't know where Virgil is. Maybe he was busy."`,`"Non so dove sia Virgilio. Forse aveva da fare."`,
`Charon adds with a hint of satisfaction: "Better this way, it was an unpleasant one!"`,`Caronte aggiunge con una punta di soddisfazione: "Meglio così, era d'un antipatico!"`,
)
newTopic('charon_nobody',
'why there is no soul around there','perché non c\'è nessun\'anima lì intorno',true,
`"It's strange. Last time I remember that there were so many souls here waiting for a passage to the other shore", you said a little surprised.`,`"È strano. La scorsa volta ricordo che c'erano tante anime che aspettavano qui un passaggio per l'altra riva", constati un po\' stupito.`,
`Charon replied disconsolately: "It's been some centuries since you saw a dead soul here. The people up there must have changed religion, or they all follow the path of holiness."`,`Caronte rispose sconsolato: "È da quanche secolo che non si vede anima morta da queste parti. La gente là sopra deve aver cambiato religione, o seguono tutti la via della santità."`,
['charon_othershore']
)
newTopic('charon_othershore',
'to be ferried to the other shore','di essere traghettato all\'altra riva',true,
`"Would you be kind enough to take me to the other shore?" you ask politely.`,`"Sareste così gentile da portarmi all'altra riva?" chiedi educatamente.`,
`"I don't make the trip for one soul. We'll leave when it's sold out. Be patient and wait."`,`"Non faccio il viaggio per un'anima sola. Partiremo quando ci sarà il tutto esaurito. Pazientate e aspettate."`
)

t=new Person('pi_Ulysses')
t.name={en:'Ulysses',it:'Ulisse'}
t.proper=true
t.desc={en:`An athletic man with blond hair and an olive complexion.`,it:`Un uomo dal fisico atletico, con i capelli biondi e la carnagione olivastra.`}
actions.pi_Ulysses={
  examine:()=>{getObj('inf_final').execute();return true}
}

t=new Sequence('inf_final')
action.inf_final=()=>{
  if(world.objects['blue_pill'])
    gamedone('k_room',droptext_k)
  else
    missiondone('k_room',droptext_k)
}
t.par=[
{en:`
You look that soul appeared out of nowhere. You see a man with an athletic physique, blond hair and an olive complexion. You remember having already met him in your writings a few circles below. He's Ulysses! Charon is also happy, because that couple of souls who appeared after a long time reminds him of the crowds he ferried in the good old times.
`,it:`
Dai un'occhiata a quell'anima apparsa dal nulla. Vedi un uomo dal fisico atletico, con i capelli biondi e la carnagione olivastra. Ricordi di averlo già incontrato nei tuoi scritti qualche cerchio più sotto. È Ulisse! Anche Caronte è contento, perché quella coppia d'anime apparsa dopo tanto tempo gli ricorda le folle che traghettava ai bei vecchi tempi.
`},
{en:`
You approach Ulysses to welcome him: "Legendary hero who conquered Troy with the ingenious idea of ​​the horse, let me greet the most astute man&hellip;", but he ignores you, pushes you away with a quick gesture of the arm and moves towards Charon standing on the shore next to the boat.
`,it:`
Ti avvicini a Ulisse per accoglierlo: "Leggendario eroe che con l'idea ingegnosa del cavallo conquistasti Troia, lascia che saluti in te l'uomo più astuto&hellip;", ma questi ti ignora, ti scosta con un rapido gesto del braccio e punta diretto verso Caronte fermo sulla riva accanto alla barca.
`},
{en:`
"Is this boat yours? It's very beautiful!" Ulysses says to Charon, looking at the rotten planking and noting that it isn't moored. With a little push he could break away from shore and sail fast on the Acheron with energetic strokes of the rudder left unattended.
`,it:`
"È tua questa barca? È molto bella!" dice Ulisse a Caronte, osservandone il fasciame marcio e notando che non è ormeggiata. Con una piccola spinta avrebbe potuto staccarsi da riva e navigare veloce sull'Acheronte con energici colpi del timone lasciato incustodito. 
`},
{en:`
Charon is filled with pride. No damned one had ever admired his boat and begins to sing its praises: "She is my lifelong companion. With her I have ferried millions and millions of souls and she never gave me a&hellip;"
But Ulysses interrupts him and points to something behind him: "Look! A three-headed monkey!"
`,it:`
Caronte si riempie d'orgoglio. Nessun dannato gli aveva mai elogiato la barca e comincia a tesserne le lodi: "È la mia compagna di una vita. Con lei ho traghettato milioni e milioni di anime e mai mi ha dato una&hellip;"
Ma Ulisse lo interrompe e indica qualcosa alle sue spalle: "Guardate! Una scimmia a tre teste!"
`},
{en:`
Dante and Charon turn around trying to see something in the darkness, but nothing could be distinguished. Dante thinks that Ulysses had seen Cerberus.
<br>When they finally turn back, they see Ulysses far away, traveling fast on the calm waters of the Acheron sailing Charon's boat. That river must have flowed into the Ocean River somewhere - the Homeric hero thinks - and he had always wanted to sail there sooner or later.
`,it:`
Dante e Caronte si voltano cercando di vedere qualcosa nell'oscurità, ma non distinguono nulla. Dante pensa che Ulisse abbia scambiato Cerbero per una scimmia a tre teste.
<br>Ma quando alla fine si voltano di nuovo, vedono Ulisse ormai lontano che viaggia veloce sulle tranquille acque dell'Acheronte remando sulla barca di Caronte. Quel fiume doveva sfociare da qualche parte nel fiume Oceano - pensa l'eroe omerico - e lui aveva sempre desiderato navigarci prima o poi.
`},
]

//// Carlo Collodi

r=new Room('l_room')
r.name={
  en:'room &ldquo;Carlo Collodi&rdquo;',
  it:'sala &ldquo;Carlo Collodi&rdquo;'
}
r.it_femminile=true
r.desc={
en:`In the center of the room there is a {lectern_l}.`,
it:`Al centro della stanza c'è un {lectern_l}.`
}
r.enteringfirst={
en:
`You are in a circular room.
At the top, a plaque bears the name of Carlo Collodi printed
in golden letters that shine illuminated by the central light.
Along the walls there are shelves overloaded with books arranged in bulk.`
,it:
`Ti trovi in una sala circolare.
In alto una targa riporta stampato il nome di Carlo Collodi
in caratteri dorati che brillano illuminati dalla luce centrale.
Lungo le pareti ci sono scaffali carichi di libri disposti alla rinfusa.`
}

t=new Supporter('lectern_l')
t.name=ww.lecternName
t.desc=ww.LecternDesc
t.scenery=true
actions.lectern_l={
  put:(id)=>{
    if(isOffstage('book_l')) return false
    if(getObj(id).transfer) flashtodream('book_l','Geppetto','pi_whale',id)
    return true
  }
}
r.addObj(t)
t2=new Container('book_l')
t2.name=ww.bookname
t2.transfer=true
t2.closed=true
t2.rules=['+nothing']
t2.desc={
  en:'A book entitled "The Adventures of Pinocchio", translated from Italian by Carol Della Chiesa.',
  it:'Un libro intitolato "Le avventure di Pinocchio".'
}

function dropbook_l() {
  movebookto('book_l','lectern_l')
  dropbook()
}
actions.book_l={
  take:()=>flashtodream('book_l','Geppetto','pi_whale'),
  drop:()=>backtolibrary('l_room',dropbook_l),
  put:()=>backtolibrary('l_room',dropbook_l)
}
t.addObj(t2)

t3=new Text('mark_l')
t3.name=ww.markname
t3.fixed=true
t3.par=[
{en:`
Pinocchio and Geppetto climbed up the throat of the monster till
they came to that immense open mouth. There they had to walk on tiptoes,
for if they tickled the Shark’s long tongue he might awaken--and where
would they be then? The tongue was so wide and so long that it looked
like a country road.
`,it:`
Detto fatto, salirono su per la gola del mostro marino, e arrivati in quell’immensa bocca cominciarono a camminare in punta di piedi sulla lingua; una lingua così larga e così lunga, che pareva il viottolone d’un giardino.
`},
{en:`
The two fugitives were just about to dive into the
sea when the Shark sneezed very suddenly and, as he sneezed, he gave
Pinocchio and Geppetto such a jolt that they found themselves thrown
on their backs and dashed once more and very unceremoniously into the
stomach of the monster.
`,it:`
E già stavano lì lì per fare il gran salto e per gettarsi a nuoto nel mare, quando, sul più bello, il Pescecane starnutì, e nello starnutire, dette uno scossone così violento, che Pinocchio e Geppetto si trovarono rimbalzati all’indietro e scaraventati novamente in fondo allo stomaco del mostro.
`},
{en:`
To make matters worse, the candle went out and father and son were left
in the dark.
<br>“And now?” asked Pinocchio with a serious face.
<br>“Now we are lost.”
<br>“Why lost? Give me your hand, dear Father, and be careful not to slip!”
<br>“Where will you take me?”
<br>“We must try again. Come with me and don’t be afraid.”
`,it:`
Nel grand’urto della caduta la candela si spense, e padre e figliuolo rimasero al buio.
<br>– E ora?&hellip; – domandò Pinocchio facendosi serio.
<br>– Ora ragazzo mio, siamo bell’e perduti.
<br>– Perché perduti? Datemi la mano, babbino, e badate di non sdrucciolare!&hellip;
<br>– Dove mi conduci?
<br>– Dobbiamo ritentare la fuga. Venite con me e non abbiate paura.
`},
{en:`
With these words Pinocchio took his father by the hand and, always
walking on tiptoes, they climbed up the monster’s throat for a second
time. They then crossed the whole tongue and jumped over three rows of
teeth. But before they took the last great leap, the Marionette said to
his father:
“Climb on my back and hold on tightly to my neck. I’ll take care of
everything else.”
`,it:`
Ciò detto, Pinocchio prese il suo babbo per la mano: e camminando sempre in punta di piedi, risalirono insieme su per la gola del mostro: poi traversarono tutta la lingua e scavalcarono i tre filari di denti. Prima però di fare il gran salto, il burattino disse al suo babbo:
<br>– Montatemi a cavalluccio sulle spalle e abbracciatemi forte forte. Al resto ci penso io.
`},
{en:`
As soon as Geppetto was comfortably seated on his shoulders, Pinocchio,
very sure of what he was doing, dived into the water and started to
swim. The sea was like oil, the moon shone in all splendor, and the
Shark continued to sleep so soundly that not even a cannon shot would
have awakened him.
`,it:`
Appena Geppetto si fu accomodato per bene sulle spalle del figliuolo, Pinocchio, sicurissimo del fatto suo, si gettò nell’acqua e cominciò a nuotare. Il mare era tranquillo come un olio: la luna splendeva in tutto il suo chiarore e il Pescecane seguitava a dormire di un sonno così profondo, che non l’avrebbe svegliato nemmeno una cannonata.
`},
]
t2.addObj(t3)

r.labexits='hfj'

new LabExit("l_h",r,'h_room')
new LabExit("l_f",r,'f_room')
new LabExit("l_j",r,'j_room')

t=new Thing('note_l')
t.name=ww.noteName
t.desc=ww.noteDesc
t.readable=true
t.fixed=true
t.text={
  en:`<i>&ldquo;The fate of Geppetto and Edmond Dantès seems to be doomed to slow agony. But couldn't Edmond's desire for revenge cross paths with the same violent feeling of another character?&rdquo;</i>`,
  it:`<i>&ldquo;La sorte di Geppetto e di Edmond Dantès sembra votata a una lenta agonia. Ma il desiderio di vendetta di Edmond non potrebbe incrociarsi con lo stesso violento sentimento di un altro personaggio?&rdquo;</i>`
}
function dyingback_l() {
  movebookto('book_a','lectern_l')
  dyingback()
}
function dontdroptext_l() {
  movebookto('book_l','lectern_l')
  actiondone()
}
function droptext_l() {
  remove(getChar().objects,'book_l')
  getObj('book_l').loc='@void'
  const lect=getObj('lectern_l')
  remove(lect.objects,'book_l')
  lect.addObj(getObj('note_l'))
  actiondone()
}

//

r=new Room('pi_whale')
r.name={en:`stomach of the Shark`,it:`ventre del Pescecane`}
r.desc={
en:`You are surrounded by the stomach walls of the huge fish that swallowed you. Despite your attempts, the exit to the mouth is blocked as well as the access to the intestine. All that remains is to wait to be digested.`,
it:`Le pareti dello stomaco dell'enorme pesce che ti ha inghiottito ti circondano. Nonostante i tuoi tentativi, l'uscita verso la bocca è bloccata così come l'accesso all'intestino. Non resta che attendere d'essere digeriti.`
}

t=new Person('Geppetto')
t.desc={
  en:`An old man looking even older than usual in this awkward location.`,
  it:`Un vecchio che appare ancor più vecchio del solito in questa scomoda collocazione.`
}
t.proper=true
t.wears=['pi_wig']
r.addObj(t)

t=new Thing('pi_wig')
t.name={en:`wig`,it:`parrucca`}
t.it_femminile=true
t.desc={
  en:`Your polenta-colored {pi_wig}.`,
  it:`La tua {pi_wig} color della polenta.`
}
t.loc='Geppetto'
t.wearable=true
actions.pi_wig={
  put:(id,id2)=>{
    if(id2!='pi_Edmond') return false
    msg(mark(x(ww.Edlookwig,getObj(pi_wig))))
    return true
  }
}

t=new Person('pi_Edmond')
t.name='Edmond Dantès'
t.proper=true
t.desc={
  en:`A man tried for the long years of imprisonment and now also wet.`,it:`Un uomo provato per i lunghi anni di prigionia e ora anche bagnato.`
}

newTopic('gepp_hi',
'who he is','chi è',true,
`Barely holding back your enthusiasm, you hug the stranger and say: "I haven't seen a soul in a long time. Who are you?"`,
`Trattenendo a stento l'entusiasmo, abbracci lo sconosciuto e dici: "Da molto tempo non vedo anima viva. Chi siete?"`,
`"I'm just a castaway. I was hoping I'd found a way out of my misfortunes and instead&hellip; Where are we?"`,
`"Sono solo un naufrago. Speravo d'aver trovato una via d'uscita dalle mie disgrazie e invece&hellip; Dove ci troviamo?"`,
['gepp_where'],null,t
)

newTopic('gepp_where',
'about the Shark','del Pescecane',false,
`"We are in the belly of a huge shark, a fish that rivals the largest sperm whales in size. Just think it swallowed my boat whole. I was looking for my son and now I'm sure I'll never see him again", you say sobbing.`,
`"Siamo nel ventre di un enorme Pescecane, un pesce che rivaleggia in dimensioni con i più grandi capodogli. Pensa che ha inghiottito intera la mia barchetta. Ero alla ricerca di mio figlio ed ora sono certo che non lo rivedrò mai più", dici singhiozzando.`,
`"I am not resigned. I have to find a way out, because I have a revenge to carry out," says Edmond with a resolute tone.`,
`"Io non mi rassegno. Devo trovare una via d'uscita, perché ho una vendetta da portare a termine", afferma Edmond con tono risoluto.`,
['gepp_vengeance','gepp_wayout']
)

newTopic('gepp_wayout',
'how to escape','come fuggire',false,
`"I have been looking for a way out for a long time. Even when the Shark has a cold and sleeps with his mouth open, if you walk on his tongue, he sneezes and you return to his stomach."`,
`"È da tanto tempo che cerco una via d'uscita. Anche quando il Pescecane ha il raffreddore e dorme con la bocca aperta, se si cammina sulla sua lingua, starnutisce e si torna nello stomaco".`,
`"But if the fish were dead, he couldn't sneeze.", Edmond notes.`,
`"Però se il pesce fosse morto, non potrebbe starnutire.", constata Edmond.`,
['gepp_killfish']
)

newTopic('gepp_vengeance',
'about the vengeance','della vendetta',true,
`"Vengeance?"`,
`"Vendetta?"`,
`Edmond sighs: "It's a long story that started fifteen years ago and that will take me just as long to finish it. But first I have to get out of here and, if I have to kill the fish to do it, I'll do it."`,
`Edmond sospira: "È una lunga storia che è iniziata ormai quindici anni fa e che mi occorrerà altrettanto tempo per concluderla. Prima però devo uscire da qui e, se per farlo devo uccidere il pesce, lo farò".`,
)

newTopic('gepp_killfish',
'how to kill the Shark','come uccidere il Pescecane',true,
`"But how can this be done? We have nothing to even tickle him."`,
`"Ma come si può fare? Non abbiamo nulla anche solo per fargli il solletico".`,
`"Years ago I lost all hopes and wanted to end my life, then help came from outside and life made sense again. Can a miracle happen twice?" Edmond reflects aloud.`,
`"Anni fa avevo perso ogni speranza e volevo farla finita, poi è arrivato un aiuto dall'esterno e la vita è tornata ad avere un senso. Un miracolo può accadere due volte?" riflette ad alta voce Edmond.`,
['gepp_talk']
)

newTopic('gepp_talk',
'about Pinocchio','di Pinocchio',false,
`While waiting for some good ideas or providential help from the outside, you tell each other your lives.`,
`In attesa di qualche buona idea o di un provvidenziale aiuto dall'esterno, vi raccontate a vicenda le vostre vite.`,
`Geppetto tells of his son's misdeeds and Edmond finds in that old carpenter the wisdom of the abbot who had given him new motivations to live.`,
`Geppetto racconta delle malefatte del figlio ed Edmond ritrova in quel vecchio falegname la saggezza dell'abate che gli aveva donato nuove motivazioni per vivere.`
)
action.gepp_talk=()=>{missiondone('l_room',droptext_l);return true}

//// epilogue

r=new Room('@epilogue')
r.name={en:'epilogue',it:'epilogo'}
r.desc={en:
`The dream ends here. A rude awakening awaits you. You have accomplished the mission requested by the "Librarian" and that's enough. But do you want to keep dreaming? Just hit "RESTART"!
<p>
<blockquote><i>
&ldquo;We don’t realize it, but our wealth compared
to the illiterates (or those literates who don’t read)
is that they are living and will live only their life and we have
lived many of them. We remember, together with our childhood
games, those of Proust, we yearned for our love but also for
that of Pyramus and Thisbe, we assimilated something of the
wisdom of Solon, we shivered for certain windy nights in
Saint Helena and we repeat, together with the fairy
tale that our grandmother told us, the one that
Sherazade had told.&rdquo;
(Umberto&nbsp;Eco)</i></blockquote>`
,it:
`Il sogno termina qui. Ti aspetta un brusco risveglio. La missione richiesta dal "Bibliotecario" l'hai compiuta e questo basta. Ma vuoi continuare a sognare? È sufficiente che premi "RICOMINCIA"!
<p>
<blockquote><i>
&ldquo;Non ce ne rendiamo conto, ma la nostra ricchezza
rispetto all’analfabeta (o di chi, alfabeta, non legge) è che lui sta
vivendo e vivrà solo la sua vita e noi ne abbiamo vissuto moltissime.
Ricordiamo, insieme ai nostri giochi d’infanzia, quelli di Proust,
abbiamo spasimato per il nostro amore ma anche per quello di Piramo
e Tisbe, abbiamo assimilato qualcosa della saggezza di Solone,
abbiamo rabbrividito per certe notti di vento a Sant’Elena e ci ripetiamo,
insieme alla fiaba che ci ha raccontato la nonna, quella
che aveva raccontato Sherazade.&rdquo;
(Umberto&nbsp;Eco)</i></blockquote>`
}

}