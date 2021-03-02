import Todo from '../models/memo/todo';

export default function makeTodoList() {
  function insertTodo(data) {
    return new Todo(data).save();
  }

  function findTodosByUserId(data) {
    return Todo.find(data);
  }

  function updateTodoById(todoId, data) {
    return Todo.updateOne(todoId, data);
  }

  function removeTodoById(todoId) {
    return Todo.deleteOne(todoId);
  }

  return Object.freeze({
    insertTodo,
    findTodosByUserId,
    updateTodoById,
    removeTodoById,
  });
}
