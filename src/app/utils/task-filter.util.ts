import { computed, isSignal, Signal } from '@angular/core';
import { TaskUI } from '../models/task';

export function createFilteredTasks(
  tasks: Signal<TaskUI[]>,
  searchQuery: Signal<string>,
  selectedDevelopers: Signal<Set<string>>,
  selectedSort: Signal<{ key: string; order: 'asc' | 'desc' }[]>
) {
  return computed(() => {
    console.assert(isSignal(tasks), 'ERROR: tasks is not a signal!');
    const query = searchQuery().toLowerCase();
    const devFilter = selectedDevelopers();
    const sortList = selectedSort();
    const taskList = tasks(); // ✅ this must be a signal call

    let filtered = taskList.filter((task) =>
      task.title.toLowerCase().includes(query)
    );

    if (devFilter.size > 0) {
      filtered = filtered.filter((task) =>
        task.developerArray?.some((dev) => devFilter.has(dev))
      );
    }

    if (sortList.length > 0) {
      filtered = [...filtered].sort((a, b) => {
        for (const { key, order } of sortList) {
          const aVal = (a[key as keyof TaskUI] ?? '').toString();
          const bVal = (b[key as keyof TaskUI] ?? '').toString();
          const cmp = aVal.localeCompare(bVal);
          if (cmp !== 0) return order === 'asc' ? cmp : -cmp;
        }
        return 0;
      });
    }

    return filtered;
  });
}
