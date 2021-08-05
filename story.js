//// example world

var i,t,r,r2

// intro

i=new intro()
i.name='Example Story'
i.addname("it","Storia d'esempio")
i.it_femminile=true
i.desc='A simple example<br>by Leonardo Boselli'
i.adddesc("it","Un semplice esempio<br>di Leonardo Boselli")
t=new exit("Start")
t.addname("it","Inizia")
t.roomto='kitchen'
i.addexit(t)
t=new exit("Help")
t.addname("it","Aiuto")
t.roomto='@help'
i.addexit(t)

//// rooms

// kitchen

r=new room('kitchen')
r.it_femminile=true
r.addname('it','cucina')
r.desc="A large kitchen with a {table}."
r.adddesc('it',"Un'ampia cucina in cui vedi un {table}.")
t=new thing('hat')
t.addname('it','cappello')
t.wearable=true
r.add(t)
t=new thing('coat')
t.addname('it','cappotto')
t.wearable=true
r.add(t)
t=new thing('goose')
t.addname('it','oca')
t.it_femminile=true
r.add(t)
t=new thing('quill')
t.addname('it','penna')
t.it_femminile=true
r.add(t)
t=new supporter('table')
t.addname('it','tavolo')
t.scenery=true
r.add(t)
t=new container('box')
t.addname('it','scatola')
t.desc="A nice [open or closed] {box}."
t.adddesc('it',"Una bella {box} [aperto o chiuso].")
t.closable=true
t.it_femminile=true
r.add(t)

t=new exit("kitchen-east")
t.name='east'
t.addname("it","est")
t.roomto='garden'
r.addexit(t)

// garden

r2=new room('garden')
r2.addname('it','giardino')
r2.desc="A green garden."
r2.adddesc('it',"Un verde giardino.")

t=new exit("garden-west")
t.name='west'
t.addname("it","ovest")
t.roomto='kitchen'
r2.addexit(t)
