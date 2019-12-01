const fs = require('fs');
const express = require('express');
const app = express();

const { logFile } = require('./middlewares/logger');
const { router } = require('./routers');

fs.unlinkSync(logFile);

app.set('view engine', 'pug');
app.set('views','./src/views');

app.use('/', router);

app.listen(3000, () => console.log('App started on port 3000'));