var mysql = require('mysql');
let config=require("./config.js");
const app = require('./server.js');
let connection = mysql.createConnection(config);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


module.exports = {
    product_list: function (res) {
        connection.query('SELECT * from produit', function (error, results, fields) {
            if (error) throw error;
            return res.send(JSON.stringify(results))
            
          });
          
       
    },

        insert: function (createproduct,res) {
            
              
            connection.query('INSERT INTO produit SET ?', createproduct, function (error, results, fields) {
                if (error) throw error;
                return res.send(JSON.stringify(results))
                
              });

            },

            delete: function (id,res) {                  
                connection.query('DELETE FROM `produit` WHERE `id`=?',[id] ,function (error, results, fields) {
                    if (error) throw error;
                    return res.send(JSON.stringify(results))
                    
                  });
    
                },

                update: function (id,req,res) {                  
                    connection.query('UPDATE `produit` SET `nom`=?,`prix_unit`=?,`qte`=? where `id`=?', [req.body.nom,req.body.prix_unit,req.body.qte,id],function (error, results, fields) {
                        if (error) throw error;
                        return res.send(JSON.stringify(results))
                        
                      });
                    

             
    
        }
    }