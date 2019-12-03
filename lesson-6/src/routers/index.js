const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');

const { loggerHandler, errorHandler } = require('../middlewares');
const api = require('../controllers');

require('../config/passpord')(passport);

router.use(express.json());
router.use(session({
  secret: 'frontcamp',
  resave: true,
  saveUnitialized: true,
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(loggerHandler);
router.use(errorHandler);

router.get('/', api.mainNews);
router.get('/news', api.getNews);
router.get('/news/:id', api.getNewsById);
router.post('/news',  api.ensureAuthenticated, api.postNews);
router.put('/news/:id',  api.ensureAuthenticated, api.putNews);
router.delete('/news/:id',  api.ensureAuthenticated, api.deleteNews);

router.post('/register', api.register);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));


router.get('/auth/facebook', passport.authenticate('facebook'));


module.exports = { router };