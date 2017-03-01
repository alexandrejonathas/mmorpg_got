function UsuariosDAO(conn){
  this._conn = conn();
};

UsuariosDAO.prototype.inserirUsuario = function(usuario){
  this._conn.open(function(error, mongoclient){
    mongoclient.collection('usuarios', function(error, collection){
      collection.insert(usuario);
      collection.close();
    });
  });
};

module.exports = function(){
  return UsuariosDAO;
};
