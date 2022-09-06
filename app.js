const express = require('express');
const mongoose = require('mongoose');
const routesUser = require('./routes/users');
const routesCards = require('./routes/cards');
const { NOT_FOUND_ERROR } = require('./constants/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false.valueOf,
});

app.use((req, res, next) => {
  req.user = {
    _id: '63118c6481ba22e901e5e83f',
  };
  next();
});

app.use(express.json());
app.use('/users', routesUser);
app.use('/cards', routesCards);

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена.' });
});

app.listen(PORT);
