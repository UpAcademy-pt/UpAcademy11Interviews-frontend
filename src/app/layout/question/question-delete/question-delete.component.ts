import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { QuestionApiService } from 'src/app/core';


@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html',
  styleUrls: ['./question-delete.component.scss']
})
export class QuestionDeleteComponent implements OnInit {
  
  id: number;
  
  constructor(
    private questionApi: QuestionApiService,
    public bsModalRef: BsModalRef

  ) { }

  ngOnInit() {
  }

  public deleteQuestion() {
        this.questionApi.delete(this.id).subscribe((data) => {
        this.bsModalRef.hide()
      },
      (error) => {
      }
      );
    }
  }

