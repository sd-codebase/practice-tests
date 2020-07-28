import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { CoreModule } from '@core/core.module';
import { TestModule } from '@modules/user/test/test.module';
import { ComponentsModule } from '@components/components.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminModule } from '@modules/admin/admin.module';

import { HttpService } from '@components/http.service';
import { DrawerService } from '@components/drawer-service';
import { LoaderService } from '@components/loader.service';
import { NotificationService } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TestModule,
    ComponentsModule,
    AdminModule
  ],
  exports: [
    AdminDashboardComponent,
    UserDashboardComponent,
  ],
  declarations: [
    AdminDashboardComponent,
    UserDashboardComponent,
    HomeComponent,
  ],
  providers: [
    HttpService,
    DrawerService,
    LoaderService,
    NotificationService,
    StorageService,
  ],
})
export class PagesModule { }
