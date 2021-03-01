import { Schema, model } from 'mongoose';

const UserSchema = Schema;

const userSchema = new UserSchema({
  timestamp: {
    type: Number,
    default: Date.now(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  deviceToken: {
    type: String,
    required: true,
  },
});

const User = model('User', userSchema, 'users');

module.exports = User;
