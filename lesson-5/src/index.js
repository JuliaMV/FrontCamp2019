const fs = require('fs');
const path = require('path');
const util = require('util');
const winston = require('winston');
const express = require('express');
const app = express();

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let idCounter = 4;

const newsFile = path.join(__dirname, './data/news.json');
const logFile = path.join(__dirname, 'logfile.log');

fs.unlinkSync(logFile);

app.set('view engine', 'pug');
app.set('views','./src/views');

const updateNewsFile = async (data) => {
  await writeFileAsync(newsFile, JSON.stringify(data, null, 2));
};

const readNewsFile = async () => {
  const data = await readFileAsync(newsFile, 'utf-8');
  return JSON.parse(data);
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: logFile, timestamp: true })
  ]
});

app.use(express.json());

app.use((req, res, next) => {
  const { url } = req;
  logger.log('info', url);
  next();
})

app.use((error, req, res, next) => {
  res.render('index', { title: 'Error', message: `${error.message}` });
  res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Main', message: 'Some news APi'});
  res.status(200).send('OK');
});

app.get('/news', async (req, res, next) => {
  try {
    const news = await readNewsFile();
    res.json(news);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

app.get('/news/:id', async (req, res) => {
  try {
    const news = await readNewsFile();
    const { params: { id: newsId} } = req;
    const targetNews = news.filter(({ id }) => id === +newsId);
    if (targetNews.length !== 0) {
      res.json(targetNews);
    } else {
      res.render('index', { title: 'News', message: `News with id ${newsId} not found`});
    }
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

app.post('/news', async (req, res) => {
  try {
    const news = await readNewsFile();
    const { body: {source, title} } = req;
    news.push({
      id: idCounter++,
      source,
      title,
    });
    await updateNewsFile(news);
    res.render('index', { title: 'News', message: 'News was updated'});
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

app.put('/news/:id', async (req, res) => {
  try {
    const news = await readNewsFile();
    const { params: { id: newsId} } = req;
    const targetNews = news.find(({ id }) => id === +newsId);
    if (targetNews) {
      const { body: {source, title} } = req;
      if (source !== undefined) {
        targetNews.source = source;
      }
      if (title !== undefined) {
        targetNews.title = title;
      }
      await updateNewsFile(news);
      res.render('index', { title: 'News', message: `News with id ${newsId} was updated`});
    } else {
      res.render('index', { title: 'News', message: `News with id ${newsId} not found`});
    }
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

app.delete('/news/:id', async (req, res) => {
  try {
    const news = await readNewsFile();
    const { params: { id: newsId} } = req;
    const updatedNews = news.filter(({ id }) => id !== +newsId);
    if (updatedNews.length !== 0 && updatedNews.length !== news.length) {
      await updateNewsFile(updatedNews);
      res.render('index', { title: 'News', message: 'News was updated'});
    } else {
      res.render('index', { title: 'News', message: `News with id ${newsId} not found`});
    }
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

app.listen(3000, () => console.log('App started on port 3000'));