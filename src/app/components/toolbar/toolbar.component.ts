import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DeveloperAvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-toolbar',
  imports: [
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    DeveloperAvatarComponent,
    FormsModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  standalone: true,
})
export class ToolbarComponent {
  @Input({ required: true }) searchQuery!: WritableSignal<string>;
  @Input({ required: true }) selectedDevelopers!: WritableSignal<Set<string>>;
  @Input({ required: true })
  selectedSort!: WritableSignal<{ key: string; order: 'asc' | 'desc' }[]>;
  @Input({ required: true }) developerOptions!: string[];
  @Input({ required: true }) sortOptions!: { label: string; value: string }[];

  @Output() addNewTask = new EventEmitter<void>();
  @Output() toggleSearch = new EventEmitter<void>();
  @Output() nameClick = new EventEmitter<string>();

  isSearchVisible = signal(false);

  toggleSearchField() {
    this.isSearchVisible.update((v) => !v);
    this.toggleSearch.emit();
  }

  onSearchChange(value: string) {
    this.searchQuery.set(value);
  }

  onSortChange(value: any) {
    this.selectedSort.set(value);
  }

  onAvatarClick(name: string) {
    this.nameClick.emit(name);
  }
}
