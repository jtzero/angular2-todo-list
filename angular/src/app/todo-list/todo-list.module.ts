import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { TodoListComponent } from './todo-list.component';
import { TodoListService } from './todo-list.service';
import { TaskCardComponent } from './task-card';
import { TaskService } from './task';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ TodoListComponent, TaskCardComponent ],
  providers:    [ TaskService, TodoListService ],
  exports:      [ TodoListComponent ]
})
export class TodoListModule { }
