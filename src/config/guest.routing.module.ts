import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComingSoonComponent } from '@pages/coming-soon/coming-soon.component';
import { GuestAttemptTestComponent } from '@pages/guest/components/test/test.component';

const routes: Routes = [
    {path: '', component: ComingSoonComponent},
    {path: 'tests', component: GuestAttemptTestComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuestRoutingModule { }
