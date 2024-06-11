import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  providers: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns = ['title', 'description', 'dueDate', 'completed', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Task>(this.tasks);

  constructor(private taskService: TaskService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.taskService.getTasks().pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return throwError(error);
      })
    ).subscribe(response => {
      this.tasks = response.map(item => {
        const task = new Task();
        task.id = item.id;
        task.title = item.title;
        task.description = item.description;
        task.dueDate = item.dueDate ? new Date(item.dueDate) : undefined;
        task.completed = item.completed;
        return task;
      });
      this.dataSource.data = this.tasks;
    });
  }

  addTask() {
    this.router.navigate(['/tasks/new']);
  }

  editTask(id: number) {
    this.router.navigate([`/tasks/edit/${id}`]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).pipe(
      catchError(error => {
        console.error('Error deleting task:', error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.dataSource.data = this.tasks;
    });
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task).pipe(
      catchError(error => {
        console.error('Error updating task:', error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.dataSource.data = [...this.tasks];
    });
  }

  logout() {
    this.authService.logout();
  }
}
