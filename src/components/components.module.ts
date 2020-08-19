import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { CoreModule } from '@core/core.module';
import { XlsxToJsonUploadComponent } from './xlsx-to-json-upload/xlsx-to-json-upload.component';
import { LoaderComponent } from './loader/loader.component';
import { TimePipe } from './pipes/time.pipe';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NotificationBarComponent, NotificationService } from './notifications.service';
import { ComingSoonComponent } from '@pages/coming-soon/coming-soon.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    MathjaxComponent,
    XlsxToJsonUploadComponent,
    LoaderComponent,
    TimePipe,
    PageHeaderComponent,
    NotificationBarComponent,
    ComingSoonComponent,
    AutocompleteComponent,
    DialogBoxComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    MathjaxComponent,
    XlsxToJsonUploadComponent,
    LoaderComponent,
    TimePipe,
    PageHeaderComponent,
    ComingSoonComponent,
    AutocompleteComponent,
  ],
  entryComponents: [
    NotificationBarComponent,
    DialogBoxComponent
  ]
})
export class ComponentsModule { }
