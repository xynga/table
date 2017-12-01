import { NgModule } from "@angular/core";
import { TableComponent } from "./table-component/table.component";
import { CommonModule } from "@angular/common";
import { GeneralModule } from "xynga-general/general/inline"

@NgModule({
    declarations: [
        TableComponent
    ],
    imports: [
        CommonModule,
        GeneralModule
    ],
    exports: [
        TableComponent
    ],
    providers: []
})
export class TablesModule {}
