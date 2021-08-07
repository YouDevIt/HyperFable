//// example world

var i,t,r,r2

// intro

i=new Intro()
i.name={en:'Example Story',it:"Storia d'esempio"}
i.it_femminile=true
i.author="Leonardo Boselli"
i.email="leonardo.boselli@youdev.it"
i.subtitle={en:"A simple example",it:"Un semplice esempio"}
i.release="1"
i.date="2021-08-07"

t=new Exit("Start",i,'kitchen')
addName(t,"it","Inizia")

t=new Exit("Help",i,'@help')
addName(t,"it","Aiuto")

//// rooms

// kitchen

r=new Room('kitchen')
addName(r,'it','cucina')
r.it_femminile=true
r.desc={
  en:"A large kitchen with a {table}.",
  it:"Un'ampia cucina in cui vedi un {table}."
}
t=new Thing('hat')
addName(t,'it','cappello')
t.wearable=true
addObj(r,t)
t=new Thing('coat')
addName(t,'it','cappotto')
t.wearable=true
addObj(r,t)
t=new Thing('goose')
addName(t,'it','oca')
t.it_femminile=true
addObj(r,t)
t=new Thing('quill')
addName(t,'it','penna')
t.it_femminile=true
addObj(r,t)
t=new Supporter('table')
addName(t,'it','tavolo')
t.scenery=true
addObj(r,t)
t=new Container('box')
addName(t,'it','scatola')
t.it_femminile=true
t.desc={
  en:"A nice [open or closed] {box}.",
  it:"Una bella {box} [aperto o chiuso]."
}
t.closable=true
addObj(r,t)

t=new Exit("kitchen-east",r,'garden')
t.name=w.e

// garden

r2=new Room('garden')
addName(r2,'it','giardino')
r2.desc={en:"A green garden.",it:"Un verde giardino."}

t=new Exit("garden-west",r2,'kitchen')
t.name=w.w
