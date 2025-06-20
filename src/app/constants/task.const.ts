import { TaskPriority, TaskStatus, TaskType } from '../models/task';

export const STATUS_OPTIONS: TaskStatus[] = [
  'Ready to start',
  'In Progress',
  'Waiting for review',
  'Pending Deploy',
  'Done',
  'Stuck',
];
export const PRIORITY_OPTIONS: TaskPriority[] = [
  'Critical',
  'High',
  'Medium',
  'Low',
  'Best Effort',
];
export const TYPE_OPTIONS: TaskType[] = [
  'Feature Enhancements',
  'Other',
  'Bug',
];

export const DEVELOPER_OPTIONS: string[] = ['Alice', 'Bob', 'Charlie'];

export const SORT_OPTIONS = [
  { label: 'Title', value: 'title' },
  { label: 'Status', value: 'status' },
  { label: 'Priority', value: 'priority' },
  { label: 'Type', value: 'type' },
  { label: 'Date', value: 'date' },
  { label: 'Est. SP', value: 'Estimated SP' },
  { label: 'Act. SP', value: 'Actual SP' },
];
