import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit {
  task: Task = new Task();
  id: number | undefined;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.taskService.getTask(this.id).pipe(
        catchError(error => {
          console.error('Error fetching task:', error);
          return throwError(error);
        })
      ).subscribe(task => {
        this.task = task;
      });
    }
  }

  saveTask() {
    const saveObservable = this.id ? this.taskService.updateTask(this.task) : this.taskService.addTask(this.task);

    saveObservable.subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
