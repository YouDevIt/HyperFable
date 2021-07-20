
var world=new world('player')
var a= new actor('player')
a.loc='kitchen'
a.objects= ['pen','box']
a.wears= ['hat','coat']
world.add(a)
var t=new thing('pen')
t.itfemale=true
world.add(t)
t= new thing ('hat')
t.wearable= true
world.add(t)
t= new thing ('coat')
t.wearable= true
world.add(t)
t=new supporter('table')
world.add(t)
t=new container('box')
t.itfemale=true
world.add(t)
var r=new room('kitchen')
r.desc='kitchendesc'
r.objects=['pen','box']
world.add(r)

story={
  kitchen:{en:'kitchen',it:'cucina'},
  kitchendesc:{
    en:"A large kitchen with a {table}.",
    it:"Un'ampia cucina in cui vedi un {table}."},
  pen:{en:'pen',it:'penna'},
  table:{en:'table',it:'tavolo'},
  box:{en:'box',it:'scatola'},
  hat :{en: 'hat',it: 'cappello'},
  coat:{en:'coat',it: 'cappotto'},
}