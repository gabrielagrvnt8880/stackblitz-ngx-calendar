import { Component } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { CalendarMonthGridItemComponent } from '../calendar-month-grid-item/calendar-month-grid-item.component';
import { CalendarMonthWeekRow } from './calendar-month-grid.constants';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MonthCalendarGenerator } from '../../../../utilities/month-calendar-generator/month-calendar-generator';
import { ICalendarMonthItem } from '../../../types/calendar-month-item.interface';
import { CalendarService } from '../../../services/calendar.service';
import { tap } from 'rxjs';

@Component({
  standalone: true,

  selector: 'calendar-month-grid',
  styleUrl: './calendar-month-grid.component.scss',
  templateUrl: './calendar-month-grid.component.html',

  imports: [CalendarMonthGridItemComponent, CommonModule],
})
export class CalendarMonthGridComponent extends OnDestroyMixin {
  public weekRow = CalendarMonthWeekRow;
  public monthDates: ICalendarMonthItem[] = [];

  constructor(private _calendarService: CalendarService) {
    super();

    this.initializeMonthDates();
    this.initializeControlListener();
  }

  private initializeControlListener(): void {
    this._calendarService.selectedMonth
      .pipe(
        tap((data) => {
          this.initializeMonthDates(data.month, 1, data.year);
        }),
        untilComponentDestroyed(this)
      )
      .subscribe();
  }

  private initializeMonthDates(
    month?: number,
    day?: number,
    year?: number
  ): void {
    this.monthDates = [];
    const generatedCurrentMonth = new MonthCalendarGenerator(month, day, year);
    const items = generatedCurrentMonth.generateMonth();
    if (day && day > 11) {
      day = 0;
    }
    if (items.prevMonthEndAt < 6) {
      const _prevMonthDates = Array.from(
        { length: items.prevMonthEndAt + 1 },
        (_, i) => i + (items.prevMonthEndDate - items.prevMonthEndAt)
      ).map((value) => <ICalendarMonthItem>{ date: value, active: false });
      this.monthDates.push(..._prevMonthDates);
    }

    const _currentMonthDates = Array.from(
      { length: items.endDate },
      (_, i) => i + 1
    ).map((value) => <ICalendarMonthItem>{ date: value, active: true });
    this.monthDates.push(..._currentMonthDates);

    const _nextMonthDates = Array.from(
      { length: 6 - items.endAt },
      (_, i) => i + 1
    ).map((value) => <ICalendarMonthItem>{ date: value, active: false });
    this.monthDates.push(..._nextMonthDates);

    this._calendarService.updateCalendar({
      month: items.month,
      year: items.year,
      monthIndx: items.monthIndx,
    });
  }
}
