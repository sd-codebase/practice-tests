import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestModule } from '@modules/user/test/test.module';
import { ComponentsModule } from '@components/components.module';
import { TestComponent } from './test/test.component';
import { MyTestsComponent } from './my-tests/my-tests.component';
import { TestAnswerKeyComponent } from './test-answer-key/test-answer-key.component';
import { TestAttemptComponent } from './test-attempt/test-attempt.component';
import { ProfileComponent } from './profile/profile.component';
import { StartTestsContainerComponent } from './start-tests-container/start-tests-container.component';
import { CoreModule } from '@core/core.module';
import { UsersRoutingModule } from '@config/users.routing.module';
import { SolvedPapersComponent } from './solved-papers/solved-papers.component';


@NgModule({
    imports: [
      CommonModule,
      CoreModule,
      TestModule,
      ComponentsModule,
      UsersRoutingModule,
    ],
    exports: [
      TestComponent
    ],
    declarations: [
      TestComponent,
      MyTestsComponent,
      TestAnswerKeyComponent,
      TestAttemptComponent,
      ProfileComponent,
      StartTestsContainerComponent,
      SolvedPapersComponent,
    ]
  })
export class UserPagesModule { }
