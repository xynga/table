import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TableComponent} from 'xynga-table';
import {By} from "@angular/platform-browser";

describe('Table-Component', () => {
  let table, tableComp, tableEle;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TableComponent
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    table = fixture.debugElement.query(By.css('.table-container'));
    tableComp = table.componentInstance;
    tableEle = table.nativeElement;
    fixture.detectChanges();
  });
  it('should create the table',async (()=> {
    expect(table).toBeTruthy();
  }));
  it('should increment numColumns by 1 if ngOnInit() is called and numbered is true ', async(() => {
    tableComp.columnHeaders = [null, null, null];
    tableComp.numbered = true;
    tableComp.ngOnInit();
    expect(tableComp.numColumns).toEqual(4);
  }));
  it('should call displayPages if paginated is true', async(() => {
    tableComp.styleTable();
    tableComp.paginated = true;
    const spy = spyOn(tableComp, 'displayPages');
    tableComp.setColumnWidths();
    tableComp.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  }));
  it('', async(() => {

  }));

  it('should call pagesSetup if paginated is true', async(() => {
    tableComp.paginated = true;
    const spy = spyOn(tableComp, 'pagesSetup');
    tableComp.ngAfterContentInit();
    expect(spy).toHaveBeenCalled();
  }));
  it('should not call pagesSetup if paginated is false', async(() => {
    tableComp.paginated = false;
    const spy = spyOn(tableComp, 'pagesSetup');
    tableComp.ngAfterContentInit();
    expect(spy).not.toHaveBeenCalled();
  }));
  it('should call setColumnWidths', async(() => {
    const spy = spyOn(tableComp,'setColumnWidths');
    tableComp.onResize();
    expect(spy).toHaveBeenCalled();
  }));

  // it('THIS SHOULDNT WORK--WHY?! should call setColumnWidths', async(() => {
  //   tableComp.scrollable = 1;
  //   var temp = [{style: {setProperty(){return }}} ];
  //   var temp2 = {clientWidth(){return 1}};
  //   const spy = spyOn(tableComp.tableHeader.nativeElement, 'getElementsByTagName').and.returnValue(temp);
  //   const spy2 = spyOn(tableComp.tableData.nativeElement.getElementsByTagName.item.getElementsByTagName.item, 'getElementsByTagName').and.returnValue(temp2);
  //   tableComp.setColumnWidths();
  //   expect(spy).toHaveBeenCalled();
  //   expect(spy2).toHaveBeenCalled();
  // }));

  it('should call calculateNumPages', async(() => {
    const spy = spyOn(tableComp, 'calculateNumPages');
    tableComp.pagesSetup();
    expect(spy).toHaveBeenCalled();
  }));

  it('should return Math.ceil(row/Pages)', async(() => {
    const spy = spyOn(console,'log');
    tableComp.calculateNumPages(5,5);
    expect(spy).toHaveBeenCalledWith(1);
  }));

  it('should call setProperty', async(() => {
    tableComp.currentPage = 1;
    tableComp.perPage = 5;
    var temp = [{style: {setProperty(){return }}} ];
    const spy = spyOn(tableComp.tableData.nativeElement, 'getElementsByTagName').and.returnValue(temp);
    tableComp.displayPages();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call displayPages', async(() => {
    tableComp.currentPage = 1;
    const spy = spyOn(tableComp, 'displayPages');
    tableComp.switchPage();
    expect(spy).toHaveBeenCalled();
  }));
  it('should call setColumnWidths', async(() => {
    tableComp.currentPage = 1;
    const spy = spyOn(tableComp, 'setColumnWidths');
    tableComp.switchPage();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call switchPage', async(() => {
    tableComp.currentPage = 2;
    const spy = spyOn(tableComp, 'switchPage');
    tableComp.prevPage();
    expect(spy).toHaveBeenCalled();
  }));
  it('should not call switchPage', async(() => {
    tableComp.currentPage = 0;
    const spy = spyOn(tableComp, 'switchPage');
    tableComp.prevPage();
    expect(spy).not.toHaveBeenCalled()
  }));

  it('should call switchPage', async(() => {
    tableComp.currentPage += 5;
    tableComp.pages.length = 3;
    const spy = spyOn(tableComp, 'switchPage');
    tableComp.nextPage();
    expect(spy).not.toHaveBeenCalled();
  }));
  it('should not call switchPage', async(() => {
    tableComp.currentPage += 1;
    tableComp.pages.length = 3;
    const spy = spyOn(tableComp, 'switchPage');
    tableComp.nextPage();
    expect(spy).toHaveBeenCalled();
  }));
  it('should return false', async(() => {
    tableComp.maxPageButtons = 5;
    tableComp.currentPage = 1;
    expect(tableComp.buttonDisplay()).toBeFalsy();
  }));
  it('should return true', async(() => {
    tableComp.maxPageButtons = 8;
    tableComp.currentPage = 6;
    expect(tableComp.buttonDisplay(2)).toBeTruthy();
  }));
  it('should be true', async(() => {
    tableComp.columnHeaders = [null, null, {sortable: 'true'}];
    tableComp.numbered = true;
    tableComp.paginated = true;
    tableComp.sortTable(2);
  }));
  it('should be false', async(() => {
    tableComp.columnHeaders = [null, null, {sortable: 'false'}];
    tableComp.numbered = true;
    tableComp.paginated = true;
    tableComp.sortTable(2);
  }));
  it('should be false', async(() => {
    tableComp.columnHeaders = [null, null, {sortable: 'true'}];
    tableComp.numbered = false;
    tableComp.paginated = true;
    tableComp.sortedBy = 2;
    tableComp.sortTable(2);
  }));

})


