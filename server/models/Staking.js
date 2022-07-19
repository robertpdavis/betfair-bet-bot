const { Schema, model } = require('mongoose');

const stakingSchema = new Schema({
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

const Staking = model('Staking', stakingSchema);

module.exports = Staking;
