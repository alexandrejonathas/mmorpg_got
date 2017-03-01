module.exports = function(application){

  application.get('/', function(req, res){
    res.render('index', {usuario: {}, errors: {}});
  });

  application.post('/autenticar', function(req, res){
    application.app.controllers.seguranca.autenticar(application, req, res);
  });

};
