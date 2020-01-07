import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NguiMapModule } from '@ngui/map';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent } from './layout.component';
import { MainComponent } from './main/main.component';
import { QuestionComponent } from './question/question.component';
import { QuestionDetailComponent } from './question/question-detail/question-detail.component';
import { QuestionNewComponent } from './question/question-new/question-new.component';
import { AccountComponent } from './account/account.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SidebarModule } from 'ng-sidebar/lib/sidebar.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { QuestionEditComponent } from './question/question-edit/question-edit.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { InterviewComponent } from './interview/interview.component';
import { AttributeNewComponent } from './question/attribute-new/attribute-new.component';

@NgModule({
  declarations: [
    MainComponent,
    QuestionComponent,
    QuestionDetailComponent,
    QuestionNewComponent,
    AccountComponent,
    LayoutComponent,
    QuestionEditComponent,
    AccountEditComponent,
    AttributeNewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule,
    TranslateModule,
    FormsModule,
    SidebarModule,
    NgxDatatableModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBDW7tXXUvwCFeGZl3FRqUzTKAlUH8OF3Q' })
  ],
  entryComponents: [QuestionNewComponent, QuestionEditComponent, AccountEditComponent, AttributeNewComponent]
})
export class LayoutModule { }
