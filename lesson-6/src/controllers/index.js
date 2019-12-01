const { NewsModel } = require('../data/news');

const mainNews = (req, res) => {
  res.render('index', { title: 'Main', message: 'Some news APi'});
  res.status(200).send('OK');
};

const getNews = async (req, res, next) => {
  try {
    const news = await NewsModel.find({}).lean();
    res.json(news);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const getNewsById = async (req, res) => {
  try {
    const { params: { id: newsId} } = req;
    const targetNews = await NewsModel.findById(newsId).lean();
    if (targetNews) {
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
    await NewsModel.create(req.body);
    res.render('index', { title: 'News', message: 'News was updated'});
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const putNews = async (req, res) => {
  try {
    const { params: { id: newsId}, body } = req;
    await NewsModel.findByIdAndUpdate(newsId, body);
    await NewsModel.save();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const deleteNews = async (req, res) => {
  try {
    const { params: { id: newsId} } = req;
    const targetNews = await NewsModel.findByIdAndDelete(newsId).lean();
    if (targetNews) {
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
