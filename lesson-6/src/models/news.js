const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String, 
  description: String, 
  urlToImage: String, 
  url: String, 
  publishedAt: String,
}, {
  versionKey: false,
});


var NewsModel = mongoose.model('News', newsSchema);

module.exports = { NewsModel };
