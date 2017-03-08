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

UsuariosDAO.prototype.autenticar = function(usuario){
  this._conn.open(function(error, mongoclient){

    mongoclient.collection('usuarios', function(error, collection){
        collection.find(usuario).toArray(function(error, result){
          console.log(result);
        });
        mongoclient.close();
    });

  });
}

module.exports = function(){
  return UsuariosDAO;
};
