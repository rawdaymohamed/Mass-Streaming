import jwt from 'jsonwebtoken';
import config from '../config';
function verifyToken(req, res, next) {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'bearer'
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.jwtSecret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}

export default verifyToken;
