//TO-DO: handle error in each of the requests
var mongoose = require('mongoose'),
Pixel = mongoose.model('Pixel');

exports.findAll = function(req, res){
  Pixel.find({},function(err, results) {
    if(err){console.log(err);}
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
    if(err){console.log(err);}
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
};

exports.redir = function(req, res) {
  Pixel.create(req.body, function (err, pixel) {
    if (err) return console.log(err);
    res.writeHead(302,{
        'Content-Type':'text/plain',
        'Location':'http://google.com/'
    });
    return res.end();
  });
};

exports.cookie_drop = function(req, res) {
  var ref = req.header('Referer'); 
  Pixel.create({"id_received":req.params.id}, function (err, pixel) {
    if (err) return console.log(err);
    res.cookie('cookieName','1234567', { maxAge: 900000, httpOnly: false });
    console.log('cookie created successfully, and here is an id '+req.params.id);
    console.log('and here is where request came from: '+ ref);
    res.redirect('back'); 
    return res.end();
  });
};

exports.cookie_drop_post = function(req, res){
  var info = req.params.data;
  var transformed = JSON.parse(info.substr(6));
  //console.log(transformed);
    //check for existing record

     // var exstid = result.impressions._id;
     // console.log(result);
    // Pixel.find(
    //   {
    //       "id_name":transformed.id_name, 
    //       "id_value":transformed.id_value, 
    //       "domain":transformed.domain, 
    //       "impressions": { 
    //         $elemMatch: {
    //           ad_id: transformed.impressions[0].ad_id,
    //           camp_id: transformed.impressions[0].camp_id,
    //           owner: transformed.impressions[0].owner
    //         }
    //       }
    //     }, function(err, results) {
    //       console.log("Results")
    //         console.log(results);
    //         console.log(err);
    //     });
        Pixel.update(
        {
          "id_name":transformed.id_name, 
          "id_value":transformed.id_value, 
          "domain":transformed.domain, 
          "impressions": { 
            $elemMatch: {
              "ad_id": transformed.impressions[0].ad_id,
              "camp_id": transformed.impressions[0].camp_id,
              "owner": transformed.impressions[0].owner
            }
           }
        }, 
        { 
          $push: 
          {
             'impressions.$.dates':transformed.impressions[0].dates[0]
          }
        }, 
        function(err, numberAffected, raw) {
            if(err){console.log(err);}
              //console.log("Attempted update:");
              //console.log(numberAffected);
              if(numberAffected.nModified < 1){
              Pixel.update(
                 {
                  "id_name":transformed.id_name, 
                  "id_value":transformed.id_value, 
                  "domain":transformed.domain
                  }, 
                  { 
                    $push: 
                    {
                       'impressions':transformed.impressions[0]
                    }
                  }, 
              function(err, numberAffected, raw) {
                if(err){console.log(err);}
                if(numberAffected.nModified <1){
                  Pixel.create(transformed, function(err) {
                          console.log(err);
                      });
                    }
                  });
            }
        });
  //Pixel.create(transformed, function (err, pixel) {
   // if (err) return console.log(err);
  
    
    res.cookie(transformed.domain+"-as-"+transformed.id_name,transformed.id_value, { maxAge: 900000, httpOnly: false });
    res.redirect('back'); 
    return res.end();
 // });
};

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
};

exports.delete = function(req, res){
  var id = req.params.id;
  Pixel.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.delete_all = function(req, res){
  Pixel.remove({},function(result) {
    var trans_date = new Date();
    console.log(trans_date +" |  Deleted all records.");
    return res.send(result);
  });
};