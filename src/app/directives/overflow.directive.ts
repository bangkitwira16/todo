// directives/overflow-detect.directive.ts
import { Directive, ElementRef, Signal, signal, AfterViewInit, HostListener, inject, WritableSignal } from '@angular/core';

@Directive({
  selector: '[appOverflowDetect]',
  standalone: true,
  exportAs: 'overflowDetect'
})
export class OverflowDetectDirective implements AfterViewInit {
  private el = inject(ElementRef<HTMLElement>);
  readonly isOverflowing: WritableSignal<boolean> = signal(false);

  ngAfterViewInit() {
    setTimeout(() => this.checkOverflow());
  }

  @HostListener('window:resize')
  onResize() {
    this.checkOverflow();
  }

  private checkOverflow() {
    const element = this.el.nativeElement;
    this.isOverflowing.set(element.scrollWidth > element.clientWidth);
  }
}
