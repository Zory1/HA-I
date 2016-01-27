var mongoose = require('mongoose'),
Pixel = mongoose.model('Pixel');

exports.findAll = function(req, res){
  Pixel.find({},function(err, results) {
    return res.send(results);
  
  });
};

exports.import = function(req, res){
  Pixel.create(
    { "id_received":"thisissomelonghashedid"}
  , function (err) {
    if (err) return console.log(err);
    return res.send(202);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Pixel.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  Pixel.create(req.body, function (err, pixel) {
    if (err) return console.log(err);
    res.setHeader("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    //res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return res.send(pixel);
  });
}

exports.redir = function(req, res) {
  Pixel.create(req.body, function (err, pixel) {
    if (err) return console.log(err);
    res.writeHead(302,{
        'Content-Type':'text/plain',
        'Location':'http://google.com/'
    });
    return res.end();
  });
}

exports.cookie_drop = function(req, res) {
  var ref = req.header('Referer'); 
  Pixel.create({"id_received":req.params.id}, function (err, pixel) {
    if (err) return console.log(err);
    res.cookie('cookieName','1234567', { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully, and here is an id '+req.params.id);
    console.log('and here is where request came from: '+ ref);
   // res.writeHead(302,{
     //   'Content-Type':'text/plain',
       // 'Location':'http://google.com/'
    //});
    res.redirect('back'); 
    return res.end();
  });
}

exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;
  
  console.log(req.body);

  Pixel.update({"_id":id}, {$set: updates},
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %d pixel', numberAffected);
      return res.send(202);
  });
}

exports.delete = function(req, res){
  var id = req.params.id;
  Pixel.remove({'_id':id},function(result) {
    return res.send(result);
  });
};