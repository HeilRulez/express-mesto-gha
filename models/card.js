const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: ObjectID,
    required: true
  },
  likes: {
    type: [{ type: ObjectID, ref: 'user' }],
    default: []
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model('card', cardSchema);