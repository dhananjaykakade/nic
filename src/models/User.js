const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseSequence = require('mongoose-sequence');

// Create a new plugin instance
const autoIncrement = mongooseSequence(mongoose);

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true, // Optional, so it is not required
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.'],
  },
  collegeName: {
    type: String,
    required: true,
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event', // Assuming an Event model is defined
  }],
  images: [{
    type: String, // URL links to images
  }],
  dateTime: {
    type: Date,
    required: true,
    default: () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: Number,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Apply auto-increment plugin to the token field
userSchema.plugin(autoIncrement, {
  inc_field: 'token',  // The field to auto-increment
  start_seq: 1,        // Starting value for the sequence
});

const User = mongoose.model('User', userSchema);
module.exports = User;
