const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SetSchema = new Schema({
  spanish: String,
  english: String,
  group: String,
  type: String
});

module.exports = mongoose.model('Set', SetSchema);