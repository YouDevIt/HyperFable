//// example world

var i,t,r,r2

// intro

i=new intro()
i.name='The Library'
objectAddname(i,"it","La Biblioteca")
i.it_femminile=true
i.desc='A story about stories by Leonardo Boselli<p>\
    <blockquote><i>"&nbsp;We do not realize it, but our wealth compared\
    to the illiterates (or those who, who are literate, do not read)\
    is that they are living and will live only their life and we have\
    lived many of them. We remember, together with our childhood\
    games, those of Proust, we yearned for our love but also for\
    that of Pyramus and Thisbe, we assimilated something of the\
    wisdom of Solon, we shivered for certain windy nights in\
    Saint Helena and we we repeat, together with the fairy\
    tale that the grandmother told us, the one that\
    Sherazade had told.&nbsp;"<div align="right">Umberto&nbsp;Eco\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></i></blockquote>'
objectAdddesc(i,"it",'Una storia sulle storie di Leonardo Boselli<p>\
    <blockquote><i>"&nbsp;Non ce ne rendiamo conto, ma la nostra ricchezza\
    rispetto all’analfabeta (o di chi, alfabeta, non legge) è che lui sta\
    vivendo e vivrà solo la sua vita e noi ne abbiamo vissuto moltissime.\
    Ricordiamo, insieme ai nostri giochi d’infanzia, quelli di Proust,\
    abbiamo spasimato per il nostro amore ma anche per quello di Piramo\
    e Tisbe, abbiamo assimilato qualcosa della saggezza di Solone,\
    abbiamo rabbrividito per certe notti di vento a Sant’Elena e ci ripetiamo,\
    insieme alla fiaba che ci ha raccontato la nonna, quella\
    che aveva raccontato Sherazade.&nbsp;"<div align="right">Umberto&nbsp;Eco\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></i></blockquote>')
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
