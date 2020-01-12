import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InterviewApiService } from 'src/app/core/services/interview-service';
import { Interview } from 'src/app/core/models/interview';
import { InterviewModelApiService } from 'src/app/core/services/interview-template-service';
import { Question } from 'src/app/core';
import { InterviewModel } from 'src/app/core/models/interview-template';


@Component({
  selector: 'app-interview-load',
  templateUrl: './interview-load.component.html',
  styleUrls: ['./interview-load.component.scss']
})
export class InterviewLoadComponent implements OnInit {

  interview: Interview = new Interview();
  interviews: Interview[] = [];
  interviewModels : InterviewModel[] = [];
  selectedTemplateId : Number;

  @Output() templateSelect = new EventEmitter<Object>();

  constructor(
    public interviewModelApi: InterviewModelApiService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.interviewModelApi.getAll().subscribe((data: InterviewModel[]) => {
      this.interviewModels = data;
      console.log(this.interviewModels);
    });
  }

  createInterview() {
    let template = this.interviewModels.find(interviewModel => interviewModel.id == this.selectedTemplateId);
    console.log(template);
    this.templateSelect.emit(template);
    this.bsModalRef.hide();
  }
}
