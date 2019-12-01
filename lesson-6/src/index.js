const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { logFile } = require('./middlewares/logger');
const { router } = require('./routers');

const uri = "mongodb+srv://guest:kawsfdwtwaobbHUC@cluster0-rpliv.mongodb.net/frontcamp?retryWrites=true&w=majority";

try {
  fs.unlinkSync(logFile);
} catch {}

app.set('view engine', 'pug');
app.set('views','./src/views');

app.use('/', router);

mongoose.connect(uri, {useNewUrlParser: true});

app.listen(3000, () => console.log('App started on port 3000'));

const db = mongoose.connection;
db.once('open', function() {
  console.log('MongoAtlas connected');
});

// Add data to Mongo Atlas
// const { NewsModel } = require('./data/news');
// const n1 = new NewsModel({
//   title: "London Bridge attack: What is the Learning Together scheme?",
//   description: "Both victims of the attack worked on the scheme, set up to help rehabilitate prisoners after release.",
//   urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/1620C/production/_109963609_41ca013d-5fea-4dac-9615-e5b8c5b031f9.jpg",
//   url: "https://www.bbc.co.uk/news/uk-50623646",
//   publishedAt: "2019-12-01T19:03:04Z",
// });

// const n2 = new NewsModel({
//   title: "Rangers 5-0 Hearts: Glen Kamara to Juventus reports 'made up story' - Steven Gerrard",
//   description: "Manager Steven Gerrard brands Juventus' rumoured interest in Rangers midfielder Glen Kamara as \"another made up story\".",
//   urlToImage: "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/11CE8/production/_109963927_kamara.jpg",
//   url: "https://www.bbc.co.uk/sport/football/50623999",
//   publishedAt: "2019-12-01T19:01:33Z",
// });

// const n3 = new NewsModel({
//   title: "WSL Highlights: West Ham United 3-2 Manchester United",
//   description: "Katharina Baunach scored two late free-kicks as West Ham came from behind to beat Manchester United 3-2 in the WSL.",
//   urlToImage: "https://m.files.bbci.co.uk/modules/bbc-morph-sport-page/3.3.2/images/bbc-sport-logo.png",
//   url: "https://www.bbc.co.uk/sport/av/football/50606382",
//   publishedAt: "2019-12-01T18:17:42Z",
// });


// n1.save((err) => {
//   if (err) return console.error(err);
// });

// n2.save((err) => {
//   if (err) return console.error(err);
// });

// n3.save((err) => {
//   if (err) return console.error(err);
// });