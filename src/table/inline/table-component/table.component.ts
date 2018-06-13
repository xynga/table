import {
    AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, HostListener, Input, OnInit, TemplateRef,
    ViewChild
} from '@angular/core';

const SELECTOR: string = 'ui-table';

export class ColumnHeader {
    name: string;
    sortable?: boolean;

    constructor(name: string, sortable?: boolean) {
        this.name = name;
            this.sortable = sortable;
    };
}

@Component({
    selector: SELECTOR,
    template: `


      <div class="table-container" style="border: solid dimgray 2px;">
        <div>
          <table>
            <tr class="table-header" #header>

              <td *ngIf="numbered" (click)="sortTable(-1)">#</td>
              <td *ngFor="let header of columnHeaders, let i=index" (click)="sortTable(i)">
                {{header.name}}
                <div *ngIf="header.sortable" style="float:right">
                 <svg style="width: 10px; height: 14px"><path data-name="top arrow" d="M5 0l5 5.8H0zM5 14L0 8.2h10z" fill="#1e407a"/></svg>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div class="table-data"
             [ngStyle]="{'max-height.px':maxHeight}"
             [ngClass]="{'scrollable':scrollable , 'paginated':paginated, 'standard':(!scrollable && !paginated)}">
          <table #tableData>
            <ng-content></ng-content>
          </table>
        </div>
      </div>

      <br>
      <div *ngIf="paginated" style="text-align: center">
        <button [disabled]="currentPage == 1" type="button" (click)="switchPage(1)">first</button>
        <button [disabled]="currentPage == 1" type="button" (click)="prevPage()">prev</button>
        <div *ngFor="let page of pages,let i = index" style="display: inline;">
          <button *ngIf="buttonDisplay(page)" [disabled]="currentPage == page" type="button" (click)="switchPage(page)">{{page}}</button>
        </div>
        <button [disabled]="currentPage == pages.length" type="button" (click)="nextPage()">next</button>
        <button [disabled]="currentPage == pages.length" type="button" (click)="switchPage(pages.length)">last</button>
      </div>
    `,
    styles: [`
      *{box-sizing:border-box}.paginated{overflow-y:hidden}.scrollable{overflow-y:auto}.standard{overflow:hidden}div.table-data{background:whitesmoke;position:relative}tr.table-header{background:darkgray}table{table-layout:fixed;border-collapse:collapse;width:100%}th,td{border:1px solid #266eb3;text-align:left;padding:8px;color:black}
    `] //This CSS is necessary for the tables to display properly
})

export class TableComponent implements OnInit, AfterViewInit, AfterContentInit{
    @Input() public columnHeaders: ColumnHeader[];
    @Input() public numbered: boolean;
    @Input() public maxHeight: number; // Value corresponds to number of pixels
    @Input() public scrollable: boolean = false;
    @Input() public paginated: boolean = false;


    @ViewChild('header') tableHeader: ElementRef;
    @ViewChild('tableData') tableData: ElementRef;
    @ContentChild(TemplateRef) icon: TemplateRef<any>;
    childCount: number;
    numColumns: number;

    sortedBy: number = -1;
    reversed: boolean = false;

    @Input() perPage: number = 5;
    pages: number[] = [];
    currentPage: number = 1;
    @Input() public maxPageButtons = 5; // this number should be odd

    ngOnInit() {
        this.numColumns = this.columnHeaders.length;
        if(this.numbered){
            this.numColumns += 1;
        }
    }

    ngAfterViewInit() {
        this.styleTable();

        if(this.paginated){
            this.displayPages();
        }

        this.setColumnWidths();
    }

    ngAfterContentInit(){
        if(this.paginated) {
            this.pagesSetup();
        }
    }

    @HostListener('window:resize')
    onResize(){
        this.setColumnWidths();
    }


    public styleTable() {
        this.childCount = this.tableHeader.nativeElement.childElementCount;

        let bodyChildren = this.tableData.nativeElement.getElementsByTagName('td');
        let headerChildren = this.tableHeader.nativeElement.getElementsByTagName('td');

        for(let i = 0; i < bodyChildren.length; i++){
            bodyChildren[i].style.border="1px solid dimgrey";
            bodyChildren[i].style.padding="8px";
            bodyChildren[i].style.textAlign="left";
        }

        for(let i = 0; i < headerChildren.length; i++){
            headerChildren[i].style.border="1px solid dimgrey";
            headerChildren[i].style.padding="8px";
            headerChildren[i].style.textAlign="left";
            if (this.columnHeaders[i].sortable) {
                headerChildren[i].style.background = "url('') no-repeat";
                headerChildren[i].style.backgroundSize = "20px 20px";
                headerChildren[i].style.backgroundPosition = "right"
            }
        }

    }

    public setColumnWidths() {
        this.childCount = this.tableHeader.nativeElement.childElementCount;

        let bodyChildren, headerChildren, tbody;
        bodyChildren = this.tableData.nativeElement.getElementsByTagName('tbody').item(0).getElementsByTagName('tr').item((this.currentPage - 1) * this.perPage).getElementsByTagName('td')

        tbody = this.tableData.nativeElement.getElementsByTagName('tbody').item(0);
        headerChildren = this.tableHeader.nativeElement.getElementsByTagName('td');

        for(let i=0; i < bodyChildren.length; i++) {
            if(i != bodyChildren.length - 1) {
                headerChildren[i].style.setProperty("width",(bodyChildren[i].clientWidth + 1 ) + "px"); //All the boxes show up as 1 px short
            }else if(this.scrollable && ((tbody.offsetHeight + headerChildren[0].offsetHeight) > this.maxHeight)){
                headerChildren[i].style.setProperty("width", (bodyChildren[i].clientWidth + 18) + "px");//The last box accounts for the 17px scroll bar
            }else{
                headerChildren[i].style.setProperty("width", (bodyChildren[i].clientWidth + 1) + "px");//The last box accounts for the 17px scroll bar
            }
        }
    }

    public pagesSetup(){
        let rowChildren = this.tableData.nativeElement.getElementsByTagName('tr');
        this.calculateNumPages(rowChildren.length, this.perPage);
    }

    public calculateNumPages(rows: number, perPage: number){
        console.log(Math.ceil(rows/perPage));
        var pages = (Math.ceil(rows/perPage));
        var arr = Array.apply(null,Array(pages));
        this.pages = arr.map((x:any, i:any)=>i+1);
    }

    public displayPages(){


        let bodyChildren = this.tableData.nativeElement.getElementsByTagName('tr');

        for(let i = 0; i < bodyChildren.length; i++ ){
            if( i > (((this.currentPage-1)*this.perPage)-1) && i < this.currentPage*this.perPage){
                bodyChildren[i].style.setProperty("display", "table-row");
            }else{
                bodyChildren[i].style.setProperty("display", "none");
            }
        }

    }

    public switchPage(num: number){
        this.currentPage = num;

        this.displayPages();
        this.setColumnWidths();
    }

    public prevPage(){
        if((this.currentPage - 1) > 0 ) {
            this.switchPage(this.currentPage - 1);
        }
    }

    public nextPage(){
        if((this.currentPage + 1) <= this.pages.length){
            this.switchPage(this.currentPage + 1);
        }
    }

    public buttonDisplay(num: number):boolean{

        var numInDirection = ((this.maxPageButtons-1)/2)+1;

        if((this.currentPage - numInDirection) < num){
            if((this.currentPage + numInDirection) > num){
                return true;
            }
        }

        return false;
    }

    public sortTable(sortOn: number) {

        if (this.columnHeaders[sortOn].sortable) {
            //console.log("Table Sorted by: " + sortOn);
            var rows, switching, i, row1, row2, shouldSwitch;

            switching = true;

            if (this.numbered) {
                sortOn += 1;
            }

            if (this.sortedBy == sortOn) {
                this.reversed = !this.reversed;
            } else {
                this.reversed = false;
            }


            while (switching) {
                switching = false;
                rows = this.tableData.nativeElement.getElementsByTagName("tr");

                for (i = 0; i < (rows.length - 1); i++) {
                    shouldSwitch = false;

                    row1 = rows[i].getElementsByTagName("td")[sortOn];
                    row2 = rows[i + 1].getElementsByTagName("td")[sortOn];


                    if (this.reversed) {
                        if (isNaN(row1.innerHTML) && isNaN(row2.innerHTML)) {
                            if (row1.innerHTML.toLowerCase() < row2.innerHTML.toLowerCase()) {
                                shouldSwitch = true;
                            }
                        } else if (Number(row1.innerHTML) < Number(row2.innerHTML)) {
                            shouldSwitch = true;
                        }
                    } else {
                        if (isNaN(row1.innerHTML) && isNaN(row2.innerHTML)) {
                            if (row1.innerHTML.toLowerCase() > row2.innerHTML.toLowerCase()) {
                                shouldSwitch = true;
                            }
                        } else if (Number(row1.innerHTML) > Number(row2.innerHTML)) {
                            shouldSwitch = true;
                        }
                    }

                    if (shouldSwitch) {
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            }


            this.sortedBy = sortOn;

            if (this.paginated) {
                this.displayPages();
                this.setColumnWidths();
            }
        }
    }



}
