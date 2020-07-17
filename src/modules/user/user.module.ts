import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { SyllabusAndNotesComponent } from './components/syllabus-and-notes/syllabus-and-notes.component';

@NgModule({
    imports: [
      CoreModule,
      CommonModule,
      ComponentsModule,
    ],
    declarations: [
        SyllabusAndNotesComponent,
    ],
    exports: [
        SyllabusAndNotesComponent,
    ],
    providers: [],
})
export class UserModule { }
