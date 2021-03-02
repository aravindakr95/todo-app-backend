import { hashSync, compare } from 'bcrypt';

import config from '../../configs/config';

const encryptField = (field) => hashSync(field, config.authentication.saltRounds);

const compareField = ({ password, hash }) => compare(password, hash);

module.exports = { encryptField, compareField };
