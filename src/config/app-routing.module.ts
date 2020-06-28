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
import { TestAnswerKeyComponent } from '@pages/user/test-answer-key/test-answer-key.component';
import { TestAttemptComponent } from '@pages/user/test-attempt/test-attempt.component';
import { ProfileComponent } from '@pages/user/profile/profile.component';
import { StartTestsContainerComponent } from '@pages/user/start-tests-container/start-tests-container.component';
import { ComingSoonComponent } from '@pages/coming-soon/coming-soon.component';
import { ViewQuestionsComponent } from '@pages/admin/view-questions/view-questions.component';
import { AdminAuthGuard } from 'src/auth/admin.auth.guard';
import { VerifyQuestionsComponent } from '@pages/admin/verify-questions/verify-questions.component';
import { ImportSolvedPapersComponent } from '@pages/admin/import-solved-papers/import-solved-papers.component';
import { SolvedPapersComponent } from '@pages/user/solved-papers/solved-papers.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [ AdminAuthGuard ],
    children: [
      {path: '', component: ComingSoonComponent},
      {path: 'view-questions', component: ViewQuestionsComponent},
      {path: 'import-questions', component: ImportQuestionsComponent},
      {path: 'import-predefined-test', component: ImportSolvedPapersComponent},
      {path: 'validate-maths-expressions', component: ValidateMathExpressionComponent},
      {path: 'verify-questions', component: VerifyQuestionsComponent},
    ],
  },
  {
    path: 'user', component: UserDashboardComponent, canActivate: [ AuthGuard],
    children: [
      {path: '', component: ComingSoonComponent},
      {path: 'coming-soon', component: ComingSoonComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'solved-papers', component: SolvedPapersComponent},
      {path: 'test', component: TestComponent},
      {path: 'my-tests', component: MyTestsComponent},
      {path: 'start-taking-test', component: StartTestsContainerComponent},
      {path: 'test-answer-key/:testId', component: TestAnswerKeyComponent},
      {path: 'attempt-test/:testId', component: TestAttemptComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
