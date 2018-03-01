const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
const routes = require('./routes');
const { user, pass, authSource } = require('./mongodbAuth.js');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth', {
  user,
  pass,
  authSource,
});

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const server = express();
server.use(bodyParser.json());
server.use(cors(corsOptions));

routes(server);

server.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
