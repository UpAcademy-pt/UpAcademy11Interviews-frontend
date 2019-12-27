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

@NgModule({
  declarations: [
    MainComponent,
    QuestionComponent,
    QuestionDetailComponent,
    QuestionNewComponent,
    AccountComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule,
    TranslateModule,
    FormsModule,
    SidebarModule,
    NgxDatatableModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBDW7tXXUvwCFeGZl3FRqUzTKAlUH8OF3Q' })
  ],
  entryComponents: [QuestionNewComponent]
})
export class LayoutModule { }
