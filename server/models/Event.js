import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  systemId: {
    type: Schema.Types.ObjectId,
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
  markets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Market',
    }
  ],
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

export default model('Event', eventSchema);

