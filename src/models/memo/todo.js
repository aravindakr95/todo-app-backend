import { Schema, model } from 'mongoose';

const TodoSchema = Schema;

const todoSchema = new TodoSchema({
  timestamp: {
    type: Number,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  },
});

const Todo = model('Todo', todoSchema, 'todos');

module.exports = Todo;
