import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListService } from './todo-list.service';
import { Todo } from '../models/Todo'; 

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> = new Observable<Todo[]>();

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.todos$ = this.todoListService.getTodos();
  }

  startEdit(todo: Todo) {
    todo.editing = true;
  }

  saveEdit(todo: Todo) {
    todo.editing = false;
    this.todoListService.updateTodo(todo).subscribe(() => {
      this.loadAll();
    });
  }

  cancelEdit(todo: Todo) {
    todo.editing = false;
    this.loadAll();
  }

  changeStatus(todo: Todo) {
    todo.completed = !todo.completed; // Toggle the status
    this.todoListService.updateTodo(todo)
      .subscribe(() => {
        this.loadAll(); // Refresh the list to reflect changes
      });
  }
  

  deleteTodo(todo: Todo): void {
    if (todo.id !== undefined) {
      this.todoListService.deleteTodo(todo.id).subscribe(() => {
        this.loadAll();
      });
    }
  }
  

  cancel(todo: Todo): void {
    todo.editing = false; 
  }
  
}
