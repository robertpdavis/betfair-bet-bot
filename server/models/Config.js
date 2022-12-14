import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const configSchema = new Schema({
  configKey: String,
  configValue: String,

});

export default model('Config', configSchema);

