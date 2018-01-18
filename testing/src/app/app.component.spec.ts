import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TableComponent} from 'xynga-table';
import {ColumnHeader} from 'xynga-table';

describe('Table-Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TableComponent,
        ColumnHeader
      ],
    }).compileComponents();
  }));
  it('should create the table', async(() => {
    const fixture = TestBed.createComponent(TableComponent);
    const table = fixture.debugElement.componentInstance;
    table.columnHeaders = [new ColumnHeader('sagsadg',false),
      new ColumnHeader('sagsadg',false),
      new ColumnHeader('sagsadg',false)];
    fixture.debugElement.nativeElement.innerHTML = `<tr *ngFor="let entry of tableData">
    <td>{{entry.firstName}}</td>
    <td>{{entry.lastName}}</td>
    <td>{{entry.emailAddress}}</td>
    <td>{{entry.lifeGoal}}</td>
  </tr>`
    table.maxHeight = 300;
    fixture.detectChanges();
    expect(TableComponent).toBeTruthy();
  }));

});
