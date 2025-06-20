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

src/
├── app/
│ ├── components/ # Task list, task item, kanban columns, etc.
│ ├── constants/ # Central enums: status, priority, type
│ ├── directives/ # Custom directives (e.g. focus, style helpers)
│ ├── services/ # TaskService, FilterService, etc.
│ ├── utils/ # Utility functions (sorting, formatting, etc.)
│ ├── models/ # Interfaces for Task, Developer, etc.

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

## 🔗 Live Demo

🚀 **Try it here:** [https://todo-boardlist.netlify.app](https://todo-boardlist.netlify.app)
```
