import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { TodoListComponent } from './todo-list.component';
import { TaskCardComponent } from './task-card';
import { TaskService } from './task.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ TodoListComponent, TaskCardComponent ],
  providers:    [ TaskService ],
  exports:      [ TodoListComponent ]
})
export class TodoListModule { }
