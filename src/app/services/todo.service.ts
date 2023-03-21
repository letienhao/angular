import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/featuring.models';
import { Todo } from '../models/todo.models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
   private static readonly TodoStorageKey = 'todos';
   private todos : Todo[];
   private filterTodos : Todo[]
   private lengthSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);
   private displayTodosSubject : BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])
   private currentFilter :Filter = Filter.All

   todo$ : Observable<Todo[]>= this.displayTodosSubject.asObservable()
   length$ : Observable<number> = this.lengthSubject.asObservable()

  constructor(private storageService : LocalStorageService) { }

  fetchFormLocalStorage(){
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filterTodos = [...this.todos.map((item)=>({...item}))]
    this.updateTodoData();
  }

  updateTodosLocalStorage(){
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos)
    this.fliterTodos(this.currentFilter, false);
    this.updateTodoData();
  }
  fliterTodos(filter: Filter, isFiltering : boolean = true){
    this.currentFilter = filter;
    switch (filter){
      case Filter.Active:
        this.filterTodos = this.todos.filter((item)=> !item.isComplete)
        break;
      case Filter.Complete :
         this.filterTodos = this.todos.filter(item=> item.isComplete)
         break;
      case Filter.All:
        this.filterTodos =  [...this.todos.map((item)=>({...item}))]
        break
      }
      if(isFiltering){
        this.updateTodoData()
      }
  }
  addTodos(content : string){
    const date = new Date(Date.now()).getTime()
    const newTodos = new Todo(date,content);
    this.todos.unshift(newTodos)
    this.updateTodosLocalStorage()
  }
  changeStatusItems(id:number, isComplete : boolean | undefined){
      const index = this.todos.findIndex(t => t.id=== id)
      const todo = this.todos[index]
      todo.isComplete = isComplete
      this.todos.splice(index,1,todo)
      this.updateTodosLocalStorage()
  }
  private updateTodoData() {
    this.displayTodosSubject.next(this.filterTodos);
    this.lengthSubject.next(this.todos.length);
  }
}
