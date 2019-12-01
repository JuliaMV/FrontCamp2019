const express = require('express');
const router = express.Router();

const { loggerHandler, errorHandler } = require('../middlewares');
const api = require('../controllers');

router.use(express.json());
router.use(loggerHandler);
router.use(errorHandler);

router.get('/', api.mainNews);
router.get('/news', api.getNews);
router.get('/news/:id', api.getNewsById);
router.post('/news', api.postNews);
router.put('/news/:id', api.putNews);
router.delete('/news/:id', api.deleteNews);

module.exports = { router };