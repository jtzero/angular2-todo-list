import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// import { ENV_PROVIDERS } from '../environment';
import { AppComponent } from './app.component';
import { TodoListModule } from './todo-list';

@NgModule({
            bootstrap: [ AppComponent ],
            declarations: [
              AppComponent
            ],
            imports: [
              BrowserModule,
              HttpModule,
              TodoListModule
            ],
            providers: [
            ]
          })
export class AppModule {}
