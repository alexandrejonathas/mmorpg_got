module.exports.autenticar = function(application, req, res){

  var dados = req.body;

  req.assert('login', 'O login é obrigatório!').notEmpty();
  req.assert('senha', 'A senha é obrigatória!').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('index', {usuario: dados, errors: errors});
    return;
  }

  var conn = application.config.dbConnection;
  var UsuariosDAO = new application.app.models.UsuariosDAO(conn);

  UsuariosDAO.autenticar(dados);

  res.send("Logou");
};
