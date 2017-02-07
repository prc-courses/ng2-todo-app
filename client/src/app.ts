import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'my-app',
  template: require('./app.html'),
  directives: [ROUTER_DIRECTIVES],
  styles: [`
    span.mdl-layout-title {
      cursor: pointer
    }
  `]
})
export class App {
  links = {
    home: ['/'],
    todos: ['/todos'],
    completed: ['/todos/filter/completed'],
    all: ['/todos/filter/all'],
    view: ['/todos/:id'],
    add: ['/todos/add']
  }
}
