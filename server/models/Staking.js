import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const stakingSchema = new Schema({
  stakingId: Number,
  title: String,
  description: String,
  back: Boolean,
  lay: Boolean,
  params: String,
  formName: String,
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

export default model('Staking', stakingSchema);

