import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TaskBoardComponent } from './components/task-board/task-board.component';
@Component({
  selector: 'app-root',
  imports: [TaskListComponent, NzTabsModule, NzIconModule, TaskBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo';
}
