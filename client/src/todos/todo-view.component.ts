import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TodosService, Todo} from './todos.service';
import {TodoDetail} from './todo-detail.component';

@Component({
  selector: 'todo-view',
  template: `
  <div class="mdl-grid todoadd">
    <div class="mdl-cell mdl-cell--12-col">
      <todo-detail
      (saved)="saveTodo($event)" (cancelled)="goBack($event)"
      [todo]="thisTodo">
        Select a Todo
      </todo-detail>
    </div>
  </div>
  `,
  styles: [`
    .todoadd {
      padding: 20px;
    }
  `],
  providers: [TodosService],
  directives: [TodoDetail]
})
export class TodoView implements OnInit {
  id: number;
  thisTodo: Todo = {id: null, title: '', description: '', completed: false};

  constructor(
    private todosService: TodosService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.todosService.getTodo(this.id)
        .then(todo => {
          this.thisTodo = todo;
        });
    });
  }

  resetTodo() {
    let emptyTodo: Todo = {id: null, title: '', description: '', completed: false};
    this.thisTodo = emptyTodo;
  }

  goBack() {
    this.router.navigate(['/todos']);
  }

  saveTodo(todo: Todo) {
    this.todosService.saveTodo(todo)
      .then(responseTodo => {
        this.router.navigate(['/todos']);
      });

    // Generally, we would want to wait for the result of `todosService.saveTodo`
    // before resetting the current item.
    this.resetTodo();
  }
}
