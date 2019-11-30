const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const express = require('express');
const app = express();

let idCounter = 10;

const newsFile = path.join(__dirname, './data/news.json');

app.set('view engine', 'pug');
app.set('views','./src/views');

const updateNewsFile = async (data) => {
  await writeFileAsync(newsFile, JSON.stringify(data, null, 2));
};

const readNewsFile = async () => {
  const data = await readFileAsync(newsFile, 'utf-8');
  return JSON.parse(data);
};

app.use(express.json());

app.use((error, req, res, next) => {
  res.render('index', { title: 'Error', message: `${error.message}` });
  res.status(500).send('Something went wrong!');
});

// app.get('/', (req, res) => {
//   res.render('index', { title: 'Main', message: 'Some news APi'});
//   res.status(200).send('OK');
// });

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
    const targetNews = news.filter(item => item.id === +newsId);
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
    const { source, title } = req.body;
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
    const targetNews = news.find(item => item.id === +newsId);
    if (targetNews) {
      const { source, title } = req.body;
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
    const updatedNews = news.filter(item => item.id !== +newsId);
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