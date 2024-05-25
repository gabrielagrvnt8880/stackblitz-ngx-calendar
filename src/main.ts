import { ChangeDetectionStrategy, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { CalendarPageComponent } from './app/pages/calendar/calendar-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-calendar-page />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [CalendarPageComponent]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
