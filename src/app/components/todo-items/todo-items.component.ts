import { TodoService } from './../../services/todo.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.models';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  isHovered : false;
  isEditing : false;
  @Input() todo : Todo
  @Output()  changeStatus : EventEmitter<Todo> = new EventEmitter<Todo>()
   ngOnInit(): void {
    console.log(this.todo)
  }
  changStatus(){
        this.changeStatus.emit({...this.todo, isComplete : !this.todo.isComplete})
  }
}
