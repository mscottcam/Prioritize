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
const { Task } = require('./models/task');

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());

// Mongoose default promise library is deprecated - so we use global promises
mongoose.Promise = global.Promise;
// mongoose.connect(keys.DATABASE);

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
  new GoogleStrategy(
    {
      clientID: secret.CLIENT_ID,
      clientSecret: secret.CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          user.accessToken = accessToken;
          return user.save();
        } else {
          User.create({
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
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    User.findOne({ accessToken: token })
      .then(user => {
        if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch(err => {
        console.error(err);
      });
  })
);

app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/api/auth/google/callback',
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

app.get(
  '/api/me',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    User.findOne({ accessToken: req.user.accessToken })
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        console.err(err);
        res.status(204).send(err);
      });
  }
);

// Endpoints that do not have to do with authentication:
// usermission
// userdata
// user?

app.get('/api/users', (req, res) => {
  User.find()
    .limit(10)
    .exec()
    .then(users => {
      // console.log('Users: ', users);
      res.json({
        users: users.map(user => user.apiRepr())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.get('/api/userData', (req, res) => {
  Task.find()
    .populate('userId')
    .exec()
    .then(tasks => {
      // console.log('Response tasks data: ', tasks);
      res.json({
        tasks: tasks.map(task => task.apiRepr())
      });
    })
    .catch(err => {
      console.error(err);
    });

  // UserData.find()
  //   // .limit(10)
  //   .populate('userId')
  //   .exec()
  //   .then(responseData => {
  //     console.log('Userid: ', responseData.userId);
  //     console.log('User Data: ', responseData);
  //     res.json({
  //       userData: responseData.map(userData => userData.apiRepr())
  //     })
  //       .catch(err => {
  //         console.error(err);
  //         res.status(500).json({message: 'Internal server error'});
  //       });
  //   });
});

app.post('/api/tasks', (req, res) => {
  Task.create({
    userId: req.body.userId,
    task: req.body.task
  }).then(task => {
    // console.log('this is our task from the req.body', task);
  });

  // UserData.create({
  //   userId: req.body.userId,
  //   userData: req.body.userData
  // })
  //   .then(userData => {
  //     console.log('This is what our user data looks like: ', userData);
  //     return res.status(201).json(userData.apiRepr());})
  //   .catch(err => {
  //     console.error(err);
  //     res.status(500).json({ message: 'Internal server error' });
  //   });
  // post request contains:
  // user: { _id: currentUserId (for example: 59cf0143b637d01e78cabd15 )}
});

// app.get(/user/data)
// app.get("/api/tasks", (req, res) => {
//   res.send(200).send("SOme text and stuff");
// });

let server;
function runServer(port = 3001, database = secret.DATABASE) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database, {useMongoClient: true}, err => {
      console.log('Starting server');
      console.log('What is our database: ', secret.DATABASE);
      if (err) {
        return reject(err);
      }
    });
    server = app
      .listen(port, () => {
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function closeServer() {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
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
