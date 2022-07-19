const { Schema, model } = require('mongoose');

const configSchema = new Schema({
  configKey: String,
  configValue: String,
});

const Config = model('Config', configSchema);

module.exports = Config;
