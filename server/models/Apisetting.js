const { Schema, model } = require('mongoose');
require('dotenv').config();

//For API password, key and ssl key encryption
var cryptoJS = require("crypto-js");

const apiSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  apiKeyTest: {
    type: String,
    required: false,
    unique: true,
  },
  testSessionId: {
    type: String,
    required: false,
  },
  apiKeyLive: {
    type: String,
    required: false,
    unique: true,
  },
  liveSessionId: {
    type: String,
    required: false,
  },
  apiMode: {
    type: String,
    required: true,
    default: 'Test',
  },
  apiUsername: {
    type: String,
    required: false,
    trim: true,
  },
  apiPassword: {
    type: String,
    required: false,
  },
  certfile: {
    type: String,
    required: false,
  },
  keyfile: {
    type: String,
    required: false,
  },
  lastTestLogin: {
    type: Date,
  },
  lastTestKeepAlive: {
    type: Date,
  },
  lastTestLogout: {
    type: Date,
  },
  testApiEnabled: {
    type: Boolean,
    default: false,
  },
  testApiStatus: {
    type: Boolean,
    default: false,
  },
  lastLiveLogin: {
    type: Date,
  },
  lastLiveKeepAlive: {
    type: Date,
  },
  lastLiveLogout: {
    type: Date,
  },
  liveApiEnabled: {
    type: Boolean,
    default: false,
  },
  liveApiStatus: {
    type: Boolean,
    default: false,
  },
  lastTestStatus: {
    type: Date,
  },
  lastLiveStatus: {
    type: Date,
  },
  lastTestMessage: {
    type: String,
  },
  lastLiveMessage: {
    type: String,
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

apiSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('apiPassword') || this.isModified('keyfile') || this.isModified('apiKeyTest') || this.isModified('apiKeyLive')) {
    if (this.isNew) {
      (this.apiPassword !== '') ? cryptoJS.AES.encrypt(this.apiPassword, process.env.ENCRYPT_SECRET).toString() : "";
      (this.keyfile !== '') ? cryptoJS.AES.encrypt(this.keyfile, process.env.ENCRYPT_SECRET).toString() : "";
      (this.apiKeyTest !== '') ? cryptoJS.AES.encrypt(this.apiKeyTest, process.env.ENCRYPT_SECRET).toString() : "";
      (this.apiKeyLive !== '') ? cryptoJS.AES.encrypt(this.apiKeyLive, process.env.ENCRYPT_SECRET).toString() : "";
    }
    (this.isModified('apiPassword')) ? cryptoJS.AES.encrypt(this.apiPassword, process.env.ENCRYPT_SECRET).toString() : "";
    (this.isModified('keyfile')) ? cryptoJS.AES.encrypt(this.keyfile, process.env.ENCRYPT_SECRET).toString() : "";
    (this.isModified('apiKeyTest')) ? cryptoJS.AES.encrypt(this.apiKeyTest, process.env.ENCRYPT_SECRET).toString() : "";
    (this.isModified('apiKeyLive')) ? cryptoJS.AES.encrypt(this.apiKeyLive, process.env.ENCRYPT_SECRET).toString() : "";
  }
  next();
});

//TO DO - check a
function decrypt(apiPassword) {

  const bytes = CryptoJS.AES.decrypt(apiPassword, 'secret key 123');
  return bytes.toString(CryptoJS.enc.Utf8);
}

const Apisettings = model('Apisettings', apiSchema);

module.exports = Apisettings;
