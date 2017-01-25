import { Injectable } from '@angular/core'; import {
  Http,
  Headers,
  Request,
  Response,
  RequestOptions,
  RequestOptionsArgs,
  RequestMethod,
  URLSearchParams
} from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {
  Subject,
  Subscription,
  Observable,
  BehaviorSubject,
  ReplaySubject
} from 'rxjs/Rx';

import * as _ from 'lodash';

// import { EnvironmentConfig } from 'pn-environment-config';

import { Task } from './task';

@Injectable()
export class TaskService {

  static CONSOLE_PREFIX = 'TaskService :: ';

  private _tasksSubject: BehaviorSubject<Task[]> = undefined;
  private headers: Headers;

  constructor(
              // private config: EnvironmentConfig,
              private http: Http,
             ) {
    this._tasksSubject = new BehaviorSubject(undefined);
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'AnonymousToken': '426a6433-70a2-46a3-83f6-73d3b3b7504b'
    });
  }

  urlBase(): string {
    return 'https://api.backand.com:443/1/objects/tasks';
  }

  url(id = ''): string {
    let path = '';
    if (id) {
      path = '/' + id;
    }
    return this.urlBase() + path;
  }

  buildURLSearchParams(obj = {}): URLSearchParams {
    let params = new URLSearchParams();
    _.each(obj, (value, key) => {
      params.set(key.toString(), value.toString());
    });
    return params;
  }

  stream(subject: Subject<any>, opts = {}): Observable<Task[]> {
    let options: RequestOptionsArgs = {
      url: this.url(opts['id']),
      method: RequestMethod.Get,
      search: this.buildURLSearchParams(opts['search']),
      headers: this.headers,
      body: undefined
    };
    this.http.request(this.request(options)).filter(this.filterNullResponse)
                                            .map(this.extractData)
                                            .subscribe(
    (tasks: Task[]) => {
      console.log('Updating [] BehaviorSubject with:', tasks);
      subject.next(tasks);
    },
    (err: Error) => {
      console.error(TaskService.CONSOLE_PREFIX, err);
      subject.error(err);
      return Observable.empty();
      }
    );
    return subject.asObservable();
  }

  post(task: Task): Observable<Task> {
    return this.send(task, RequestMethod.Post, { search: { returnObject: true } });
  }

  put(task: Task): Observable<Task> {
    return this.send(task, RequestMethod.Put, { search: { returnObject: true } });
  }

  get(id = '', opts = {}): Observable<Task[]> {
    if (id) {
      return this.get_by_id(id, opts);
    } else {
      return this.get_all(opts);
    }
  }

  get_by_id(id, opts = {}): Observable<Task[]> {
    let task = this.fromCache(id);
    if (task) {
      return (new BehaviorSubject([task])).asObservable();
    } else {
      opts['id'] = id;
      let sub = this.stream((new BehaviorSubject(undefined)), opts);
      this.stream(this._tasksSubject, opts);
      return sub;
    }
  }

  get_all(opts = {}): Observable<Task[]> {
    if (!this._tasksSubject.getValue()) {
      return this.stream(this._tasksSubject, opts);
    } else {
      return this._tasksSubject.asObservable();
    }
  }

  delete(task: Task, opts = {}): Observable<any> {
    let options: RequestOptionsArgs = {
      url: this.url(task.id),
      method: RequestMethod.Delete,
      search: this.buildURLSearchParams(opts['search']),
      headers: this.headers,
      body: undefined
    };
    let rs: ReplaySubject<Response> = new ReplaySubject<Response>();

    let sub: Subscription = this.http.request(this.request(options)).subscribe(
      (response) => {
        rs.next(response);
      }, (err) => {
        rs.error(err);
      }, () => {
        this.get_all();
        sub.unsubscribe();
      }
    );

    return rs.asObservable();
  }

  private send(task: Task, method, opts = {}): Observable<Task> {

    let options: RequestOptionsArgs = {
      url: this.url(task.id),
      method: method,
      search: this.buildURLSearchParams(opts['search']),
      headers: this.headers,
      body: JSON.stringify(task)
    };

    let rs: ReplaySubject<Task> = new ReplaySubject<Task>();

    this.http.request(this.request(options))
             .map((t) => { return this.extractData(t)[0]; })
             .subscribe(
      (t: Task) => {
        rs.next(t);
      }, (err) => {
        rs.error(err);
        Observable.empty();
      }, () => { this.get_all(); }
    );
    return rs.asObservable();
  }

  private fromCache(name): Task {
    return _.find(this._tasksSubject.getValue(), (task) => {
      return task.name === name;
    });
  }

  private filterNullResponse(arg) {
    let isNull = (arg.json() === null);
    if (isNull) {
      console.warn(TaskService.CONSOLE_PREFIX + 'recieved a null response from the server');
    }
    return !isNull;
  }

  private request(opts): Request {
    let reqOptions = new RequestOptions(opts as RequestOptionsArgs);
    return new Request(reqOptions);
  }

  private extractData(res: Response): Task[] {
    let raw: any = _.castArray(res.json());
    if (raw[0]) {
      return _.map(raw, (t) => {
        return Task.fromJSON(t);
      });
    }
  }
}
