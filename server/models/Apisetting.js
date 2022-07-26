const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

const Apisettings = model('Apisettings', apiSchema);

module.exports = Apisettings;
