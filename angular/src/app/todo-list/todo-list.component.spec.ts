import { TestBed, async, inject } from '@angular/core/testing';
import {
  BaseRequestOptions,
  HttpModule,
  Http,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TaskService } from './task';
import { TodoListService } from './todo-list.service';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [
      {
        provide: Http,
        useFactory: (mockBackend, options) => {
          return new Http(mockBackend, options);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      MockBackend,
      BaseRequestOptions,

      TaskService,
      TodoListService,
      TodoListComponent
    ]
  }));

  describe('add', () => {
    it('pushes a new task into the array',
       inject([TaskService, TodoListComponent, TodoListService, MockBackend],
              (taskSvc: TaskService,
                  todo: TodoListComponent,
                   svc: TodoListService,
                    mb: MockBackend) => {
          todo.add();
          expect(todo.tasks.length).toBeGreaterThan(0);
        }
    ));
  });

  describe('delete', () => {
    it('removes a task from the array',
       inject([TaskService, TodoListComponent, TodoListService, MockBackend],
              (taskSvc: TaskService,
                  todo: TodoListComponent,
                   svc: TodoListService,
                    mb: MockBackend) => {
          todo.add();
          let task = todo.add();
          todo.delete(task);
          expect(todo.tasks.length).toEqual(1);
        }
    ));
  });

});
