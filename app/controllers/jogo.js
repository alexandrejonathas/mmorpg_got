module.exports.jogo = function(application, req, res){
  if(req.session.autorizado){
    res.render("jogo");
  }else{
    res.render("index", {usuario: {}, errors: {}});
  }
};

module.exports.sair = function(application, req, res){
  req.session.destroy()
  res.redirect("jogo");
};
