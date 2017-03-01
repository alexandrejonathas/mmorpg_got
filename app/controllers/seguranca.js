module.exports.autenticar = function(application, req, res){

  var dados = req.body;

  req.assert('login', 'O login é obrigatório!').notEmpty();
  req.assert('senha', 'A senha é obrigatória!').notEmpty();

  console.log(dados);

  var errors = req.validationErrors();

  if(errors){
    res.render('index', {usuario: dados, errors: errors});
    return;
  }

  var conn = application.config.dbConnection;
  var UsuariosDAO = application.app.models.UsuariosDAO(conn);

  

  res.send("Logou");
};
