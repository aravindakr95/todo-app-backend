import { hashSync, compare } from 'bcrypt';

import config from '../../configs/config';

function encryptField(field) {
  return hashSync(field, config.authentication.saltRounds);
}

function compareField({ password, hash }) {
  return compare(password, hash);
}

export { encryptField, compareField };
