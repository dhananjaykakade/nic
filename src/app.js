const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const logger = require('./utils/winston'); // Import the logger
const router = require('./routes/apiRoutes'); // Use require
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');


const app = express();


// Define morgan format and stream
const morganFormat =
  ':method :url :status :res[content-length] - :response-time ms';
const morganStream = {
  write: (message) => logger.info(message.trim()),
};

// Middleware setup
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(
  compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) return false; // Exclude compression if header is set
      return compression.filter(req, res);
    },
  })
);
app.use(express.json()); // Parse incoming JSON requests
app.use(express.static(path.join(__dirname, '../', 'public'))); // Serve static files
app.use(morgan(morganFormat, { stream: morganStream })); // HTTP logging

// Centralized Error Handling Middleware

app.get('/', (req, res) => res.status(403).json({ message:"forbidden"}));

// Routes

app.use('/api/v1', router);
app.use(errorHandler);

 module.exports = app;
