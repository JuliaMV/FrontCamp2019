const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { logFile } = require('./middlewares/logger');
const { router } = require('./routers');

const db = "mongodb+srv://guest:kawsfdwtwaobbHUC@cluster0-rpliv.mongodb.net/frontcamp?retryWrites=true&w=majority";

try {
  fs.unlinkSync(logFile);
} catch {}

app.set('view engine', 'pug');
app.set('views','./src/views');

app.use('/', router);

mongoose.connect(db, {useNewUrlParser: true})
  .then(() => {
    console.log('MongoAtlas connected');
  })
  .catch(error => {
    console.log('MongoAtlas connection error', error);
  });

app.listen(3000, () => console.log('App started on port 3000'));

