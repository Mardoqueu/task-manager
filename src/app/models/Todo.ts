export class Todo {
  constructor(
    public id?: number,
    public title?: string,
    public completed?: boolean,
    public editing?: boolean
  ) {
    this.completed = false;
    this.editing = false; 
  }
}
