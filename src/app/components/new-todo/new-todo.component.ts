import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.css'
})
export class NewTodoComponent {
  @Input() show: boolean = false;
  @Output() showEvent = new EventEmitter();
  @Output() newTodoEvent = new EventEmitter<string>();
  text: string = '';

  async sendNewTodo() {

    await fetch(`${environment.apiUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.text,
        completed: false
      })
    })

    this.newTodoEvent.emit(this.text);
    this.text = '';
    this.showEvent.emit();
  }
  sendShow() {
    this.showEvent.emit();
  }
}
