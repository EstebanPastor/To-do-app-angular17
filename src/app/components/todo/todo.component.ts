import { Component, signal } from '@angular/core';
import { FilterType, TodoModel } from '../../models/todo';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todolist = signal<TodoModel[]>([
    { id: 1, title: 'Buy milk', completed: false, editing: false },
    { id: 2, title: 'Feed the cat', completed: true, editing: false },
    { id: 3, title: 'Buy chocolates', completed: false, editing: false },
  ]);
  filter = signal<FilterType>('all');

  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  changeFilter(filterString: FilterType) {
    this.filter.set(filterString);
  }
  addToDo() {
    const newToDoTitle = this.newTodo.value.trim();
    if (this.newTodo.valid && newToDoTitle !== '') {
      this.todolist.update((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: Date.now(),
            title: newToDoTitle,
            completed: false,
            editing: false,
          },
        ];
      });
      this.newTodo.reset();
    } else {
      this.newTodo.reset();
    }
  }
  toggleTodo(todoId: number) {
    return this.todolist.update((prevTodos) =>
      prevTodos.map((todo) => {
        return todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo;
      })
    );
  }
  removeTodo(todoId: number) {
    this.todolist.update((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    })
  }
}
