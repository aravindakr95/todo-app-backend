import User from '../models/auth/user';

export default function makeAuthList() {
  function addUser(data) {
    return new User(data).save();
  }

  function findUserByEmail(email) {
    return User.findOne(email);
  }

  return Object.freeze({
    addUser,
    findUserByEmail,
  });
}
