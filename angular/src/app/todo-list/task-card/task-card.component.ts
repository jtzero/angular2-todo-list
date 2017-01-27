import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { TodoListService } from '../todo-list.service';
import { Task } from '../task';

@Component({
  selector: 'task-card',
  styles: [ require('./card.component.scss') ],
  template: require('./card.component.html')
})
export class TaskCardComponent {
  @Input() index: number;
  @Input() task: Task;

  constructor(private todoListSvc: TodoListService) {}

  onBlur() {
    this.updateOrCreate();
  }

  update() {
    this.todoListSvc.updateTask(this.task);
  }

  create() {
    this.todoListSvc.createTask(this.task);
  }

  delete() {
    this.todoListSvc.deleteTask(this.task);
  }

  onCheck(value) {
    this.task.done = value.target.checked;
    this.updateOrCreate();
  }

  save() {
    this.updateOrCreate();
  }

  private updateOrCreate() {
    if (this.task.saved) {
      this.update();
    } else {
      if (this.task.name) {
        this.create();
      }
    }
  }
}
