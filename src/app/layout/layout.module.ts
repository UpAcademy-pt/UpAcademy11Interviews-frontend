import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent } from './layout.component';
import { MainComponent } from './main/main.component';
import { QuestionComponent } from './question/question.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent,
    QuestionComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    
  ],
  entryComponents: []
})
export class LayoutModule { }
