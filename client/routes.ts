import { Todos } from './src/todos/todos.component';
import { TodoAdd } from './src/todos/todo-add.component';
import { TodoView } from './src/todos/todo-view.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '',                      redirectTo: '/todos', pathMatch: 'full'},
  {path: 'todos',                 component: Todos},
  {path: 'todos/filter/:filter',  component: Todos},
  {path: 'todos/add',             component: TodoAdd},
  {path: 'todos/:id',             component: TodoView},
  {path: '*',                     redirectTo: '/todos', pathMatch: 'full'}
];
