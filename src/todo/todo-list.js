import Todo from '../models/memo/todo';

export default function makeTodoList() {
  function insertTodo(data) {
    return new Todo(data).save();
  }

  return Object.freeze({
    insertTodo,
  });
}
