const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');

const { UserModel } = require('../models/user');

module.exports = function(passport) {
  passport.use(new LocalStrategy({usernameField: 'login'}, (login, password, done) => {
      UserModel.findOne({ login })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(user, false);
            } else {
              return done(null, false, { message: 'Incorrect password.' });
            }
          });
        })
        .catch(error => {
          console.log(error);
        })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: 607707423379574,
    clientSecret: '45a06b9d30130cd1627235c286caa9f9',
    callbackURL: '/',
  },
  (accessToken, refreshToken, profile, done) => {
    console.log("PROFILE", profile);
    User.findOrCreate({}, (err, user) => {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
}