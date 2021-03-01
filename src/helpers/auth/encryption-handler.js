import { hashSync } from 'bcrypt';

export default function encryptField(field) {
  return hashSync(field, 10);
}
