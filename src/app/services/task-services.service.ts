import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Task, TaskUI } from '../models/task';
import { toTaskUI } from '../utils/task.transform.util';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://mocki.io/v1/61c56458-2b07-44e2-9ec9-c7df98ccbe9f';
  tasks = signal<TaskUI[]>([]);

  constructor(private http: HttpClient) {}

  fetchTasks(): void {
    this.http.get<{ data: Task[] }>(this.apiUrl).subscribe({
      next: (res) => {
        if (Array.isArray(res.data)) {
          const transformed: TaskUI[] = res.data.map(toTaskUI);
          this.tasks.set(transformed);
        } else {
          console.error(
            'API response does not contain a valid data array',
            res
          );
        }
      },
      error: (err) => {
        console.error('Failed to fetch tasks:', err);
      },
    });
  }
}
