var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PixelSchema = new Schema({
  id_value: String,
  id_name: String,  
  data: { type : Object , "default" :{} }
});

mongoose.model('Pixel', PixelSchema);