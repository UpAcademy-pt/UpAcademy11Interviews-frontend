import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-interview-submit',
  templateUrl: './interview-submit.component.html',
  styleUrls: ['./interview-submit.component.scss']
})
export class InterviewSubmitComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef

  ) { }

  ngOnInit() {
  }

}
