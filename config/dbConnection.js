var mongo = require('mongodb');

var conn = function(){
  console.log('Abriu a conexão');
  var db = new mongo.Db('got', new mongo.Server('localhost', 27017, {}), {});
  return db;
}

module.exports = function(){
  return conn;
}
