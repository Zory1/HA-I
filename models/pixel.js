var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PixelSchema = new Schema({
  id_name: String,  
  id_value: String,
  domain: String,//where cookie originally resides
  impressions: [{
    owner: String,//whose ad is that - allows multi-domain ownership of the app
    camp_id: String,
    ad_id: String,
    dates: {type: Array, "default":[]},
    extra: {type : Object , "default" :{}}
  }]
});

mongoose.model('Pixel', PixelSchema);