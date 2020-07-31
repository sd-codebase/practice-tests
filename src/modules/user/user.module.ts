import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { SyllabusAndNotesComponent } from './components/syllabus-and-notes/syllabus-and-notes.component';
import { HttpService } from '@components/http.service';
import { DrawerService } from '@components/drawer-service';
import { LoaderService } from '@components/loader.service';
import { NotificationService } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';
import { MyProgressComponent } from './components/my-progress/my-progress.component';

@NgModule({
    imports: [
      CoreModule,
      CommonModule,
      ComponentsModule,
    ],
    declarations: [
        SyllabusAndNotesComponent,
        MyProgressComponent,
    ],
    exports: [
        SyllabusAndNotesComponent,
        MyProgressComponent,
    ],
    providers: [
        HttpService,
        DrawerService,
        LoaderService,
        NotificationService,
        StorageService,
    ],
})
export class UserModule { }
