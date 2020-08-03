import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { SetTestComponent } from './components/set-test/set-test.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HttpService } from '@components/http.service';
import { DrawerService } from '@components/drawer-service';
import { LoaderService } from '@components/loader.service';
import { NotificationService } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/interceptors/ErrorInterceptor';
import { IntructorRoutingModule } from '@config/instructor.routing.module';
import { CoreModule } from '@core/core.module';
import { ComponentsModule } from '@components/components.module';
import { InstructorProfileComponent } from './components/profile/profile.component';
import { InstructorModule } from '@modules/instructor/instructor.module';



@NgModule({
  declarations: [
    AddUsersComponent,
    SetTestComponent,
    ReportsComponent,
    InstructorProfileComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ComponentsModule,
    IntructorRoutingModule,
    InstructorModule,
  ],
  providers: [
    HttpService,
    DrawerService,
    LoaderService,
    NotificationService,
    StorageService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class InstructorPagesModule { }
