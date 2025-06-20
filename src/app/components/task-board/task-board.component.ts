import { Component, computed, signal, Signal } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  DEVELOPER_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from '../../constants/task.const';
import { TaskStatus, TaskUI } from '../../models/task';
import { TaskService } from '../../services/task-services.service';
import {
  getPriorityColor,
  getStatusColor,
  getTypeColor,
} from '../../utils/color.util';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgFor, NgIf } from '@angular/common';
import { DeveloperAvatarComponent } from '../avatar/avatar.component';
import { createFilteredTasks } from '../../utils/task-filter.util';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-task-board',
  imports: [
    DragDropModule,
    NzTagModule,
    NgFor,
    DeveloperAvatarComponent,
    ToolbarComponent,
    AddTaskModalComponent,
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
})
export class TaskBoardComponent {
  statusOptions = STATUS_OPTIONS;
  tasks!: Signal<TaskUI[]>;
  readonly filteredTasks!: Signal<TaskUI[]>;
  getStatusColor = getStatusColor;
  getPriorityColor = getPriorityColor;
  getTypeColor = getTypeColor;
  connectedDropLists = this.statusOptions.map((status) => 'column-' + status);
  searchQuery = signal('');
  selectedDevelopers = signal<Set<string>>(new Set());
  selectedSort = signal<{ key: string; order: 'asc' | 'desc' }[]>([]);
  isSearchVisible = signal(false);
  isVisible = signal(false);
  taskBeingEdited = signal<TaskUI | undefined>(undefined);
  sortOptions = SORT_OPTIONS;
  developerOptions = DEVELOPER_OPTIONS;
  constructor(private taskService: TaskService) {
    this.taskService.fetchTasks(); // load once
    this.tasks = this.taskService.tasks;
    this.filteredTasks = createFilteredTasks(
      this.tasks,
      this.searchQuery,
      this.selectedDevelopers,
      this.selectedSort
    );
  }

  groupedTasks = computed(() => {
    const map: Record<string, TaskUI[]> = {};
    for (const status of this.statusOptions) {
      map[status] = this.filteredTasks().filter(
        (t: TaskUI) => t.status === status
      );
    }
    return map;
  });

  onDrop(event: CdkDragDrop<TaskUI[]>) {
    const movedTask = event.previousContainer.data[event.previousIndex];
    const newStatus = event.container.id.replace('column-', '') as TaskStatus;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.taskService.tasks.update((tasks: TaskUI[]) =>
        tasks.map((t) => (t === movedTask ? { ...t, status: newStatus } : t))
      );
    }

    console.log(`✅ Moved: ${movedTask.title} => ${newStatus}`);
  }
  trackByTask(index: number, task: TaskUI) {
    return task.title + task.date; // or use a proper unique ID
  }

  toggleSearch() {
    this.isSearchVisible.update((v) => !v);
  }
  onNameClick(devName: string) {
    const current = new Set(this.selectedDevelopers());

    if (current.has(devName)) {
      current.delete(devName);
    } else {
      current.add(devName);
    }

    this.selectedDevelopers.set(current);
  }

  addNewTask() {
    console.log('new task');
    this.isVisible.set(true);
  }

  editTask(task: TaskUI) {
    this.taskBeingEdited.set(task);
    this.isVisible.set(true);
  }
  onClickOk(event: TaskUI) {
    const editing = this.taskBeingEdited(); // store once for safety

    if (editing) {
      // It's an edit
      this.taskService.tasks.update((list) =>
        list.map((t) => (t.title === editing.title ? { ...t, ...event } : t))
      );
    } else {
      // It's an add
      this.taskService.tasks.update((list) => [event, ...list]);
    }

    this.taskBeingEdited.set(undefined);
  }
}
