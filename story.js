//// example world

{

let i,t,r,r2

// intro

i=new Intro()
i.name={en:'Example Story',it:"Storia d'esempio"}
i.it_femminile=true
i.author="Leonardo Boselli"
i.email="leonardo.boselli@youdev.it"
i.subtitle={en:"A simple example",it:"Un semplice esempio"}
i.release="1"
i.date="2021-08-23"
i.code="EXST"

t=new Person('@yourself')
t.name=w.Character
t.desc=w.Chardesc
i.addObj(t)
setChar(t)

t=new Exit("Start",i,'kitchen')
t.addName("it","Inizia")

t=new Portal("Help",i,'@help','@world-help')
t.addName("it","Aiuto")

t=new Portal("About",i,'@about','@world-about')

//// rooms

// kitchen

r=new Room('kitchen')
r.addName('it','cucina')
r.it_femminile=true
r.desc={
  en:"A large kitchen with a {table}.",
  it:"Un'ampia cucina in cui vedi un {table}."
}

t=new Thing('apple')
t.addName('it','mela')
t.desc={
  en:"An edible {apple}.",
  it:"Una {apple} appetitosa."
}
t.it_femminile=true
t.edible=true
r.addObj(t)

t=new Thing('hat')
t.addName('it','cappello')
t.wearable=true
r.addObj(t)

t=new Thing('coat')
t.addName('it','cappotto')
t.wearable=true
r.addObj(t)

t=new Thing('goose')
t.addName('it','oca')
t.it_femminile=true
r.addObj(t)

t=new Thing('quill')
t.addName('it','penna')
t.it_femminile=true
r.addObj(t)
t=new Supporter('table')
t.addName('it','tavolo')
t.scenery=true
r.addObj(t)

t=new Container('box')
t.addName('it','scatola')
t.pushable=true
t.it_femminile=true
t.desc={
  en:"A nice [open or closed] {box}.",
  it:"Una bella {box} [aperto o chiuso]."
}
t.closable=true
r.addObj(t)

t=new Exit("kitchen-east",r,'garden')
t.name=w.e

t=new Exit("kitchen-south",r,'garage')
t.name=w.s
t.crossable=true

// garden

r2=new Room('garden')
r2.addName('it','giardino')
r2.desc={en:"A green garden.",it:"Un verde giardino."}

t=new Exit("garden-west",r2,'kitchen')
t.name=w.w

// garage

r2=new Room('garage')
r2.desc={en:"A small garage.",it:"Un piccolo garage."}

t=new Exit("garage-north",r2,'kitchen')
t.name=w.n
t.crossable=true

}