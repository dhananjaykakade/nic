const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Config = require('./config.js');

dotenv.config({ path: `.env.${Config.nodeEnv || 'development'}` });

const dbUrl = Config.nodeEnv === 'production'
  ? process.env.DB_URL_PROD
  : Config.dbUrl;

// Retry delay (in ms)
const RETRY_DELAY = 5000;  // 5 seconds

// Database connection function
const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Removed useCreateIndex and useFindAndModify options
    });
    console.log(`Database connected successfully to ${dbUrl}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    setTimeout(connectToDatabase, RETRY_DELAY); // Retry after a delay
  }
};

// Handle disconnection events with a retry logic
mongoose.connection.on('disconnected', () => {
  console.warn('Database disconnected. Attempting reconnection...');
  setTimeout(connectToDatabase, RETRY_DELAY); // Retry after a delay
});

// Start the initial connection attempt
connectToDatabase();

module.exports = connectToDatabase;
