import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { MainComponent } from './main/main.component';
import { QuestionComponent } from './question/question.component';
import { AccountComponent } from './account/account.component';
import { QuestionDetailComponent } from './question/question-detail/question-detail.component';
import { InterviewComponent } from './interview/interview.component';
import { InterviewResultsComponent } from './interview-results/interview-results.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', component: MainComponent
      },
      {
        path: 'question', component: QuestionComponent
      },
      {
        path: 'question/:id', component: QuestionDetailComponent
      },
      {
        path: 'account', component: AccountComponent
      },
      {
        path: 'interview', component: InterviewComponent
      },
      {
        path: 'interview-results', component: InterviewResultsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
