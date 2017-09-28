'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Allow CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

app.get('/api/tasks', (req,res) => {
  res.send(200).send('SOme text and stuff');
});
let server;
function runServer(port=3001) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      resolve();
    }).on('error', reject);
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
  runServer();
}

module.exports = {
  app, runServer, closeServer
};

