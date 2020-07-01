import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComingSoonComponent } from '@pages/coming-soon/coming-soon.component';
import { ViewQuestionsComponent } from '@pages/admin/view-questions/view-questions.component';
import { ImportQuestionsComponent } from '@pages/admin/import-questions/import-questions.component';
import { ImportSolvedPapersComponent } from '@pages/admin/import-solved-papers/import-solved-papers.component';
import { ValidateMathExpressionComponent } from '@pages/admin/validate-math-expression/validate-math-expression.component';
import { VerifyQuestionsComponent } from '@pages/admin/verify-questions/verify-questions.component';
import { AnimateContentComponent } from '@pages/admin/animate-content/animate-content.component';

const routes: Routes = [
    {path: '', component: ComingSoonComponent},
    {path: 'view-questions', component: ViewQuestionsComponent},
    {path: 'import-questions', component: ImportQuestionsComponent},
    {path: 'import-predefined-test', component: ImportSolvedPapersComponent},
    {path: 'validate-maths-expressions', component: ValidateMathExpressionComponent},
    {path: 'verify-questions', component: VerifyQuestionsComponent},
    {path: 'animate-content', component: AnimateContentComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminsRoutingModule { }
