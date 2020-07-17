import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComingSoonComponent } from '@pages/coming-soon/coming-soon.component';
import { ProfileComponent } from '@pages/user/profile/profile.component';
import { SolvedPapersComponent } from '@pages/user/solved-papers/solved-papers.component';
import { TestComponent } from '@pages/user/test/test.component';
import { MyTestsComponent } from '@pages/user/my-tests/my-tests.component';
import { StartTestsContainerComponent } from '@pages/user/start-tests-container/start-tests-container.component';
import { TestAnswerKeyComponent } from '@pages/user/test-answer-key/test-answer-key.component';
import { TestAttemptComponent } from '@pages/user/test-attempt/test-attempt.component';
import { SyllabusNotesComponent } from '@pages/user/syllabus-notes/syllabus-notes.component';

const routes: Routes = [
    {path: '', component: ComingSoonComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'syllabus', component: SyllabusNotesComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'solved-papers', component: SolvedPapersComponent},
    {path: 'test', component: TestComponent},
    {path: 'my-tests', component: MyTestsComponent},
    {path: 'start-taking-test', component: StartTestsContainerComponent},
    {path: 'test-answer-key/:testId', component: TestAnswerKeyComponent},
    {path: 'attempt-test/:testId', component: TestAttemptComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
