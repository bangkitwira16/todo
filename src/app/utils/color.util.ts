export function getStatusColor(status: string): string {
  switch (status) {
    case 'Ready to start':
      return 'blue';
    case 'In Progress':
      return 'gold';
    case 'Waiting for review':
      return 'purple';
    case 'Pending Deploy':
      return 'orange';
    case 'Done':
      return 'green';
    case 'Stuck':
      return 'red';
    default:
      return 'default';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'Critical':
      return 'red';
    case 'High':
      return 'orange';
    case 'Medium':
      return 'yellow';
    case 'Low':
      return 'cyan';
    case 'Best Effort':
      return 'purple';
    default:
      return 'default';
  }
}

export function getTypeColor(type: string): string {
  switch (type) {
    case 'Feature Enhancements':
      return 'magenta';
    case 'Bug':
      return 'orange';
    case 'Other':
      return 'lime';
    default:
      return 'default';
  }
}
