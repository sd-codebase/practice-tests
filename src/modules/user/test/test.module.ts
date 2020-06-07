import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { QuestionComponent } from './components/question/question.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { TestStatisticsComponent } from './components/test-statistics/test-statistics.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    CreateTestComponent,
  ],
  declarations: [
    CreateTestComponent,
    QuestionComponent,
    QuizComponent,
    TestStatisticsComponent,
  ]
})
export class TestModule { }
