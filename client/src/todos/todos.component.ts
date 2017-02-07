import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TodosService, Todo} from './todos.service';
import {TodosList} from './todos-list.component';
import {TodoDetail} from './todo-detail.component';

@Component({
  selector: 'todos',
  template: `
  <div class="mdl-grid todos">
    <div class="mdl-cell mdl-cell--12-col">
      <todos-list [todos]="todos" [filter]="filter"
      (selected)="selectTodo($event)" (completed)=toggleTodo($event) (deleted)="deleteTodo($event)">
      </todos-list>
    </div>
  </div>
  `,
  styles: [`
    .todos {
      padding: 20px;
    }
  `],
  providers: [TodosService],
  directives: [TodosList, TodoDetail]
})
export class Todos implements OnInit {
  filter: string = 'todos';
  todos: Array<Todo>;
  selectedTodo: Todo;

  constructor(
    private todosService: TodosService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['filter']) this.filter = params['filter'];
    });
    this.todosService.loadTodos()
      .then(todos => {
        this.todos = todos;
      });
  }

  resetTodo() {
    let emptyTodo: Todo = {id: null, title: '', description: '', completed: false};
    this.selectedTodo = emptyTodo;
  }

  selectTodo(todo: Todo) {
    this.selectedTodo = todo;
    this.router.navigate(['/todos/' + todo.id]);
  }

  saveTodo(todo: Todo) {
    this.todosService.saveTodo(todo)
      .then(responseTodo => {
        if (todo.id) {
          this.replaceTodo(responseTodo);
        } else {
          this.pushTodo(responseTodo);
        }
        this.resetTodo();
      });
  }

  replaceTodo(todo: Todo) {
    this.todos = this.todos.map(mapTodo => {
      return mapTodo.id === todo.id ? todo : mapTodo;
    });
  }

  pushTodo(todo: Todo) {
    this.todos.push(todo);
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo)
      .then(() => {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.resetTodo();
      });
  }
}
