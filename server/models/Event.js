const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  systemId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
    trim: true,
  },
  eventName: String,
  eventTypeId: String,
  countryCode: String,
  timezone: String,
  venue: String,
  openDate: Date,
  marketCount: Number,
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
