//// example world

var i,t,r,r2

// intro

i=new intro()
i.name='Example Story'
objectAddname(i,"it","Storia d'esempio")
i.it_femminile=true
i.desc='A simple example<br>by Leonardo Boselli'
objectAdddesc(i,"it","Un semplice esempio<br>di Leonardo Boselli")
t=new exit("Start")
objectAddname(t,"it","Inizia")
t.roomto='kitchen'
roomAddexit(i,t)
t=new exit("Help")
objectAddname(t,"it","Aiuto")
t.roomto='@help'
roomAddexit(i,t)

//// rooms

// kitchen

r=new room('kitchen')
r.it_femminile=true
objectAddname(r,'it','cucina')
r.desc="A large kitchen with a {table}."
objectAdddesc(r,'it',"Un'ampia cucina in cui vedi un {table}.")
t=new thing('hat')
objectAddname(t,'it','cappello')
t.wearable=true
groupAdd(r,t)
t=new thing('coat')
objectAddname(t,'it','cappotto')
t.wearable=true
groupAdd(r,t)
t=new thing('goose')
objectAddname(t,'it','oca')
t.it_femminile=true
groupAdd(r,t)
t=new thing('quill')
objectAddname(t,'it','penna')
t.it_femminile=true
groupAdd(r,t)
t=new supporter('table')
objectAddname(t,'it','tavolo')
t.scenery=true
groupAdd(r,t)
t=new container('box')
objectAddname(t,'it','scatola')
t.desc="A nice [open or closed] {box}."
objectAdddesc(t,'it',"Una bella {box} [aperto o chiuso].")
t.closable=true
t.it_femminile=true
groupAdd(r,t)

t=new exit("kitchen-east")
t.name='east'
objectAddname(t,"it","est")
t.roomto='garden'
roomAddexit(r,t)

// garden

r2=new room('garden')
objectAddname(r2,'it','giardino')
r2.desc="A green garden."
objectAdddesc(r2,'it',"Un verde giardino.")

t=new exit("garden-west")
t.name='west'
objectAddname(t,"it","ovest")
t.roomto='kitchen'
roomAddexit(r2,t)
