'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const { User } = require('./models/user');

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());

// Mongoose default promise library is deprecated - so we use global promises
mongoose.Promise = global.Promise;
mongoose.connect(keys.DATABASE);

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DATABASE: process.env.DATABASE
};

if (process.env.NODE_ENV !== 'production') {
  secret = require('./config/keys');
}
// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Allow CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

// Passport Strategies
app.use(passport.initialize());
passport.use(
  new GoogleStrategy({
    clientID: secret.CLIENT_ID,
    clientSecret: secret.CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    User
      .findOne({ googleId: profile.id })
      .then(user => {
        if (user) {
          user.accessToken = accessToken;
          return user.save();
        } else {
          User
            .create({
              displayName: profile.displayName,
              googleId: profile.id,
              accessToken
            })
            .then(console.log('this worked!'))
            .catch(err => {
              console.error(err);
            });
        }
      });
    const user = {
      googleId: profile.id,
      accessToken: accessToken
    };
    return cb(null, user);
  }
  ));

passport.use(
  new BearerStrategy(
    (token, done) => {
      User
        .findOne({accessToken: token})
        .then(user => {
          if (!user) {
            return done(null, false);
          } else {
            return done(null, user);}
        })
        .catch(err => {
          console.error(err);
        });
    }
  )
);

app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    res.cookie('accessToken', req.user.accessToken, { expires: 0 });
    res.redirect('/');
  }
);

app.get('/api/auth/logout', (req, res) => {
  req.logout();
  res.clearCookie('accessToken');
  res.redirect('/');
});

// Endpoints that do not have to do with authentication:
// usermission
// userdata
// user?

// app.get(/user/data)
// app.get("/api/tasks", (req, res) => {
//   res.send(200).send("SOme text and stuff");
// });

let server;
function runServer(port = 3001) {
  return new Promise((resolve, reject) => {
    mongoose.connect(secret.DATABASE, {useMongoClient: true}, err => {
      console.log('Starting server');
      console.log('What is our database: ', secret.DATABASE)
      if (err) {
        return reject(err);
      }
    });
    server = app
      .listen(port, () => {
        resolve();
      })
      .on('error', reject);
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => {
    console.error('Problem starting server: ', err);
  });
}

module.exports = {
  app,
  runServer,
  closeServer
};
