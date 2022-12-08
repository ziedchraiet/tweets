const express = require("express");
const engine = require("express-handlebars").engine;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'tweets'
});
 
connection.connect();

const app = express();



app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");





app.get('/',(req, res) => {
    connection.query('SELECT * FROM `statut`',function(error,results,fields){
      if (error) throw error;
      console.log('The solution is: ', results[0].nomauteur);
      res.render("home",{
        title:"Welcome to tweets  | Best social media website !!",
        nomauteur: results[0].nomauteur,
        textstatut: results[0].textstatut,
        timetweet: results[0].tempspub,
      });
    })
  });
  

app.listen(3000);