const express = require('express');
const app = express();

const news = require ('./news.json');

app.get('/', (req, res) => {
    res.send(news)
});

app.listen(3000, () => console.log('App started on port 3000'));