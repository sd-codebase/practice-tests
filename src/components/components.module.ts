import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { CoreModule } from '@core/core.module';
import { XlsxToJsonUploadComponent } from './xlsx-to-json-upload/xlsx-to-json-upload.component';
import { HttpService } from './http.service';
import { GlobalService } from './mathjax/global.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    MathjaxComponent,
    XlsxToJsonUploadComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    MathjaxComponent,
    XlsxToJsonUploadComponent,
    LoaderComponent,
  ],
  providers : [
    HttpService,
    GlobalService,
  ],
})
export class ComponentsModule { }