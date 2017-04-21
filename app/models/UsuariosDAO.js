var crypto = require('crypto');

function UsuariosDAO(conn){
  this._conn = conn();
};

UsuariosDAO.prototype.inserirUsuario = function(usuario, req, res){
  this._conn.open(function(error, mongoclient){
    mongoclient.collection('usuarios', function(error, collection){
      usuario.senha = crypto.createHash("md5").update(usuario.senha).digest("hex");
      collection.insert(usuario);
      mongoclient.close();
      res.render('index', {usuario: {}, errors: {}});
    });
  });
};

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
  this._conn.open(function(error, mongoclient){
    mongoclient.collection('usuarios', function(error, collection){
        var senha = crypto.createHash("md5").update(usuario.senha).digest("hex");
        collection.find({login: usuario.login, senha: senha}).toArray(function(error, result){
          if(result[0] != undefined){
            req.session.autorizado = true;
            req.session.login = result[0].login;
            req.session.casa = result[0].casa;
          }
          if(req.session.autorizado){
            res.redirect("jogo");
          }
          else if(usuario.login !== '' && usuario.senha !== '' && !req.session.autorizado){
            usuario.senha = '';
            res.render("index", {usuario: usuario, errors: [{msg: 'Usuário ou senha inválido!'}]});
          }
          else{
            res.render("index", {usuario: usuario, errors: {}});
          }
          mongoclient.close();
        });
    });
  });
}

module.exports = function(){
  return UsuariosDAO;
};
