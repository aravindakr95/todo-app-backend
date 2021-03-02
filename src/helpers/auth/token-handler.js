import { sign, verify, decode } from 'jsonwebtoken';

function signAuthToken({ userId }) {
  return sign({
    userId,
  }, 'b7ihxwjg4h07n629jad6j1ln06');
}

function verifyAuthToken(token) {
  return verify(token, 'b7ihxwjg4h07n629jad6j1ln06',
    (error, user) => error || user);
}

function decodeAuthToken(token) {
  const { userId } = decode(token);
  return userId;
}

module.exports = { signAuthToken, verifyAuthToken, decodeAuthToken };
