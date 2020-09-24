const express = require('express')
const app = express()
const bodyparser = require('body-parser')
 
const ObjectId = require('mongodb').ObjectID
 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://falcao123456:lipe123456@A@cluster0.b4zck.mongodb.net/Cluster0?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('Cluster0') // coloque o nome do seu DB
    app.listen(3000, function() {
        console.log('server running on port 3000')

    })

})
 
app.use(bodyparser.urlencoded({ extended: true}))
 
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
    res.render('index.ejs');
});
 
app.post('/show', (req, res)=>{
    //criar a coleção “data”, que irá armazenar nossos dados
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)
     
        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
      })
});

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})
 
app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })
 
    })
})
app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var nomedolivro = req.body.nomedolivro
  var surname = req.body.nomedaeditora
  var name = req.body.name
  var name = req.body.name
  var name = req.body.name
  var name = req.body.name
  var name = req.body.name
  

 
  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      nomedolivro: nomedolivro,
      surname: surname,
      surname: surname,
      surname: surname,
      surname: surname,
      surname: surname,
      surname: surname
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})
app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})








