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
  lastLogin: {
    type: Date,
  },
  lastKeepAlive: {
    type: Date,
  },
  lastLogout: {
    type: Date,
  },
  lastEventUpdate: {
    type: Date,
  },
  apiEnabled: {
    type: Boolean,
    default: false,
  },
  apiStatus: {
    type: Boolean,
    default: false,
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
