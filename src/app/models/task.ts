export type TaskStatus =
  | 'Ready to start'
  | 'In Progress'
  | 'Waiting for review'
  | 'Pending Deploy'
  | 'Done'
  | 'Stuck';

export type TaskPriority =
  | 'Critical'
  | 'High'
  | 'Medium'
  | 'Low'
  | 'Best Effort';

export type TaskType = 'Feature Enhancements' | 'Other' | 'Bug';

export interface Task {
  title: string;
  developer: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  date: string; // ISO string (format on UI only)
  'Estimated SP': number;
  'Actual SP': number;
}

export interface TaskUI extends Task {
  developerArray: string[];
}
