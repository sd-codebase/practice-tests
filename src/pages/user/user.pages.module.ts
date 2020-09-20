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
import { SyllabusNotesComponent } from './syllabus-notes/syllabus-notes.component';
import { UserModule } from '@modules/user/user.module';

import { HttpService } from '@components/http.service';
import { DrawerService } from '@components/drawer-service';
import { LoaderService } from '@components/loader.service';
import { NotificationService } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/interceptors/ErrorInterceptor';
import { ProgressComponent } from './progress/progress.component';
import { DashboardWidgetPageComponent } from './dashboard-widget-page/dashboard-widget-page.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { AvailableCoursesService } from '@components/AvailableCoursesService';

@NgModule({
    imports: [
      CommonModule,
      CoreModule,
      TestModule,
      ComponentsModule,
      UsersRoutingModule,
      UserModule,
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
      SyllabusNotesComponent,
      ProgressComponent,
      DashboardWidgetPageComponent,
      AccountVerificationComponent,
    ],
    providers: [
      HttpService,
      DrawerService,
      LoaderService,
      NotificationService,
      StorageService,
      AvailableCoursesService,
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
  })
export class UserPagesModule { }
