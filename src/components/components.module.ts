import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { CoreModule } from '@core/core.module';
import { XlsxToJsonUploadComponent } from './xlsx-to-json-upload/xlsx-to-json-upload.component';
import { HttpService } from './http.service';
import { LoaderComponent } from './loader/loader.component';
import { TimePipe } from './pipes/time.pipe';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NotificationBarComponent, NotificationService } from './notifications.service';
import { ComingSoonComponent } from '@pages/coming-soon/coming-soon.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DrawerService } from './drawer-service';
import { LoaderService } from './loader.service';
import { StorageService } from './storage.serice';

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
  providers : [
    HttpService,
    DrawerService,
    LoaderService,
    NotificationService,
    StorageService,
  ],
  entryComponents: [NotificationBarComponent]
})
export class ComponentsModule { }
