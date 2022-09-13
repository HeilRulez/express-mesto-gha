const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Должно быть не менее {VALUE}'],
    maxlength: [30, 'Должно быть неболее {VALUE}'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Должно быть не менее {VALUE}'],
    maxlength: [30, 'Должно быть неболее {VALUE}'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Не должно быть пустым'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Не должно быть пустым'],
    select: false,
    minlength: [8, 'Должно быть не менее {VALUE}'],
  },
});

module.exports = mongoose.model('user', userSchema);
