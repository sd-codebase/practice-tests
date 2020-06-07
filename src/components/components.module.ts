import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { CoreModule } from '@core/core.module';
import { XlsxToJsonUploadComponent } from './xlsx-to-json-upload/xlsx-to-json-upload.component';

@NgModule({
  declarations: [
    MathjaxComponent,
    XlsxToJsonUploadComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    MathjaxComponent,
    XlsxToJsonUploadComponent,
  ]
})
export class ComponentsModule { }
