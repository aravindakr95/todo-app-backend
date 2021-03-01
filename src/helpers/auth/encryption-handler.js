import bcrypt, { hashSync } from 'bcrypt';

const encryptField = (field) => hashSync(field, 10);

const compareField = ({ password, hash }) => bcrypt.compare(password, hash);

module.exports = { encryptField, compareField };
