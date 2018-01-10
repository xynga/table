import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TablesModule} from 'xynga-table';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
