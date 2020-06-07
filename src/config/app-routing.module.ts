import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '@pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '@pages/user/user-dashboard/user-dashboard.component';
import { TestComponent } from '@pages/user/test/test.component';
import { ImportQuestionsComponent } from '@pages/admin/import-questions/import-questions.component';
import { ValidateMathExpressionComponent } from '@pages/admin/validate-math-expression/validate-math-expression.component';


const routes: Routes = [
  { path: '', component: AdminDashboardComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminDashboardComponent,
    children: [
      {path: 'import-questions', component: ImportQuestionsComponent},
      {path: 'validate-maths-expressions', component: ValidateMathExpressionComponent},
    ],
  },
  {
    path: 'user', component: UserDashboardComponent,
    children: [
      {path: 'test', component: TestComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
