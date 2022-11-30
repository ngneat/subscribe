import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscribeDirective } from '@ngneat/subscribe';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SubscribeDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
