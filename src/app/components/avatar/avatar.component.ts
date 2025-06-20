import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { getInitials, getDeveloperList } from '../../utils/developer.util';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule, NzAvatarModule, NgFor],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
})
export class DeveloperAvatarComponent {
  @Input() names: string[] = [''];
  @Input() isClickable: boolean = false;
  @Input() selectedDevelopers: Set<string> = new Set();
  @Output() nameClick = new EventEmitter<string>();
  getInitials = getInitials;
  getDeveloperList = getDeveloperList;

  onNameClick(name: string): void {
    if (this.isClickable) this.nameClick.emit(name);
  }

  isSelected(name: string): boolean {
    return this.selectedDevelopers?.has(name);
  }
}
