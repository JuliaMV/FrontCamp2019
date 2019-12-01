const { updateNewsFile, readNewsFile } = require('../utils');

let idCounter = 4;

const mainNews = (req, res) => {
  res.render('index', { title: 'Main', message: 'Some news APi'});
  res.status(200).send('OK');
};

const getNews = async (req, res, next) => {
  try {
    const news = await readNewsFile();
    res.json(news);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const getNewsById = async (req, res) => {
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
};

postNews = async (req, res) => {
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
};

const putNews = async (req, res) => {
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
};

const deleteNews = async (req, res) => {
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
};

module.exports = {
  mainNews, getNews, getNewsById, postNews, putNews, deleteNews,
};
