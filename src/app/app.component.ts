import { Observable } from 'rxjs';
import { TodoService } from './services/todo.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private todosSevice:  TodoService ){}
  hasTodos$ : Observable<boolean>

  ngOnInit(): void {
    this.todosSevice.fetchFormLocalStorage()
    this.hasTodos$ = this.todosSevice.length$.pipe(map(length=> length>0))
  }
}
