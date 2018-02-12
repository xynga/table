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
      ],
    }).compileComponents();
  }));
  it('should create the table', async(() => {
    const fixture = TestBed.createComponent(TableComponent);
    const table = fixture.debugElement.componentInstance;
    table.maxHeight = 300;
    table.columnHeaders = [new ColumnHeader('First Name', false),
      new ColumnHeader('Last Name', false),
      new ColumnHeader('Email Address', false),
      new ColumnHeader('Life Goal')];
    table.tableData= `<tr cghfghsdh>
    <td>sfassagsag</td>
    <td>asfgasg</td>
    <td>asfgasg</td>
    <td>Fafasdfasdgasg</td>
  </tr>`;


    fixture.detectChanges();
    expect(TableComponent).toBeTruthy();
  }));

});
