import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { CoreModule } from '@core/core.module';
import { TestModule } from '@modules/user/test/test.module';
import { ComponentsModule } from '@components/components.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminModule } from '@modules/admin/admin.module';

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
  ]
})
export class PagesModule { }
