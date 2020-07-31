import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '@components/http.service';
import { DrawerService } from '@components/drawer-service';
import { LoaderService } from '@components/loader.service';
import { NotificationService } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/interceptors/ErrorInterceptor';
import { CoreModule } from '@core/core.module';
import { ComponentsModule } from '@components/components.module';
import { GuestAttemptTestComponent } from './components/test/test.component';
import { GuestRoutingModule } from '@config/guest.routing.module';

@NgModule({
  declarations: [
    GuestAttemptTestComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ComponentsModule,
    GuestRoutingModule,
  ],
  providers: [
    HttpService,
    DrawerService,
    LoaderService,
    NotificationService,
    StorageService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class GuestPagesModule { }
