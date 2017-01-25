import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { TodoListComponent } from './TodoList.component';

describe('About', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TodoListComponent
    ]
  }));

  it('should have a \'todoText\' property',
     inject([TodoListComponent], (todo: TodoListComponent) => {
    let expected: string = 'This is the todo-list Component';
    let actual: string = todo.todoText;
    expect(actual).toEqual(expected);
  }));

});
