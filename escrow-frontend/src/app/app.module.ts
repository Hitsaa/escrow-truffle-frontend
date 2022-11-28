import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeAppFactory } from './app.initializer';
import { ClientModule } from './client/client.module';
import { DeveloperModule } from './developer/developer.module';
import { HitsaTokenModule } from './hitsa-token/hitsa-token.module';
import { HomeComponent } from './home/home.component';
import { ProjectModule } from './project/project.module';
import { Web3UtilsModule } from './web3-utils/web3-utils.module';
import { Web3Service } from './web3-utils/web3.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClientModule,
    DeveloperModule,
    ProjectModule,
    HttpClientModule,
    HitsaTokenModule,
    Web3UtilsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [Web3Service],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
