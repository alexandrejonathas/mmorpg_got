module.exports.cadastro = function(application, req, res){
  res.render('cadastro', {usuario: {}, errors: {}});
}

module.exports.cadastrar = function(application, req, res){
  var dados = req.body;

  req.assert('nome', 'O nome é obrigatório!').notEmpty();
  req.assert('login', 'O login é obrigatório!').notEmpty();
  req.assert('login', 'O login deve conter entre 4 e 15 caracteres!').len(4, 15);
  req.assert('senha', 'A senha é obrigatória!').notEmpty();
  req.assert('casa', 'A casa é obrigatória!').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('cadastro', {usuario: dados, errors: errors});
    return;
  }

  var conn = application.config.dbConnection;
  var UsuariosDAO = new application.app.models.UsuariosDAO(conn);
  var JogoDAO = new application.app.models.JogoDAO(conn);

  UsuariosDAO.inserirUsuario(dados, req, res);
  JogoDAO.gerarParametros(dados.login);
}
