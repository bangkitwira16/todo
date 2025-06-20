import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  DEVELOPER_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from '../../constants/task.const';
import { TaskUI } from '../../models/task';

@Component({
  selector: 'app-add-task-modal',
  imports: [
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    FormsModule,
    NgFor,
  ],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
  standalone: true,
})
export class AddTaskModalComponent {
  @Input({ required: true }) isVisible!: WritableSignal<boolean>;
  @Input() taskToEdit?: TaskUI;
  @Output() clickOk = new EventEmitter<TaskUI>();
  @Output() clickCancel = new EventEmitter();
  // Form state
  ngOnChanges() {
    this.form = this.taskToEdit
      ? { ...this.taskToEdit }
      : this.getDefaultForm();
  }
  getDefaultForm(): TaskUI {
    return {
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
  }

  form: TaskUI = this.getDefaultForm();

  statusOptions = STATUS_OPTIONS;
  priorityOptions = PRIORITY_OPTIONS;
  typeOptions = TYPE_OPTIONS;
  developerOptions = DEVELOPER_OPTIONS;
  handleOk() {
    this.clickOk.emit(this.form);
    this.resetForm();
    this.isVisible.set(false);
  }

  handleCancel() {
    this.resetForm();
    this.isVisible.set(false);
  }

  resetForm() {
    this.form = this.getDefaultForm();
  }
}
