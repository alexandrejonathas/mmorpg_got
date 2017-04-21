var ObjectId = require("mongodb").ObjectId;

function JogoDAO(connection){
  this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario){
  this._connection.open(function(err, mongoclient){
    mongoclient.collection("jogo", function(err, collection){
      collection.insert({
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random()*1000),
        sabedoria: Math.floor(Math.random()*1000),
        comercio: Math.floor(Math.random()*1000),
        magia: Math.floor(Math.random()*1000)
      })
      mongoclient.close();
    });
  });
}

JogoDAO.prototype.iniciaJogo = function(req, res, usuario, casa, msg){
  this._connection.open(function(error, mongoclient){
    mongoclient.collection('jogo', function(error, collection){
        collection.find({usuario: usuario}).toArray(function(error, result){
          res.render("jogo", {img_casa: casa, jogo: result[0], msg: msg});
          mongoclient.close();
        });
    });

  });
}

JogoDAO.prototype.acao = function(req, res, dados){
  this._connection.open(function(error, mongoclient){
    mongoclient.collection('acao', function(error, collection){
        var date = new Date();
        var tempo = null;
        switch (parseInt(dados.acao)) {
          case 1: tempo = 1*60*60000;break;
          case 2:tempo = 2*60*60000;break;
          case 3:tempo = 5*60*60000;break;
          case 4:tempo = 5*60*60000;break;
        }
        dados.termina_em = date.getTime() + tempo;
        collection.insert(dados);
    });

    mongoclient.collection('jogo', function(error, collection){

        var moedas = null;
        switch (parseInt(dados.acao)) {
          case 1: moedas = -2 * dados.quantidade;break;
          case 2:moedas = -3 * dados.quantidade;break;
          case 3:moedas = -1 * dados.quantidade;break;
          case 4:moedas = -1 * dados.quantidade;break;
        }

        collection.update(
          {usuario: dados.usuario},
          {$inc: {moeda: moedas}}
        );
        mongoclient.close();
    });
  });
}

JogoDAO.prototype.getAcoes = function(req, res, usuario){
  this._connection.open(function(error, mongoclient){
    mongoclient.collection('acao', function(error, collection){

        var date = new Date();
        var momento_atual = date.getTime();

        collection.find({usuario: usuario, termina_em: {$gt:momento_atual}}).toArray(function(error, result){

          res.render("pergaminhos", {acoes: result});

          mongoclient.close();
        });
    });
  });
}

JogoDAO.prototype.revogarAcao = function(req, res, _id){
  this._connection.open(function(error, mongoclient){
    mongoclient.collection('acao', function(error, collection){
        collection.remove(
          {_id: ObjectId(_id)},
          function(err, result){
            res.redirect("/jogo?msg=D");
            mongoclient.close();
          }
        );
    });
  });
}

module.exports = function(){
  return JogoDAO;
}
