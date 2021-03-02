import { sign, verify, decode } from 'jsonwebtoken';
import config from '../../configs/config';

function signAuthToken({ userId }) {
  return sign({
    userId,
  }, config.authentication.jwtSecret);
}

function verifyAuthToken(token) {
  return verify(token, config.authentication.jwtSecret,
    (error, user) => error || user);
}

function decodeAuthToken(token) {
  const { userId } = decode(token);
  return userId;
}

module.exports = { signAuthToken, verifyAuthToken, decodeAuthToken };
