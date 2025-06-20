import { Task, TaskUI } from '../models/task';

export function toTaskUI(task: Task): TaskUI {
  return {
    ...task,
    developerArray: task.developer
      ? task.developer.split(',').map((d) => d.trim())
      : [],
  };
}

export function toTaskAPI(taskUI: TaskUI): Task {
  const { developerArray, ...rest } = taskUI;
  return {
    ...rest,
    developer: developerArray.join(', '),
  };
}
