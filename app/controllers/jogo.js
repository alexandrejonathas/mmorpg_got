module.exports.jogo = function(application, req, res){
  if(req.session.autorizado !== true){
    res.render("index", {usuario: {}, errors: {}});
    return;
  }

  var usuario = req.session.login;
  var casa = req.session.casa;

  var conn = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(conn);

  var msg = "";

  if(req.query.msg != ""){
    msg = req.query.msg;
  }

  JogoDAO.iniciaJogo(req, res, usuario, casa, msg);
};

module.exports.sair = function(application, req, res){
  req.session.destroy(function(err){
    res.redirect("/");
  });
};

module.exports.suditos = function(application, req, res){
  if(req.session.autorizado !== true){
    res.render("index", {usuario: {}, errors: {}});
    return;
  }

  res.render("aldeoes", {errors: {}});
};

module.exports.ordenar_sudito = function(application, req, res){

  if(req.session.autorizado !== true){
    res.render("index", {usuario: {}, errors: {}});
    return;
  }

  var dados = req.body;

  req.assert("acao", "A ação deve ser informada!").notEmpty();
  req.assert("quantidade", "A quantidade deve ser informada!").notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.redirect("jogo?msg=A");
    return;
  }

  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  dados.usuario = req.session.login;
  JogoDAO.acao(req, res, dados);
  res.redirect("/jogo?msg=B");
};

module.exports.pergaminhos = function(application, req, res){
  if(req.session.autorizado !== true){
    res.render("index", {usuario: {}, errors: {}});
    return;
  }
  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);
  var usuario = req.session.login;

  JogoDAO.getAcoes(req, res, usuario);

};

module.exports.revogar_acao = function(application, req, res){
  var url_query = req.query;

  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.revogarAcao(req, res, url_query.id);
};
