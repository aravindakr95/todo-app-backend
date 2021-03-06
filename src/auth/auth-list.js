import User from '../models/auth/user';

export default function makeAuthList() {
  function insertUser(data) {
    return new User(data).save();
  }

  function findUserByEmail(email) {
    return User.findOne(email);
  }

  function findUserById(userId) {
    return User.findOne(userId);
  }

  function findUserIsExists(email) {
    return User.countDocuments(email);
  }

  return Object.freeze({
    insertUser,
    findUserByEmail,
    findUserById,
    findUserIsExists,
  });
}
