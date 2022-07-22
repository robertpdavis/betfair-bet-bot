const { Schema, model } = require('mongoose');

const eventTypeSchema = new Schema({
  eventTypeId: {
    type: String,
    required: true,
  },
  name: String,
  used: {
    type: Boolean,
    default: false,
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

const EventType = model('EventType', eventTypeSchema);

module.exports = EventType;
