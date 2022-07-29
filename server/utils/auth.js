const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, username, firstName, _id }) {
    const payload = { email, username, firstName, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
