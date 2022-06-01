import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';
import { EncryptStorage } from 'encrypt-storage';

const encryptData = new EncryptStorage('Todonest-Encrypt-Key');
const saveData = () => {
  const store = useTodonestStore();

  localStorage.setItem(store.$id, encryptData.encryptString(JSON.stringify(store.$state)));
  // localStorage.setItem(store.$id, JSON.stringify(store.$state));
};

export const useTodonestStore = defineStore('todonest', {
  state: () => {
    return {
      todos: [],
      searchInput: '',
      modalEditTodo: {
        todo_id: '',
        title: '',
        description: '',
        completed: null,
        updated_at: '',
      },
      valid: true,
    };
  },
  getters: {
    getUncompletedTodos: (state) => {
      const sortedTodos = state.todos.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      });

      return sortedTodos.filter((todo) => !todo.completed);
    },
    getCompletedTodos: (state) => {
      const sortedTodos = state.todos.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      });
      return sortedTodos.filter((todo) => todo.completed);
    },
    getModalEditTodo: (state) => {
      return state.modalEditTodo;
    },
  },
  actions: {
    delTodo(todo) {
      this.todos = this.todos.filter(({ todo_id }) => todo_id !== todo.todo_id);

      saveData();
    },

    addTodo() {
      const newTodo = {
        todo_id: this.todos.length + 1,
        title: `${this.searchInput[0].toUpperCase()}${this.searchInput.slice(1)}`,
        description: '',
        completed: false,
        updated_at: new Date().toISOString(),
      };
      console.log(newTodo);
      this.todos.push(newTodo);
      this.searchInput = '';
      saveData();
    },

    patchTodoChecked({ todo_id, completed }) {
      completed = !completed;
      this.todos = this.todos.map((todo) => {
        if (todo.todo_id === todo_id) {
          todo.completed = completed;
          todo.updated_at = new Date().toISOString();
        }
        return todo;
      });

      saveData();
    },

    patchTodo() {
      const editedTodo = {
        todo_id: this.modalEditTodo.todo_id,
        title: this.modalEditTodo.title,
        description: this.modalEditTodo.description,
        completed: this.modalEditTodo.completed,
        updated_at: new Date().toISOString(),
      };
      this.todos = this.todos.map((todo) => {
        if (todo.todo_id === editedTodo.todo_id) {
          return editedTodo;
        }
        return todo;
      });
      this.clearModalEditTodo();
      saveData();
    },
    clearModalEditTodo() {
      this.modalEditTodo = {
        todo_id: '',
        title: '',
        description: '',
        completed: null,
        updated_at: '',
      };
    },

    setModalEditTodo({ todo_id, title, description, completed, updated_at }) {
      this.modalEditTodo = {
        todo_id,
        title,
        description,
        completed,
        updated_at,
      };
    },
 
    fillStore() {
      if (localStorage.getItem('todonest')) {
        const datenEntschluesselt = JSON.parse(
          encryptData.decryptString(localStorage.getItem('todonest')),
        );
        const store = useTodonestStore();
        store.$state = datenEntschluesselt;
      }
    },
  },
});
