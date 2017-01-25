import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'task-card',
  styles: [ require('./card.component.scss') ],
  template: require('./card.component.html')
})
export class TaskCardComponent {
  @Input() task: Task;

  @Output() removeUnsaved = new EventEmitter();

  constructor(private taskSvc: TaskService) {}

  save() {
    let sub: Subscription = this.taskSvc.put(this.task).subscribe(
      (response) => {
        console.log(response);
      }, (err) => {
        console.error(err);
      }, () => {
        sub.unsubscribe();
      }
    );

  }
  delete() {
    if (this.task.id) {
      let sub: Subscription = this.taskSvc.delete(this.task).subscribe(
        (response) => {
          console.log(response);
        }, (err) => {
          console.error(err);
        }, () => {
          sub.unsubscribe();
        }
      );
    } else {
      this.removeUnsaved.emit(this.task);
    }
  }

  onBlur() {
    if (this.task.id) {
      this.update();
    } else {
      this.create();
    }
  }

  update() {
    let sub: Subscription = this.taskSvc.put(this.task).subscribe(
      (t: Task) => {
        console.log('updated :: ', t);
        this.task = t;
      }, (err) => {
        console.error(err);
      }, () => {
        sub.unsubscribe();
      }
    );
  }

  create() {
    let sub: Subscription = this.taskSvc.post(this.task).subscribe(
      (t: Task) => {
        console.log('saved :: ', t);
        this.task = t;
      }, (err) => {
        console.error(err);
      }, () => {
        sub.unsubscribe();
      }
    );
  }

}
