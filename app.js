const express = require('express');
const mongoose = require('mongoose');
const routesUser = require('./routes/users');
const routesCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const { NOT_FOUND_ERROR } = require('./constants/constants');
const {
  login, createUser,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});
app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', routesUser);
app.use('/cards', routesCards);

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена.' });
});

app.listen(PORT);
