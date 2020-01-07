import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-generate-interview',
  templateUrl: './generate-interview.component.html',
  styleUrls: ['./generate-interview.component.scss']
})
export class GenerateInterviewComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  public createInterview() {
    this.bsModalRef.hide()
  }

 
}
