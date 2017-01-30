export class Task {

  id: string;
  name: string;
  done: boolean;

  static fromJSON(jsonObj, opts = {}): Task {
    Task.validate(jsonObj);
    return new Task(jsonObj['name'], jsonObj['done'], jsonObj['id']);
  }

  static validate(obj) {
    if (obj === null) {
      throw new Error('cannot convert null');
    }
    if (!obj.hasOwnProperty('name') || !obj.hasOwnProperty('done')) {
      throw new Error('name or done does not exists on this object :' +
                      JSON.stringify(obj)
                     );
    }
  }

  get saved(): boolean {
    return !!this.id;
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
