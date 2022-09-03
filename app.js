const express = require('express');
const mongoose = require('mongoose');
const routesUser = require('./routes/users');
const routesCards = require('./routes/cards');
const { PORT = 3000} = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false
});

app.use((req, res, next) => {
  req.user = {
    _id: '63118c6481ba22e901e5e83f'
  };
  next();
});

app.use(express.json());
app.use(routesUser);
app.use(routesCards);

app.listen(PORT, () =>{console.log('Server started')})