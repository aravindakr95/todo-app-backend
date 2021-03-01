import User from '../models/auth/user';

export default function makeAuthList() {
  function addUser(data) {
    return new User(data).save();
  }

  return Object.freeze({
    addUser,
  });
}
