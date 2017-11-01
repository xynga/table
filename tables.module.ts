import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { ColumnHeader } from "./table/table.component";
import {CommonModule} from "@angular/common";
import {GeneralModule} from "xynga-general"

@NgModule({
    declarations: [
        TableComponent,
        ColumnHeader
    ],
    imports: [
        CommonModule,
        GeneralModule
    ],
    exports: [
        TableComponent,
        ColumnHeader
    ],
    providers: []
})
export class TablesModule {}
