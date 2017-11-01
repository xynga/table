import {AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';

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
    templateUrl: './table.component.html',
    styleUrls:['./table.component.css'] //This CSS is necessary for the tables to display properly
})
export class TableComponent implements OnInit, AfterViewInit, AfterContentInit{
    @Input() public columnHeaders: ColumnHeader[];
    @Input() public numbered: boolean;
    @Input() public maxHeight: number; // Value corresponds to number of pixels
    @Input() public scrollable: boolean = false;
    @Input() public paginated: boolean = false;


    @ViewChild('header') tableHeader: ElementRef;
    @ViewChild('tableData') tableData: ElementRef;
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
        this.pages = arr.map((x, i)=>i+1);
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
