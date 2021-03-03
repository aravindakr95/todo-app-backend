import { Schema, model } from 'mongoose';

const UserSchema = Schema;

const userSchema = new UserSchema({
  timestamp: {
    type: Number,
    default: Date.now,
  },
  fullName: {
    type: String,
    required: true,
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
});

const User = model('User', userSchema, 'users');

export default User;
