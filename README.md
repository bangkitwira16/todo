# 📝 Todo App (Angular + NG-ZORRO + Signals)

A modern, scalable, and signal-powered Todo List application built with **Angular 19+**, featuring **Angular Signals**, **computed values**, reusable **services**, **custom directives**, and the beautiful **NG-ZORRO** UI component library.

---

## 🚀 Features

- ✅ Create, edit, and delete todos
- ✅ Track status, priority, and type
- ✅ Filter tasks by developer, status, type, etc.
- ✅ Inline editing with NG-ZORRO inputs, datepickers, and selects
- ✅ Kanban board layout (CDK drag-and-drop)
- ✅ Signal-based state management (no NgRx or RxJS required)

---

## 🧱 Tech Stack

| Tech/Concept          | Usage                                                                  |
| --------------------- | ---------------------------------------------------------------------- |
| **Angular 19+**       | Main framework                                                         |
| **Angular Signals**   | Reactive state for tasks and filters                                   |
| **Computed**          | Derived UI values like filtered tasks, sorted list, summaries          |
| **NG-ZORRO**          | UI components (tables, datepickers, forms, modals, tags, badges, etc.) |
| **CDK DragDrop**      | Drag and drop for Kanban task movement                                 |
| **Services**          | Central logic for task CRUD and filter handling                        |
| **Custom Directives** | Reusable behavior such as auto-focus, status coloring, etc.            |
| **Utils**             | Common logic helpers (sorting, formatting, percentage calc, etc.)      |
| **Constants**         | Centralized enums or key definitions (status, priority, type, etc.)    |

---

## 📁 Project Structure

```
todo/
├── .vscode/ # VSCode config files
├── public/ # Static public assets
├── src/ # Main source code
│ ├── app/ # Root Angular module
│ │ ├── components/ # UI components like task list, board, toolbar, etc.
│ │ ├── constants/ # App-wide constants (e.g., task status, priority, types)
│ │ ├── directives/ # Custom directives (e.g., overflow control)
│ │ ├── models/ # TypeScript interfaces and models
│ │ ├── services/ # Services for data handling (e.g., TaskService)
│ │ ├── utils/ # Utility functions or helpers
│ │ ├── app.component.html # Root component template
│ │ ├── app.component.scss # Root component styling
│ └── main.ts # Angular application bootstrap
├── angular.json # Angular workspace configuration
├── package.json # Project metadata and dependencies
├── README.md # Project documentation
└── tsconfig.json # TypeScript configuration
```
---
## 🛠️ Getting Started

### Prerequisites

- Node.js v16+
- Angular CLI

### Install & Run

```bash
git clone https://github.com/bangkitwira16/todo.git
cd todo
npm install
ng serve
```
---
### 🔗 Live Demo

🚀 **Try it here:** [https://todo-boardlist.netlify.app](https://todo-boardlist.netlify.app)
