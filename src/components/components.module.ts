import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { CoreModule } from '@core/core.module';
import { XlsxToJsonUploadComponent } from './xlsx-to-json-upload/xlsx-to-json-upload.component';
import { HttpService } from './http.service';
import { GlobalService } from './mathjax/global.service';
import { LoaderComponent } from './loader/loader.component';
import { TimePipe } from './pipes/time.pipe';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NotificationBarComponent } from './notifications.service';

@NgModule({
  declarations: [
    MathjaxComponent,
    XlsxToJsonUploadComponent,
    LoaderComponent,
    TimePipe,
    PageHeaderComponent,
    NotificationBarComponent,
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    MathjaxComponent,
    XlsxToJsonUploadComponent,
    LoaderComponent,
    TimePipe,
    PageHeaderComponent,
  ],
  providers : [
    HttpService,
    GlobalService,
  ],
  entryComponents: [NotificationBarComponent]
})
export class ComponentsModule { }
