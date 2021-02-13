let express = require('express');
 let app = express();
 var cors = require('cors')
 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: true });
 app.use(
    express.urlencoded({
      extended: true
    })
  )
  
app.use(express.json())
 app.use(cors())
 

 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });

 app.get('/list',(req, res) => {
    var list = require('./connection.js');
   
   list.product_list(res);
 });

 app.post('/go',(req, res) => {
    var createproduct = {
        nom: req.body.nom,
        prix_unit: req.body.prix_unit,
        qte: req.body.qte
       }
    var add = require('./connection.js');
    add.insert(createproduct,res);
 });

 app.delete('/delete/:id', function (req, res) {
   var id=req.params.id;
  //console.log(req.body);
  var del = require('./connection.js');
   del.delete(id,res);
 });

 app.put('/update/:id', function (req, res) {
  var id=req.params.id;
  var nom=req.params.nom;
  var prix_unit=req.params.prix_unit;
  var qte=req.params.qte;

  
 //console.log(req.body);
 var up = require('./connection.js');
  up.update(id,req,res);
});

 
 
 // set port
 app.listen(3000, function () {
     console.log('Node app is running on port 3000');
 });
 module.exports = app;