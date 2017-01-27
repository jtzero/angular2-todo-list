import { Component, OnInit } from '@angular/core';

import { Task } from './task';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'todo-list',
  styles: [ require('./todo-list.component.scss') ],
  template: require('./todo-list.component.html')
})
export class TodoListComponent implements OnInit {

  get tasks(): Task[] {
    return this.todoListSvc.tasks;
  }

  constructor(private todoListSvc: TodoListService) {}

  ngOnInit() {
    this.todoListSvc.getAllTasks();
  }

  add(): Task {
    let t = new Task();
    this.tasks.push(t);
    return t;
  }

  delete(task: Task) {
    this.todoListSvc.deleteTask(task);
  }

}
