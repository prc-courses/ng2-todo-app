import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const BASE_URL = 'http://localhost:3000/todos/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

@Injectable()
export class TodosService {
  constructor(private http: Http) {}

  loadTodos() {
    return this.http.get(BASE_URL)
      .map(res => res.json())
      .toPromise();
  }

  getTodo(id: number) {
    return this.http.get(BASE_URL + id.toString())
      .map(res => res.json())
      .toPromise();
  }

  saveTodo(item: Todo) {
    return (item.id) ? this.updateTodo(item) : this.createTodo(item);
  }

  createTodo(item: Todo) {
    return this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
      .map(res => res.json())
      .toPromise();
  }

  updateTodo(item: Todo) {
    return this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
      .map(res => res.json())
      .toPromise();
  }

  deleteTodo(item: Todo) {
    return this.http.delete(`${BASE_URL}${item.id}`)
      .map(res => res.json())
      .toPromise();
  }
}
