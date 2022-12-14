import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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

export default model('EventType', eventTypeSchema);
