import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { OnDestroyMixin } from '@w11k/ngx-componentdestroyed';

@Component({
  standalone: true,

  selector: 'calendar-month-grid-item',
  templateUrl: './calendar-month-grid-item.component.html',
  styleUrl: './calendar-month-grid-item.component.scss',
  imports: [CommonModule]
})
export class CalendarMonthGridItemComponent extends OnDestroyMixin {
  @Input() monthDate: number | null = null;
  @Input() active: boolean = true;
}
