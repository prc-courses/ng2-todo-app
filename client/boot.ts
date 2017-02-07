import 'core-js';
import 'zone.js/dist/zone';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {App} from './src/app';
import {Todos} from './src/todos/todos.component';
import {TodoAdd} from './src/todos/todo-add.component';
import {TodoView} from './src/todos/todo-view.component';
import {TodoDetail} from './src/todos/todo-detail.component';
import {TodoFilterPipe} from './src/todos/todo-filter.pipe';
import {routes} from './routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [App, Todos, TodoAdd, TodoView, TodoDetail, TodoFilterPipe],
  bootstrap: [App]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
