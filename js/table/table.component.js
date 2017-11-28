"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const SELECTOR = 'ui-table';
class ColumnHeader {
    constructor(name, sortable) {
        this.name = name;
        this.sortable = sortable;
    }
    ;
}
exports.ColumnHeader = ColumnHeader;
let TableComponent = class TableComponent {
    constructor() {
        this.scrollable = false;
        this.paginated = false;
        this.sortedBy = -1;
        this.reversed = false;
        this.perPage = 5;
        this.pages = [];
        this.currentPage = 1;
        this.maxPageButtons = 5; // this number should be odd
    }
    ngOnInit() {
        this.numColumns = this.columnHeaders.length;
        if (this.numbered) {
            this.numColumns += 1;
        }
    }
    ngAfterViewInit() {
        this.styleTable();
        if (this.paginated) {
            this.displayPages();
        }
        this.setColumnWidths();
    }
    ngAfterContentInit() {
        if (this.paginated) {
            this.pagesSetup();
        }
    }
    onResize() {
        this.setColumnWidths();
    }
    styleTable() {
        this.childCount = this.tableHeader.nativeElement.childElementCount;
        let bodyChildren = this.tableData.nativeElement.getElementsByTagName('td');
        let headerChildren = this.tableHeader.nativeElement.getElementsByTagName('td');
        for (let i = 0; i < bodyChildren.length; i++) {
            bodyChildren[i].style.border = "1px solid dimgrey";
            bodyChildren[i].style.padding = "8px";
            bodyChildren[i].style.textAlign = "left";
        }
        for (let i = 0; i < headerChildren.length; i++) {
            headerChildren[i].style.border = "1px solid dimgrey";
            headerChildren[i].style.padding = "8px";
            headerChildren[i].style.textAlign = "left";
            if (this.columnHeaders[i].sortable) {
                headerChildren[i].style.background = "url('') no-repeat";
                headerChildren[i].style.backgroundSize = "20px 20px";
                headerChildren[i].style.backgroundPosition = "right";
            }
        }
    }
    setColumnWidths() {
        this.childCount = this.tableHeader.nativeElement.childElementCount;
        let bodyChildren, headerChildren, tbody;
        bodyChildren = this.tableData.nativeElement.getElementsByTagName('tbody').item(0).getElementsByTagName('tr').item((this.currentPage - 1) * this.perPage).getElementsByTagName('td');
        tbody = this.tableData.nativeElement.getElementsByTagName('tbody').item(0);
        headerChildren = this.tableHeader.nativeElement.getElementsByTagName('td');
        for (let i = 0; i < bodyChildren.length; i++) {
            if (i != bodyChildren.length - 1) {
                headerChildren[i].style.setProperty("width", (bodyChildren[i].clientWidth + 1) + "px"); //All the boxes show up as 1 px short
            }
            else if (this.scrollable && ((tbody.offsetHeight + headerChildren[0].offsetHeight) > this.maxHeight)) {
                headerChildren[i].style.setProperty("width", (bodyChildren[i].clientWidth + 18) + "px"); //The last box accounts for the 17px scroll bar
            }
            else {
                headerChildren[i].style.setProperty("width", (bodyChildren[i].clientWidth + 1) + "px"); //The last box accounts for the 17px scroll bar
            }
        }
    }
    pagesSetup() {
        let rowChildren = this.tableData.nativeElement.getElementsByTagName('tr');
        this.calculateNumPages(rowChildren.length, this.perPage);
    }
    calculateNumPages(rows, perPage) {
        console.log(Math.ceil(rows / perPage));
        var pages = (Math.ceil(rows / perPage));
        var arr = Array.apply(null, Array(pages));
        this.pages = arr.map((x, i) => i + 1);
    }
    displayPages() {
        let bodyChildren = this.tableData.nativeElement.getElementsByTagName('tr');
        for (let i = 0; i < bodyChildren.length; i++) {
            if (i > (((this.currentPage - 1) * this.perPage) - 1) && i < this.currentPage * this.perPage) {
                bodyChildren[i].style.setProperty("display", "table-row");
            }
            else {
                bodyChildren[i].style.setProperty("display", "none");
            }
        }
    }
    switchPage(num) {
        this.currentPage = num;
        this.displayPages();
        this.setColumnWidths();
    }
    prevPage() {
        if ((this.currentPage - 1) > 0) {
            this.switchPage(this.currentPage - 1);
        }
    }
    nextPage() {
        if ((this.currentPage + 1) <= this.pages.length) {
            this.switchPage(this.currentPage + 1);
        }
    }
    buttonDisplay(num) {
        var numInDirection = ((this.maxPageButtons - 1) / 2) + 1;
        if ((this.currentPage - numInDirection) < num) {
            if ((this.currentPage + numInDirection) > num) {
                return true;
            }
        }
        return false;
    }
    sortTable(sortOn) {
        if (this.columnHeaders[sortOn].sortable) {
            //console.log("Table Sorted by: " + sortOn);
            var rows, switching, i, row1, row2, shouldSwitch;
            switching = true;
            if (this.numbered) {
                sortOn += 1;
            }
            if (this.sortedBy == sortOn) {
                this.reversed = !this.reversed;
            }
            else {
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
                        }
                        else if (Number(row1.innerHTML) < Number(row2.innerHTML)) {
                            shouldSwitch = true;
                        }
                    }
                    else {
                        if (isNaN(row1.innerHTML) && isNaN(row2.innerHTML)) {
                            if (row1.innerHTML.toLowerCase() > row2.innerHTML.toLowerCase()) {
                                shouldSwitch = true;
                            }
                        }
                        else if (Number(row1.innerHTML) > Number(row2.innerHTML)) {
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
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TableComponent.prototype, "columnHeaders", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TableComponent.prototype, "numbered", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TableComponent.prototype, "maxHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TableComponent.prototype, "scrollable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TableComponent.prototype, "paginated", void 0);
__decorate([
    core_1.ViewChild('header'),
    __metadata("design:type", core_1.ElementRef)
], TableComponent.prototype, "tableHeader", void 0);
__decorate([
    core_1.ViewChild('tableData'),
    __metadata("design:type", core_1.ElementRef)
], TableComponent.prototype, "tableData", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TableComponent.prototype, "perPage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TableComponent.prototype, "maxPageButtons", void 0);
__decorate([
    core_1.HostListener('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TableComponent.prototype, "onResize", null);
TableComponent = __decorate([
    core_1.Component({
        selector: SELECTOR,
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.css'] //This CSS is necessary for the tables to display properly
    })
], TableComponent);
exports.TableComponent = TableComponent;
