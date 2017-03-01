/*
  01 - Importar o modulo do express
  02 - Importar o modulo consign
  03 - Importar o body-parser
  04 - Importar o express-validator
  05 - Inicializar o express
  06 - Exportar a variavel app
  07 - Setar as variaveis view engine e view do express
  08 - Configurar o middleware express.static
  09 - Configurar o middleware body-parser
  10 - Configurar o middleware express-validator
  11 - Configurar o consign modulo responsavel pelo autoload
  12 - Importar o express-session
*/

var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');


var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());
app.use(expressSession({secret: 'rererere', resave: false, saveUninitialized: false}));

consign()
  .include('app/routes')
  .then('config/dbConnection.js')
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;
