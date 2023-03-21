import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$ : Observable<Todo[]>;
  constructor(private todosSerice :  TodoService){}
  ngOnInit() {
    this.todos$ = this.todosSerice.todo$
  }
  changeStatusFromItem(todo : Todo){
     this.todosSerice.changeStatusItems(todo.id, todo.isComplete)
  }
}
