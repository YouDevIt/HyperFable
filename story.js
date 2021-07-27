
start('kitchen')
var r
r=new room('kitchen')
r.addname('it','cucina')
r.desc="A large kitchen with a {table}."
r.adddesc('it',"Un'ampia cucina in cui vedi un {table}.")
var t
t=new thing('pen')
t.addname('it','penna')
t.itfemale=true
t=new thing('hat')
t.addname('it','cappello')
t.wearable=true
r.add(t)
t=new thing('coat')
t.addname('it','cappotto')
t.wearable=true
r.add(t)
t=new supporter('table')
t.addname('it','tavolo')
t.loc='kitchen'
t=new container('box')
t.addname('it','scatola')
t.desc="A nice {box}."
t.adddesc('it',"Una bella {box}.")
t.closed=false
t.itfemale=true
r.add(t)
t=new actor('Pippo')
t.desc="A handsome {Pippo}."
t.adddesc('it',"Un bel {Pippo}.")
t.proper=true
r.add(t)
var r2
r2=new room('garden')
r2.addname('it','giardino')
r2.desc="A green garden."
r2.adddesc('it',"Un verde giardino.")

t=new exit("garden-west")
t.name='west'
t.addname("it","ovest")
t.roomto='kitchen'
r2.addexit(t)

t=new exit("kitchen-east")
t.name='east'
t.addname("it","est")
t.roomto='garden'
r.addexit(t)