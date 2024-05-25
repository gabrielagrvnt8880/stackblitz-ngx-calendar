import { Months } from '../../app/components/calendar/calendar-month-grid/calendar-month-grid.constants';

export class MonthCalendarGenerator {
  private _monthIndx: number = 0;
  private _year: number = 0;
  private _day: number = 1;

  /**
   * * Month - month index
   * * Day - date
   * * Year - year
   */
  constructor(month?: number, day?: number, year?: number) {
    const dateinstance = new Date();
    this._monthIndx = month ?? dateinstance.getMonth();
    this._day = day ?? dateinstance.getDate();
    this._year = year ?? dateinstance.getFullYear();
  }

  public generateMonth() {
    const startdate = new Date(this._year, this._monthIndx, this._day);
    const endDate = new Date(this._year, this._monthIndx + 1, 0);
    const prevMonth = new Date(this._year, this._monthIndx, 0);

    return {
      month: Months[this._monthIndx],
      monthIndx: this._monthIndx,
      endDate: endDate.getDate(),
      starAt: startdate.getDay(),
      endAt: endDate.getDay(),

      prevMonthEndDate: prevMonth.getDate(),
      prevMonthEndAt: prevMonth.getDay(),

      year: this._year
    };
  }
}
