import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICalendarData } from '../types/calendar-data.interface';
import { ISelectedMonth } from '../types/selected-month.interface';
import { Months } from '../components/calendar/calendar-month-grid/calendar-month-grid.constants';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private _date!: Date;
  public calendar!: BehaviorSubject<ICalendarData>;
  public selectedMonth!: BehaviorSubject<ISelectedMonth>;

  constructor() {
    this._date = new Date();
    this.calendar = new BehaviorSubject<ICalendarData>({
      monthIndx: this._date.getMonth(),
      month: Months[this._date.getMonth()],
      year: this._date.getFullYear(),
    });

    this.selectedMonth = new BehaviorSubject<ISelectedMonth>({
      month: this._date.getMonth(),
      year: this._date.getFullYear(),
    });
  }

  public updateCalendar(data: ICalendarData) {
    this.calendar.next(data);
  }

  public selectMonth(month: ISelectedMonth): void {
    this.selectedMonth.next(month);
  }
}
