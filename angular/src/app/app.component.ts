/*
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
             selector: 'app',
             styles: [ ],
             template: `<todo-list></todo-list>`
           })
export class AppComponent {

  constructor() {}

}
