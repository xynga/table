import { AfterContentInit, AfterViewInit, ElementRef, OnInit } from '@angular/core';
export declare class ColumnHeader {
    name: string;
    sortable?: boolean;
    constructor(name: string, sortable?: boolean);
}
export declare class TableComponent implements OnInit, AfterViewInit, AfterContentInit {
    columnHeaders: ColumnHeader[];
    numbered: boolean;
    maxHeight: number;
    scrollable: boolean;
    paginated: boolean;
    tableHeader: ElementRef;
    tableData: ElementRef;
    childCount: number;
    numColumns: number;
    sortedBy: number;
    reversed: boolean;
    perPage: number;
    pages: number[];
    currentPage: number;
    maxPageButtons: number;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    onResize(): void;
    styleTable(): void;
    setColumnWidths(): void;
    pagesSetup(): void;
    calculateNumPages(rows: number, perPage: number): void;
    displayPages(): void;
    switchPage(num: number): void;
    prevPage(): void;
    nextPage(): void;
    buttonDisplay(num: number): boolean;
    sortTable(sortOn: number): void;
}
