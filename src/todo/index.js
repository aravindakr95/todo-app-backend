import makeTodoList from './todo-list';
import makeAuthList from '../auth/auth-list';

import makeTodoEndPointHandler from './todo-endpoint';

const todoList = makeTodoList();
const authList = makeAuthList();

const todoEndpointHandler = makeTodoEndPointHandler({ todoList, authList });

export default todoEndpointHandler;
