
import jwt from 'jsonwebtoken';
//import 'dotenv'.config();
import 'dotenv/config';

const secret = process.env.JWT_SECRET;
const expiration = '2h';

export function authMiddleware({ req }) {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
};

export function signToken({ username, email, firstName, lastName, _id }) {
  const payload = { username, email, firstName, lastName, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};



