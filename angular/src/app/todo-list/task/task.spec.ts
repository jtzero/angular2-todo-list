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

describe('Task', () => {

  describe('fromJSON', () => {
    it('converts an obj object to a Task', () => {
      let obj = {name: 'test', done: false};
      let task = Task.fromJSON(obj);
      expect(task.name).toEqual('test');
      expect(task.done).toBeFalsy();
    });
  });

  describe('validate', () => {
    it('validates if the object has enough values to be a task', () => {
      expect(() => { Task.validate({}); }).
        toThrow(new Error('name or done does not exists on this object :{}'));
    });
  });

});
