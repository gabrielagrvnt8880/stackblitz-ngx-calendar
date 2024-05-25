import { Component } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { CalendarMonthGridComponent } from '../../components/calendar/calendar-month-grid/calendar-month-grid.component';
import { CalendarService } from '../../services/calendar.service';
import { distinctUntilChanged, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
  imports: [CalendarMonthGridComponent, CommonModule],
})
export class CalendarPageComponent extends OnDestroyMixin {
  public monthYear: string = '';
  private _currentSelectedMonth: number = 0;
  private _currentSelectedYear: number = 0;

  constructor(private _calendarService: CalendarService) {
    super();
    this.initializeCalendarListener();
  }

  private initializeCalendarListener(): void {
    this._calendarService.calendar
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return prev.monthIndx === curr.monthIndx && prev.year === curr.year;
        }),
        tap((data) => {
          this.monthYear = `${data!.month} ${data!.year}`;
          this._currentSelectedYear = data!.year;
          this._currentSelectedMonth = data.monthIndx;
        }),
        untilComponentDestroyed(this)
      )
      .subscribe();
  }

  public selectMonth(month: number): void {
    this._calendarService.selectMonth({
      month: this._currentSelectedMonth + month,
      year: this._currentSelectedYear,
    });
  }
}
