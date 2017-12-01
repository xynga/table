import { NgModule } from "@angular/core";
import { TableComponent } from "./table-component/table.component";
import { CommonModule } from "@angular/common";
import { GeneralModule } from "xynga-general/general/inline";
var TablesModule = (function () {
    function TablesModule() {
    }
    TablesModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    TablesModule.ctorParameters = function () { return []; };
    return TablesModule;
}());
export { TablesModule };
//# sourceMappingURL=tables.module.js.map