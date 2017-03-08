function UsuariosDAO(conn){
  this._conn = conn();
};

UsuariosDAO.prototype.inserirUsuario = function(usuario){
  this._conn.open(function(error, mongoclient){
    mongoclient.collection('usuarios', function(error, collection){
      collection.insert(usuario);
      mongoclient.close();
    });
  });
};

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
  this._conn.open(function(error, mongoclient){
    mongoclient.collection('usuarios', function(error, collection){
        collection.find(usuario).toArray(function(error, result){
          if(result[0] != undefined){
            req.session.autorizado = true;
            req.session.login = result[0].login;
            req.session.casa = result[0].casa;
          }
          if(req.session.autorizado){
            res.redirect("jogo");
          }else{
            res.render("index", {usuario: usuario, errors: {}});
          }
        });
        mongoclient.close();
    });

  });
}

module.exports = function(){
  return UsuariosDAO;
};
