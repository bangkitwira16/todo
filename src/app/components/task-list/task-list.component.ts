import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  QueryList,
  Signal,
  signal,
  ViewChildren,
} from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Task, TaskUI } from '../../models/task';
import { TaskService } from '../../services/task-services.service';
import { calculatePercentage } from '../../utils/summary-util';
import { DeveloperAvatarComponent } from '../avatar/avatar.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  getPriorityColor,
  getStatusColor,
  getTypeColor,
} from '../../utils/color.util';
import { OverflowDetectDirective } from '../../directives/overflow.directive';
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  DEVELOPER_OPTIONS,
  SORT_OPTIONS,
} from '../../constants/task.const';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { createFilteredTasks } from '../../utils/task-filter.util';

@Component({
  selector: 'app-task-list',
  imports: [
    NzTableModule,
    NzTagModule,
    NgIf,
    NgFor,
    CommonModule,
    DeveloperAvatarComponent,
    NzCheckboxModule,
    NzToolTipModule,
    OverflowDetectDirective,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzIconModule,
    ToolbarComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
})
export class TaskListComponent {
  readonly editingIndex = signal<number | null>(null);
  readonly tasks!: Signal<TaskUI[]>;
  readonly filteredTasks!: Signal<TaskUI[]>;
  readonly totalEstimatedSP = computed(() =>
    this.tasks().reduce((sum, task) => sum + (task['Estimated SP'] || 0), 0)
  );

  readonly statusSummary = computed(() =>
    calculatePercentage(this.tasks().map((task) => task.status)).map(
      (entry) => ({
        ...entry,
        color: getStatusColor(entry.key),
      })
    )
  );

  readonly prioritySummary = computed(() =>
    calculatePercentage(this.tasks().map((task) => task.priority)).map(
      (entry) => ({
        ...entry,
        color: getPriorityColor(entry.key),
      })
    )
  );

  readonly typeSummary = computed(() =>
    calculatePercentage(this.tasks().map((task) => task.type)).map((entry) => ({
      ...entry,
      color: getTypeColor(entry.key),
    }))
  );

  readonly totalActualSP = computed(() =>
    this.tasks().reduce((sum, task) => sum + (task['Actual SP'] || 0), 0)
  );
  selectedIndexes = signal<Set<number>>(new Set());

  isSelected = (index: number) => this.selectedIndexes().has(index);
  getStatusColor = getStatusColor;
  getTypeColor = getTypeColor;
  getPriorityColor = getPriorityColor;
  developerOptions = DEVELOPER_OPTIONS;
  statusOptions = STATUS_OPTIONS;
  priorityOptions = PRIORITY_OPTIONS;
  typeOptions = TYPE_OPTIONS;
  @ViewChildren('editRow') editRows!: QueryList<ElementRef>;
  searchQuery = signal('');
  selectedDevelopers = signal<Set<string>>(new Set());
  selectedSort = signal<{ key: string; order: 'asc' | 'desc' }[]>([]);
  isSearchVisible = signal(false);
  sortOptions = SORT_OPTIONS;
  constructor(private taskService: TaskService) {
    this.taskService.fetchTasks(); // call fetch during constructor or in ngOnInit
    this.tasks = this.taskService.tasks;
    this.filteredTasks = createFilteredTasks(
      this.tasks,
      this.searchQuery,
      this.selectedDevelopers,
      this.selectedSort
    );
    console.log('this.tasks typeof', typeof this.tasks); // must be 'function'
    console.log('this.searchQuery typeof', typeof this.searchQuery); // must be 'function'
    console.log(
      'this.selectedDevelopers typeof',
      typeof this.selectedDevelopers
    ); // must be 'function'
    console.log('this.selectedSort typeof', typeof this.selectedSort); // must be 'function'
  }

  toggleSelection(index: number) {
    const set = new Set(this.selectedIndexes());
    if (set.has(index)) {
      set.delete(index);
    } else {
      set.add(index);
    }
    this.selectedIndexes.set(set);
  }

  toggleSelectAll(checked: boolean) {
    const length = this.tasks().length;
    if (checked) {
      this.selectedIndexes.set(new Set([...Array(length).keys()])); // 0 to N-1
    } else {
      this.selectedIndexes.set(new Set());
    }
  }

  selectedTasks = computed(() =>
    this.tasks().filter((_, i) => this.selectedIndexes().has(i))
  );
  addNewTask() {
    const newTask: TaskUI = {
      title: '',
      developer: '',
      status: STATUS_OPTIONS[0],
      priority: PRIORITY_OPTIONS[0],
      type: TYPE_OPTIONS[0],
      date: new Date().toISOString(),
      'Estimated SP': 0,
      'Actual SP': 0,
      developerArray: [],
    };

    this.taskService.tasks.update((list) => [newTask, ...list]);
    this.editingIndex.set(0);
  }

  startEdit(i: number) {
    this.editingIndex.set(i);
  }
  stopEdit() {
    this.editingIndex.set(null);
  }

  isEditing(i: number) {
    return this.editingIndex() === i;
  }

  saveField(i: number, key: keyof Task, value: any) {
    this.taskService.tasks.update((list) => {
      const copy = [...list];
      copy[i] = { ...copy[i], [key]: value };
      return copy;
    });
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.editRows.some((el) =>
      el.nativeElement.contains(event.target)
    );

    if (!clickedInside) {
      this.stopEdit();
    }
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
}
