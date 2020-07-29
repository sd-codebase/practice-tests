import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ConfigModule } from '@config/config.module';
import { CoreModule } from '@core/core.module';
import { ComponentsModule } from '@components/components.module';
import { PagesModule } from '@pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from '@components/loader.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ConfigModule,
    CoreModule,
    ComponentsModule,
    PagesModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    LoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
