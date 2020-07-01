import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestModule } from '@modules/user/test/test.module';
import { ComponentsModule } from '@components/components.module';
import { AdminModule } from '@modules/admin/admin.module';
import { ImportQuestionsComponent } from './import-questions/import-questions.component';
import { ValidateMathExpressionComponent } from './validate-math-expression/validate-math-expression.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { VerifyQuestionsComponent } from './verify-questions/verify-questions.component';
import { ImportSolvedPapersComponent } from './import-solved-papers/import-solved-papers.component';
import { CoreModule } from '@core/core.module';
import { AdminsRoutingModule } from '@config/admins.routing.module';
import { AnimateContentComponent } from './animate-content/animate-content.component';

@NgModule({
    imports: [
      CommonModule,
      CoreModule,
      TestModule,
      ComponentsModule,
      AdminModule,
      AdminsRoutingModule,
    ],
    exports: [
    ],
    declarations: [
      ImportQuestionsComponent,
      ValidateMathExpressionComponent,
      ViewQuestionsComponent,
      VerifyQuestionsComponent,
      ImportSolvedPapersComponent,
      AnimateContentComponent,
    ]
  })
export class AdminPagesModule { }
