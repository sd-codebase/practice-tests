import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { QuestionContainerComponent } from './components/question-container/question-container.component';
import { VerifyQuestionsContainerComponent } from './components/verify-questions-container/verify-questions-container.component';
import { CoreModule } from '@core/core.module';
import { TestModule } from '@modules/user/test/test.module';
import { NotesEditorComponent } from './components/notes-editor/notes-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpService } from '@components/http.service';
import { DrawerService } from '@components/drawer-service';
import { LoaderService } from '@components/loader.service';
import { NotificationService } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';
import { ConfigureMockTestsComponent } from './components/configure-mock-tests/configure-mock-tests.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    ComponentsModule,
    TestModule,
    CKEditorModule,
  ],
  exports: [
    QuestionContainerComponent,
    VerifyQuestionsContainerComponent,
    NotesEditorComponent,
    ConfigureMockTestsComponent,
  ],
  declarations: [
    QuestionContainerComponent,
    VerifyQuestionsContainerComponent,
    NotesEditorComponent,
    ConfigureMockTestsComponent,
  ],
  providers: [
    HttpService,
    DrawerService,
    LoaderService,
    NotificationService,
    StorageService,
  ],
})
export class AdminModule {}
