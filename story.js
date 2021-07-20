
var world=new world('player')
var a= new actor('player')
a. loc='kitchen'
world. add (a)
var r=new room('kitchen')
r.desc='kitchendesc'
world.add(r)
var t=new thing('pen')
t.itfemale=true
world.add(t)
t=new supporter('table')
world.add(t)
t=new container('box')
t.itfemale=true
world.add(t)

story={
  kitchen:{en:'kitchen',it:'cucina'},
  kitchendesc:{
    en:"A large kitchen in which you see {table} on which you see {pen} in {box}.",
    it:"Un'ampia cucina in cui vedi {table} con sopra {pen} in {box}."},
  pen:{en:'pen',it:'penna'},
  table:{en:'table',it:'tavolo'},
  box:{en:'box',it:'scatola'},
}