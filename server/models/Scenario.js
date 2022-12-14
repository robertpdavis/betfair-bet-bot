import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const scenarioSchema = new Schema({
  scenarioId: Number,
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

export default model('Scenario', scenarioSchema);

