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
 
app.set('views engine', 'ejs')



// Codigos referente a segunda pagina********************************************************************


app.get('/cadastrarcliente', function(req, res){
  res.render('cadastrarcliente/index2.ejs');
   });

   app.post('/show2', (req, res)=>{
    //criar a coleção “data”, que irá armazenar nossos dados
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)
     
        console.log('Salvo no Banco de Dados')
        res.redirect('/show2')
      })
});

app.get('/cadastrarcliente', (req, res) => {
    var cursor = db.collection('data').find()
})
 
app.get('/show2', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('cadastrarcliente/show2.ejs', { data: results })
 
    })
})
// METODO EDITAR SEGUNDA PAGINA***************************************************

app.route('/edit2/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('cadastrarcliente/edit2.ejs', { data: result })
  })
})

.post((req, res) => {
  var id = req.params.id
  var nome = req.body.nome
  var sobrenome = req.body.sobrenome
  var cpf = req.body.cpf
  var datanascimento = req.body.datanascimento
  var email = req.body.email
  var pais = req.body.pais
  var estado = req.body.estado
  var rua = req.body.rua
  var numerocasa = req.body.numerocasa
  var numerocontato = req.body.numerocontato

 
  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      nome: nome,
      sobrenome: sobrenome,
      cpf: cpf,
      datanascimento: datanascimento,
      email: email,
      pais: pais,
      estado: estado,
      rua: rua,
      numerocasa: numerocasa,
      numerocontato: numerocontato,
      
    }
  }, 
  (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show2')
    console.log('Atualizado no Banco de Dados')
  })
})

// METODO DELETE DA SEGUNDA PAGINA***********************************************
   
app.route('/delete2/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show2')
  })
})

//FInal do codigo****************************************************************************************






app.get('/', function(req, res){
  res.render('cadastrodelivro/index.ejs');
});
 
app.post('/show', (req, res)=>{
    //criar a coleção “data”, que irá armazenar nossos dados
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)
     
        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
      })
});

app.get('/cadastrodelivro', (req, res) => {
    var cursor = db.collection('data').find()
})
 
app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('cadastrodelivro/show.ejs', { data: results })
 
    })
})
app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('cadastrodelivro/edit.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var nomedolivro = req.body.nomedolivro
  var nomedaeditora = req.body.nomedaeditora
  var nomedoautor = req.body.nomedoautor
  var numerodovolume = req.body.numerodovolume
  var numerodepaginas = req.body.numerodepaginas
  var datadelançamento = req.body.datadelançamento
  var numerodaedição = req.body.numerodaedição
  var codigodolivro = req.body.codigodolivro
  
 
  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      nomedolivro: nomedolivro,
      nomedaeditora: nomedaeditora,
      nomedoautor: nomedoautor,
      numerodovolume: numerodovolume,
      numerodepaginas: numerodepaginas,
      datadelançamento: datadelançamento,
      numerodaedição: numerodaedição,
      codigodolivro: codigodolivro,
      
    }
  }, 

  (err, result) => {
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