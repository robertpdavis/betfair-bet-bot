const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  eventName: String,
  eventTypeId: String,
  countryCode: String,
  timezone: String,
  venue: String,
  openDate: Date,
  marketCount: Number,
  systemId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Event = model('Event', eventSchema);

module.exports = Event;
