import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,          // Eager loaded since we may need to go here right away as browser loads based on router user enters
    AppRoutingModule,
    CoreModule,          // Singleton objects (services, components that are loaded only once)
    SharedModule        // shared (multi-instance) objects
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
