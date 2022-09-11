import { expressjwt as jwt } from 'express-jwt';
import config from '../config';
const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};
const auth = {
  required: jwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};
export default auth;
