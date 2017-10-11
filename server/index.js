'use strict';

const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { DATABASE, CLIENT_ID, CLIENT_SECRET} = require('./config');
const { User } = require('./models/user');
const { Task } = require('./models/task');
const {quadrantDecider} = require('./lib/quadrant-decider.js');

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());

let secret = {
  CLIENT_ID,
  CLIENT_SECRET,
  DATABASE
};

// Mongoose default promise library is deprecated - so we use global promises
mongoose.Promise = global.Promise;

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

app.get('/api/users', (req, res) => {
  User.find()
    .limit(10)
    .exec()
    .then(users => {
      res.json({
        users: users.map(user => user.apiRepr())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.get('/api/userData/:id', (req, res) => {
  const idToCast = req.params.id;
  const ObjectId = require('mongoose').Types.ObjectId;
  const userMongoId = new ObjectId(idToCast);

  Task.find({userId: userMongoId})
    .populate('userId')
    .exec()
    .then(tasks => {
      res.json({
        tasks: tasks.map(task => task.apiRepr())
      });
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/api/mission/:id', (req, res) => {
  User.findOne({googleId: req.params.id})
    .then(user => {
      res.json({mission: user.mission});
    })
    .catch(err => {
      console.error(err);
    });
});

app.post('/api/userTask', (req, res) => {
  Task.create({
    userId: req.body.userId,
    taskName: req.body.taskName,
    deadline: req.body.deadline,
    important: req.body.important,
    urgent: req.body.urgent,
    quadrantValue: quadrantDecider(req.body)
  })
    .then(task => {
      console.log('server side task after creation', task)
      res.status(201).json(task.apiRepr())
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

app.put('/api/userData', (req, res) => {
  User.findByIdAndUpdate(req.body._id, {$push: {roles: {role: req.body.role}}}, {new: true})
    .exec()
    .then(user => {
      res.status(204).json(user.apiRepr());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

app.put('/api/userMission', (req, res) => {
  User.findByIdAndUpdate(req.body.currentUser._id, {$set: {mission: req.body.newMission}}, {new: true})
    .then(user => {
      res.json(user.apiRepr());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

app.put('/api/userTask', (req, res) => {
  Task.findByIdAndUpdate(req.body._id, {$set: {
    taskName: req.body.taskName,
    deadline: req.body.deadline,
    important: req.body.important,
    urgent: req.body.urgent
  }}, {new: true})
    .then(task => {
      res.status(204).json(task.apiRepr());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

app.delete('/api/userTask/:id', (req, res) => {
  Task
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

let server;
function runServer(port = 3001, database = secret.DATABASE) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database, {useMongoClient: true}, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
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
