const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    required: true,
    default: 0
  },
  virtualWallet: {
    type: Number,
    required: true,
    default: 0
  },
  maxWallet: {
    type: Number,
    required: true,
    default: 0,
  },
  minWallet: {
    type: Number,
    required: true,
    default: 0,
  },
  maxVirtualWallet: {
    type: Number,
    required: true,
    default: 0,
  },
  minVirtualWallet: {
    type: Number,
    required: true,
    default: 0,
  },
  lastLogin: {
    type: Date,
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
  apiSettings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Apisettings',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {

  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
