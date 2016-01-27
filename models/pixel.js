var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PixelSchema = new Schema({
  id_received: String
});

mongoose.model('Pixel', PixelSchema);