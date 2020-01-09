import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-interview-delete',
  templateUrl: './interview-delete.component.html',
  styleUrls: ['./interview-delete.component.scss']
})
export class InterviewDeleteComponent implements OnInit {

  id: number;
  /* public bsModalRef: BsModalRef */
  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  deleteQuestion() {
    this.bsModalRef.hide()
    /* this.interviewApi.delete(this.id).subscribe((data) => {
      
    },
    (error) => {
    }
    ); */
  }
}

