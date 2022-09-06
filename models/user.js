const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Не должно быть пустым'],
    minlength: [2, 'Должно быть не менее {VALUE}'],
    maxlength: [30, 'Должно быть неболее {VALUE}'],
  },
  about: {
    type: String,
    required: [true, 'Не должно быть пустым'],
    minlength: [2, 'Должно быть не менее {VALUE}'],
    maxlength: [30, 'Должно быть неболее {VALUE}'],
  },
  avatar: {
    type: String,
    required: [true, 'Не должно быть пустым'],
  },
});

module.exports = mongoose.model('user', userSchema);
