import { Component, OnInit } from '@angular/core';

import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'todo-list',
  styles: [ require('./todo-list.component.scss') ],
  template: require('./todo-list.component.html')
})
export class TodoListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskSvc: TaskService) {}

  ngOnInit() {
    this.taskSvc.get().subscribe((list) => {
      if (list) {
        this.tasks = list;
      }
    }, (error) => {
      console.error('there has been a grave error ::', error);
    });
  }

  add() {
    this.tasks.push(new Task());
  }

  removeUnsaved(task: Task) {
    let idx = this.tasks.indexOf(task);
    this.tasks.splice(idx, 1);
  }
}
