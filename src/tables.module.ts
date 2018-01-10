import { NgModule } from "@angular/core";
import { TableComponent } from "./table-component/table.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        TableComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TableComponent
    ],
    providers: []
})
export class TablesModule {}
