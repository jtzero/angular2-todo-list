import { TestBed, async, inject } from '@angular/core/testing';
import {
  BaseRequestOptions,
  HttpModule,
  Http,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

import { Task } from './task';
import { TaskService } from './task.service';

describe('TaskService', () => {
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

      TaskService
    ]
  }));

  describe('get', () => {
    let task, id;

    beforeEach(inject([MockBackend], (mb: MockBackend) => {
      id = Date.now();
      task = new Task('qwer', false, id);
      let tasks = [task];
      mb.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(
            new Response(new ResponseOptions({
              body: JSON.stringify({ data: task })
            }))
          );
        }
      );
    }));

    it('updates pipes tasks to the subscriber', (done) => {
       inject([TaskService],
              (taskSvc: TaskService) => {

          taskSvc.get().subscribe(
            (tasks: Task[]) => {
              expect(tasks.length).toBeGreaterThan(0);
              done();
            }
          );
       })();
    });
  });

  describe('put', () => {
    let id = Date.now();
    let task = new Task('qwer', false, id);

    beforeEach(inject([MockBackend], (mb: MockBackend) => {
      mb.connections.subscribe(
        (connection: MockConnection) => {
          if (connection.request.method === RequestMethod.Put) {
            task = Task.fromJSON(connection.request.json());
            connection.mockRespond(
              new Response(new ResponseOptions({
                body: JSON.stringify(task)
              }))
            );
          } else { // GET
            connection.mockRespond(
              new Response(new ResponseOptions({
                body: JSON.stringify({ data: task })
              }))
            );
          }
        }
      );
    }));

    it('updates a task on the server', (done) => {
       inject([TaskService, MockBackend],
              (taskSvc: TaskService,
                    mb: MockBackend) => {
          let originalDone = task.done;
          task.done = !task.done;
          taskSvc.put(task).subscribe((t: Task) => {
            expect(t.done).toEqual(!originalDone);
            done();
          }, (err) => { console.error(err); });
       })();
    });
  });

  describe('delete', () => {
    let task, id;

    function mockRespond(connection, body) {
      connection.mockRespond(
        new Response(new ResponseOptions({
          body: JSON.stringify(body)
        }))
      );
    }

    beforeEach(inject([MockBackend], (mb: MockBackend) => {
      id = Date.now();
      task = new Task('qwer', false, id);
      let tasks = [task];
      mb.connections.subscribe(
        (connection: MockConnection) => {
          if (connection.request.method === RequestMethod.Delete) {
            let urlID = _.last(connection.request.url.split('/'));
            let t = _.find(tasks, (tk) => { return tk.id.toString() === urlID; });
            if (t) {
              tasks.splice(tasks.indexOf(t), 1);
              mockRespond(connection, {});
            } else {
              this.mockRespond(connection, {status: 404});
            }
          } else { // GET
            mockRespond(connection, {data: tasks});
          }
        }
      );
    }));

    it('deletes a task from the server', (done) => {
       inject([TaskService, MockBackend],
              (taskSvc: TaskService,
                    mb: MockBackend) => {
         let before = [];
         let after = [];
         let idx = 0;
         taskSvc.get().take(2).subscribe((tasks) => {
           if (idx === 0) {
             before = tasks;
             idx = idx + 1;
             taskSvc.delete(task).take(1).subscribe();
           } else {
             after = tasks;
           }
         },
         (err) => { },
         () => {
           expect(before.length).toBeGreaterThan(after.length);
           done();
         });

       })();
    });
  });

});
