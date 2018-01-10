import { Component } from '@angular/core';
import {ColumnHeader} from 'xynga-table';


class TestType {
  constructor(public firstName: string,
              public lastName: string,
              public emailAddress: string,
              public lifeGoal: string) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  testHeaders: ColumnHeader[] = [new ColumnHeader('First Name', true),
    new ColumnHeader('Last Name', true),
    new ColumnHeader('Email Address', true),
    new ColumnHeader('Life Goal')];
  testData: TestType[] = [new TestType('Peter', 'Parker', 'Spidy@gmail.com', 'To Save The World'),
    new TestType('Tony', 'Stark', 'tstark@starkindustries.net', 'Make Money'),
    new TestType('Steven', 'Rogers', 'TheCaptain@America.com', 'Fight For Freedom'),
    new TestType('Wade', 'Wilson', 'BreakThe4thWall@Gotcha.com', 'HahAHAhaAHa')];

}
