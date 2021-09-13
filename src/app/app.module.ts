import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscribeModule } from '@ngneat/subscribe';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SubscribeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
