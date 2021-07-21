setplayerid('player')
var a= new actor('player')
a.loc='kitchen'
a.objects= ['pen','box']
a.wears= ['hat','coat']
addobject(a)
var t=new thing('pen')
t.addname('it','penna')
t.itfemale=true
addobject(t)
t=new thing ('hat')
t.addname('it','cappello')
t.wearable= true
addobject(t)
t= new thing ('coat')
t.addname('it','cappotto')
t.wearable= true
addobject(t)
t=new supporter('table')
t.addname('it','tavolo')
addobject(t)
t=new container('box')
t.addname('it','scatola')
t.itfemale=true
addobject(t)
var r=new room('kitchen')
r.addname('it','cucina')
r.desc="A large kitchen with a {table}."
r.adddesc('it',"Un'ampia cucina in cui vedi un {table}.")
r.objects=['pen','box']
//inner ('$message',JSON. stringify(world))
addobject(r)
