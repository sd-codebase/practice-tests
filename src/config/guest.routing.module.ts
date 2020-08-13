import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComingSoonComponent } from '@pages/coming-soon/coming-soon.component';
import { GuestAttemptTestComponent } from '@pages/guest/components/test/test.component';
import { TestAttemptComponent } from '@pages/user/test-attempt/test-attempt.component';
import { TestAnswerKeyComponent } from '@pages/user/test-answer-key/test-answer-key.component';

const routes: Routes = [
    {path: '', component: ComingSoonComponent},
    {path: 'tests', component: GuestAttemptTestComponent},
    {path: 'test-answer-key/:testId', component: TestAnswerKeyComponent},
    {path: 'attempt-test/:testId', component: TestAttemptComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuestRoutingModule { }
