const { Schema, model } = require('mongoose');

const scenarioSchema = new Schema({
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

const Scenario = model('Scenario', scenarioSchema);

module.exports = Scenario;
