import { Component, HostListener, Input, ViewChild } from '@angular/core';
var SELECTOR = 'ui-table';
var ColumnHeader = (function () {
    function ColumnHeader(name, sortable) {
        this.name = name;
        this.sortable = sortable;
    }
    ;
    return ColumnHeader;
}());
export { ColumnHeader };
var TableComponent = (function () {
    function TableComponent() {
        this.scrollable = false;
        this.paginated = false;
        this.sortedBy = -1;
        this.reversed = false;
        this.perPage = 5;
        this.pages = [];
        this.currentPage = 1;
        this.maxPageButtons = 5; // this number should be odd
    }
    TableComponent.prototype.ngOnInit = function () {
        this.numColumns = this.columnHeaders.length;
        if (this.numbered) {
            this.numColumns += 1;
        }
    };
    TableComponent.prototype.ngAfterViewInit = function () {
        this.styleTable();
        if (this.paginated) {
            this.displayPages();
        }
        this.setColumnWidths();
    };
    TableComponent.prototype.ngAfterContentInit = function () {
        if (this.paginated) {
            this.pagesSetup();
        }
    };
    TableComponent.prototype.onResize = function () {
        this.setColumnWidths();
    };
    TableComponent.prototype.styleTable = function () {
        this.childCount = this.tableHeader.nativeElement.childElementCount;
        var bodyChildren = this.tableData.nativeElement.getElementsByTagName('td');
        var headerChildren = this.tableHeader.nativeElement.getElementsByTagName('td');
        for (var i = 0; i < bodyChildren.length; i++) {
            bodyChildren[i].style.border = "1px solid dimgrey";
            bodyChildren[i].style.padding = "8px";
            bodyChildren[i].style.textAlign = "left";
        }
        for (var i = 0; i < headerChildren.length; i++) {
            headerChildren[i].style.border = "1px solid dimgrey";
            headerChildren[i].style.padding = "8px";
            headerChildren[i].style.textAlign = "left";
            if (this.columnHeaders[i].sortable) {
                headerChildren[i].style.background = "url('') no-repeat";
                headerChildren[i].style.backgroundSize = "20px 20px";
                headerChildren[i].style.backgroundPosition = "right";
            }
        }
    };
    TableComponent.prototype.setColumnWidths = function () {
        this.childCount = this.tableHeader.nativeElement.childElementCount;
        var bodyChildren, headerChildren, tbody;
        bodyChildren = this.tableData.nativeElement.getElementsByTagName('tbody').item(0).getElementsByTagName('tr').item((this.currentPage - 1) * this.perPage).getElementsByTagName('td');
        tbody = this.tableData.nativeElement.getElementsByTagName('tbody').item(0);
        headerChildren = this.tableHeader.nativeElement.getElementsByTagName('td');
        for (var i = 0; i < bodyChildren.length; i++) {
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
    };
    TableComponent.prototype.pagesSetup = function () {
        var rowChildren = this.tableData.nativeElement.getElementsByTagName('tr');
        this.calculateNumPages(rowChildren.length, this.perPage);
    };
    TableComponent.prototype.calculateNumPages = function (rows, perPage) {
        console.log(Math.ceil(rows / perPage));
        var pages = (Math.ceil(rows / perPage));
        var arr = Array.apply(null, Array(pages));
        this.pages = arr.map(function (x, i) { return i + 1; });
    };
    TableComponent.prototype.displayPages = function () {
        var bodyChildren = this.tableData.nativeElement.getElementsByTagName('tr');
        for (var i = 0; i < bodyChildren.length; i++) {
            if (i > (((this.currentPage - 1) * this.perPage) - 1) && i < this.currentPage * this.perPage) {
                bodyChildren[i].style.setProperty("display", "table-row");
            }
            else {
                bodyChildren[i].style.setProperty("display", "none");
            }
        }
    };
    TableComponent.prototype.switchPage = function (num) {
        this.currentPage = num;
        this.displayPages();
        this.setColumnWidths();
    };
    TableComponent.prototype.prevPage = function () {
        if ((this.currentPage - 1) > 0) {
            this.switchPage(this.currentPage - 1);
        }
    };
    TableComponent.prototype.nextPage = function () {
        if ((this.currentPage + 1) <= this.pages.length) {
            this.switchPage(this.currentPage + 1);
        }
    };
    TableComponent.prototype.buttonDisplay = function (num) {
        var numInDirection = ((this.maxPageButtons - 1) / 2) + 1;
        if ((this.currentPage - numInDirection) < num) {
            if ((this.currentPage + numInDirection) > num) {
                return true;
            }
        }
        return false;
    };
    TableComponent.prototype.sortTable = function (sortOn) {
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
    };
    TableComponent.decorators = [
        { type: Component, args: [{
                    selector: SELECTOR,
                    template: "\n\n\n      <div class=\"table-container\" style=\"border: solid dimgray 2px;\">\n        <div>\n          <table>\n            <tr class=\"table-header\" #header>\n\n              <td *ngIf=\"numbered\" (click)=\"sortTable(-1)\">#</td>\n              <td *ngFor=\"let header of columnHeaders, let i=index\" (click)=\"sortTable(i)\">\n                {{header.name}}\n                <div *ngIf=\"header.sortable\" style=\"float:right\">\n                  <icon icon=\"col-toggle\"></icon>\n                </div>\n              </td>\n            </tr>\n          </table>\n        </div>\n\n        <div class=\"table-data\"\n             [ngStyle]=\"{'max-height.px':maxHeight}\"\n             [ngClass]=\"{'scrollable':scrollable , 'paginated':paginated, 'standard':(!scrollable && !paginated)}\">\n          <table #tableData>\n            <ng-content></ng-content>\n          </table>\n        </div>\n      </div>\n\n      <br>\n      <div *ngIf=\"paginated\" style=\"text-align: center\">\n        <button [disabled]=\"currentPage == 1\" type=\"button\" (click)=\"switchPage(1)\">first</button>\n        <button [disabled]=\"currentPage == 1\" type=\"button\" (click)=\"prevPage()\">prev</button>\n        <div *ngFor=\"let page of pages,let i = index\" style=\"display: inline;\">\n          <button *ngIf=\"buttonDisplay(page)\" [disabled]=\"currentPage == page\" type=\"button\" (click)=\"switchPage(page)\">{{page}}</button>\n        </div>\n        <button [disabled]=\"currentPage == pages.length\" type=\"button\" (click)=\"nextPage()\">next</button>\n        <button [disabled]=\"currentPage == pages.length\" type=\"button\" (click)=\"switchPage(pages.length)\">last</button>\n      </div>\n    ",
                    styles: ["\n      *{box-sizing:border-box}.paginated{overflow-y:hidden}.scrollable{overflow-y:auto}.standard{overflow:hidden}div.table-data{background:whitesmoke;position:relative}tr.table-header{background:darkgray}table{table-layout:fixed;border-collapse:collapse;width:100%}th,td{border:1px solid dimgrey;text-align:left;padding:8px}\n    "] //This CSS is necessary for the tables to display properly
                },] },
    ];
    /** @nocollapse */
    TableComponent.ctorParameters = function () { return []; };
    TableComponent.propDecorators = {
        'columnHeaders': [{ type: Input },],
        'numbered': [{ type: Input },],
        'maxHeight': [{ type: Input },],
        'scrollable': [{ type: Input },],
        'paginated': [{ type: Input },],
        'tableHeader': [{ type: ViewChild, args: ['header',] },],
        'tableData': [{ type: ViewChild, args: ['tableData',] },],
        'perPage': [{ type: Input },],
        'maxPageButtons': [{ type: Input },],
        'onResize': [{ type: HostListener, args: ['window:resize',] },],
    };
    return TableComponent;
}());
export { TableComponent };
//# sourceMappingURL=table.component.js.map