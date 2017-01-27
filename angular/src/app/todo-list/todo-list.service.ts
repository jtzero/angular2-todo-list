import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { Subscription, Observable } from 'rxjs/Rx';

import { Task, TaskService } from './task';

@Injectable()
export class TodoListService {

  tasks: Task[] = [];

  constructor(private taskSvc: TaskService) {}

  getAllTasks() {
    this.taskSvc.getAll().subscribe(
      (tasks: Task[]) => {
        console.log(this.tasks);
        this.tasks = tasks;
      }, (err) => {
        console.error(err);
      }
    );
  }

  deleteTask(task: Task) {
    if (task.id) {
      let sub: Subscription = this.taskSvc.delete(task).subscribe(
        (response) => {
          console.log(response);
        }, (err) => {
          console.error(err);
        }, () => {
          sub.unsubscribe();
        }
      );
    } else {
      let idx = this.tasks.indexOf(task);
      this.tasks.splice(idx, 1);
    }
  }

  updateTask(task: Task): Observable<any> {
    return this.taskSvc.put(task);
  }

  createTask(task: Task) {
    return this.taskSvc.post(task);
  }

}
