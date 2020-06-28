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
import { MyTestsComponent } from './user/my-tests/my-tests.component';
import { TestAnswerKeyComponent } from './user/test-answer-key/test-answer-key.component';
import { TestAttemptComponent } from './user/test-attempt/test-attempt.component';
import { ProfileComponent } from './user/profile/profile.component';
import { StartTestsContainerComponent } from './user/start-tests-container/start-tests-container.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ViewQuestionsComponent } from './admin/view-questions/view-questions.component';
import { AdminModule } from '@modules/admin/admin.module';
import { VerifyQuestionsComponent } from './admin/verify-questions/verify-questions.component';
import { ImportSolvedPapersComponent } from './admin/import-solved-papers/import-solved-papers.component';
import { SolvedPapersComponent } from './user/solved-papers/solved-papers.component';

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
    TestComponent
  ],
  declarations: [
    AdminDashboardComponent,
    UserDashboardComponent,
    TestComponent,
    ImportQuestionsComponent,
    ValidateMathExpressionComponent,
    HomeComponent,
    MyTestsComponent,
    TestAnswerKeyComponent,
    TestAttemptComponent,
    ProfileComponent,
    StartTestsContainerComponent,
    ComingSoonComponent,
    ViewQuestionsComponent,
    VerifyQuestionsComponent,
    ImportSolvedPapersComponent,
    SolvedPapersComponent,
  ]
})
export class PagesModule { }
