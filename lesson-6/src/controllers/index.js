const bcrypt = require('bcryptjs');
const passport = require('passport');

const { NewsModel } = require('../models/news');
const { UserModel } = require('../models/user');

const mainNews = (req, res) => {
  res.render('index', { title: 'Main', message: 'Some news APi' });
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
    const { params: { id: newsId } } = req;
    const targetNews = await NewsModel.findById(newsId).lean();
    if (targetNews) {
      res.json(targetNews);
    } else {
      res.render('index', { title: 'News', message: `News with id ${newsId} not found` });
    }
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

postNews = async (req, res) => {
  try {
    await NewsModel.create(req.body);
    res.render('index', { title: 'News', message: 'News was updated' });
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const putNews = async (req, res) => {
  try {
    const { params: { id: newsId }, body } = req;
    await NewsModel.findByIdAndUpdate(newsId, body);
    await NewsModel.save();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const deleteNews = async (req, res) => {
  try {
    const { params: { id: newsId } } = req;
    const targetNews = await NewsModel.findByIdAndDelete(newsId).lean();
    if (targetNews) {
      res.render('index', { title: 'News', message: 'News was updated' });
    } else {
      res.render('index', { title: 'News', message: `News with id ${newsId} not found` });
    }
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const register = async (req, res) => {
  const { login, password } = req.body;
  const user = new UserModel({ login, password });
  console.log(user);

  bcrypt.genSalt(10, (error, salt) =>
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) throw error;
      user.password = hash;
      user.save()
        .then(() => res.redirect('/login'))
        .catch((error) => {
          console.log(error);
        })
    }));
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = {
  mainNews, getNews, getNewsById, postNews, putNews, deleteNews, register, ensureAuthenticated,
};
