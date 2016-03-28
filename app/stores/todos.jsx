import TodoActions from 'actions/todo';
import TodosActions from 'actions/todos';
import Alt from 'alt_flux';

const max = (array, callback) => {
  return Math.max.apply(Math, array.map(callback));
};

export default Alt.createStore(class TodosStore {
  constructor() {
    this.todos = [];

    this.bindListeners({
      create: TodoActions.CREATE,
      get: TodosActions.GET,
      update: TodosActions.UPDATE,
      delete: TodosActions.DELETE
    });
  }

  get(todos) {
    this.todos = todos;
  }

  update(todo) {
    const found = this.todos.find(item => item.id === todo.id);

    for (const name in found) {
      found[name] = todo[name];
    };
  }

  create(todo) {
    let found = max(this.todos, item => item.id);

    todo = Object.assign({ id: ++found }, todo);
    this.todos.push(todo);
  }

  delete(todo) {
    this.todos.splice(this.todos.findIndex(item => item === todo.id), 1);
  }
}, 'TodosStore');
