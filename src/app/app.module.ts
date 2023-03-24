import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddItemComponent } from './components/add-item.component';
import { ListItemsComponent } from './components/list-items.component';

@NgModule({
  declarations: [
    AppComponent,
    AddItemComponent,
    ListItemsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
