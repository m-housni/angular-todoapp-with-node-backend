import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent {
  @Input() id: string = '';
  @Input() todoText: string = '';
  @Output() editTodoEvent = new EventEmitter<string>();
  @Input() close: boolean = false;
  @Output() closeEvent = new EventEmitter();
  text: string = '';

  async sendEditTodo() {

    await fetch(`${environment.apiUrl}/todos/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.text
      })
    })

    this.editTodoEvent.emit(this.text);
    this.text = '';
  }

  sendClose() {
    this.closeEvent.emit();
  }
}
