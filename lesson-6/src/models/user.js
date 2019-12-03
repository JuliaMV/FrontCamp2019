const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
}, {
  versionKey: false,
});

userSchema.plugin(findOrCreate);

var UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };