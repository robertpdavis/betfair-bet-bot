import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const apiSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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

//TO DO - check a
function decrypt(apiPassword) {

  const bytes = CryptoJS.AES.decrypt(apiPassword, 'secret key 123');
  return bytes.toString(CryptoJS.enc.Utf8);
}

export default model('Apisettings', apiSchema);

