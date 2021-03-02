import { sign, decode } from 'jsonwebtoken';

async function signAuthToken({ userId }) {
  return sign({
    userId,
  }, 'b7ihxwjg4h07n629jad6j1ln06');
}

async function decodeAuthToken(token) {
  const { userId } = decode(token);
  return userId;
}

module.exports = { signAuthToken, decodeAuthToken };
