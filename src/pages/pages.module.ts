import { NgModule } from '@angular/core';
import { TestComponent } from './user/test/test.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { CoreModule } from '@core/core.module';
import { TestModule } from '@modules/user/test/test.module';
import { ComponentsModule } from '@components/components.module';
import { CommonModule } from '@angular/common';
import { ImportQuestionsComponent } from './admin/import-questions/import-questions.component';
import { ValidateMathExpressionComponent } from './admin/validate-math-expression/validate-math-expression.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TestModule,
    ComponentsModule
  ],
  exports: [
    AdminDashboardComponent,
    UserDashboardComponent,
    TestComponent
  ],
  declarations: [
    AdminDashboardComponent,
    UserDashboardComponent,
    TestComponent,
    ImportQuestionsComponent,
    ValidateMathExpressionComponent,
    HomeComponent,
  ]
})
export class PagesModule { }
