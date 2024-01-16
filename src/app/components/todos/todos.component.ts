import { Component, NgModule } from '@angular/core'
import { Todo } from '../../../models/Todo'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NewTodoComponent } from '../new-todo/new-todo.component'
import { EditTodoComponent } from "../edit-todo/edit-todo.component";
import { v4 as uuidv4 } from 'uuid'
import { environment } from '../../../environments/environment'


@Component({
    selector: 'app-todos',
    standalone: true,
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.css',
    imports: [CommonModule, NewTodoComponent, EditTodoComponent]
})
export class TodosComponent {
  
  showAddNewTodoForm: boolean = true;
  showEditTodoForm: boolean = true;
  _id!: string;
  todoText!: string;

  receiveClose() {
    this.showEditTodoForm = true;
  }

  async deleteTodo(_id: string) {
    this.todos = this.todos.filter(todo => todo._id !== _id);

    await fetch(`${environment.apiUrl}/todos/${_id}`, {
      method: 'DELETE'
    })

  }
  
  async editTodo(_id: string) {
    this._id = _id;
    this.todoText = this.todos.filter(todo => todo._id === _id)[0].text;
    this.showEditTodoForm = false;
  }
  clearCompleted() {
    this.todos = this.todos.filter( todo => !todo.completed  )
  }
  clearAll() {
    this.todos = [];
  }
  async toggleCompleted(_id: string) {
    await this.todos.map(todo => {
      if (todo._id === _id) {
        todo.completed = !todo.completed;
        fetch(`${environment.apiUrl}/todos/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            completed: todo.completed
          })
        })
      }
    });
  }
  receivedText: string = ''
  receiveText(text: string, _id: string = '') {

    this.receivedText = text;
    if(!_id)
      this.todos.push({
        _id: uuidv4(),
        text: text,
        completed: false
      });
    else
      this.todos.map(todo => {
        if (todo._id === _id) {
          todo.text = text;
        }
      })
    this.showEditTodoForm = true;
  }

  receiveShow() {
    this.showAddNewTodoForm = true;
  }
  addNewTodo() {
    this.showAddNewTodoForm = false;
  }
  todos: Todo[] = []

  async ngOnInit() {
    const response = await fetch(`${environment.apiUrl}/todos`);
    const todos = await response.json();
    this.todos = todos.data;
  }
  
}
