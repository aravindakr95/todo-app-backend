import Todo from '../models/memo/todo';

export default function makeTodoList() {
  function insertTodo(data) {
    return new Todo(data).save();
  }

  function findTodosByUserId(data) {
    return Todo.find(data);
  }

  return Object.freeze({
    insertTodo,
    findTodosByUserId,
  });
}
