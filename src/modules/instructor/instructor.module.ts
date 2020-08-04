import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { HttpService } from '@components/http.service';
import { DrawerService } from '@components/drawer-service';
import { LoaderService } from '@components/loader.service';
import { NotificationService } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserGroupsComponent } from './components/user-groups/user-groups.component';

@NgModule({
    imports: [
      CoreModule,
      CommonModule,
      ComponentsModule,
    ],
    declarations: [
      UsersListComponent,
      UserGroupsComponent,
    ],
    exports: [
      UsersListComponent,
    ],
    providers: [
        HttpService,
        DrawerService,
        LoaderService,
        NotificationService,
        StorageService,
    ],
    entryComponents: [ UserGroupsComponent ]
})
export class InstructorModule { }
