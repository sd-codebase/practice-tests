import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { QuestionComponent } from './components/question/question.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { TestStatisticsComponent } from './components/test-statistics/test-statistics.component';
import { QuestionPalleteComponent } from './components/question-pallete/question-pallete.component';
import { StatementComponent } from './components/question/statement/statement.component';
import { TestsListComponent } from './components/tests-list/tests-list.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    CreateTestComponent,
    TestsListComponent,
  ],
  declarations: [
    CreateTestComponent,
    QuestionComponent,
    QuizComponent,
    TestStatisticsComponent,
    QuestionPalleteComponent,
    StatementComponent,
    TestsListComponent,
  ],
})
export class TestModule { }
