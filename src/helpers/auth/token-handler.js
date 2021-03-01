import { sign } from 'jsonwebtoken';

export default async function signAuthToken({ email, accountNumber }) {
  return sign({
    email,
    accountNumber,
  }, 'b7ihxwjg4h07n629jad6j1ln06');
}
