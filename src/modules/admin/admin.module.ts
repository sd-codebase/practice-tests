import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { QuestionContainerComponent } from './components/question-container/question-container.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    QuestionContainerComponent,
  ],
  declarations: [
    QuestionContainerComponent,
  ],
})
export class AdminModule {}
