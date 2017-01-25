export class Task {

  id: string;
  name: string;
  done: boolean;

  static fromJSON(jsonObj, opts = {}): Task {
    return new Task(jsonObj['name'], jsonObj['done'], jsonObj['id']);
  }

  constructor(name: string = '', done: boolean = false, id = undefined) {
    this.id = id;
    this.name = name;
    this.done = done;
  }

  toJSON(opts = {}) {
    return {
      name: this.name,
      done: this.done,
      id: this.id
    };
  }
}
