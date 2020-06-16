import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '@pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '@pages/user/user-dashboard/user-dashboard.component';
import { TestComponent } from '@pages/user/test/test.component';
import { ImportQuestionsComponent } from '@pages/admin/import-questions/import-questions.component';
import { ValidateMathExpressionComponent } from '@pages/admin/validate-math-expression/validate-math-expression.component';
import { AuthGuard } from 'src/auth/auth.guard';
import { HomeComponent } from '@pages/home/home.component';
import { MyTestsComponent } from '@pages/user/my-tests/my-tests.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminDashboardComponent,
    children: [
      {path: 'import-questions', component: ImportQuestionsComponent},
      {path: 'validate-maths-expressions', component: ValidateMathExpressionComponent},
    ],
  },
  {
    path: 'user', component: UserDashboardComponent, canActivate: [ AuthGuard],
    children: [
      {path: 'test', component: TestComponent},
      {path: 'my-tests', component: MyTestsComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
