import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComingSoonComponent } from '@pages/coming-soon/coming-soon.component';
import { AddUsersComponent } from '@pages/instructor/components/add-users/add-users.component';
import { SetTestComponent } from '@pages/instructor/components/set-test/set-test.component';
import { ReportsComponent } from '@pages/instructor/components/reports/reports.component';
import { InstructorProfileComponent } from '@pages/instructor/components/profile/profile.component';

const routes: Routes = [
    {path: '', component: ComingSoonComponent},
    {path: 'profile', component: InstructorProfileComponent},
    {path: 'users', component: AddUsersComponent},
    {path: 'tests', component: SetTestComponent},
    {path: 'reports', component: ReportsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IntructorRoutingModule { }
