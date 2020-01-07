import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';

@Component({
  selector: 'app-generate-interview',
  templateUrl: './generate-interview.component.html',
  styleUrls: ['./generate-interview.component.scss']
})
export class GenerateInterviewComponent implements OnInit {


  Roles: AttributeValue[] = [];
  Role = '';
  activeImg = 0;
  constructor(
    public bsModalRef: BsModalRef,
    public attributeValueApi: AttributeValueApiService
  ) { }

  ngOnInit() {

    this.attributeValueApi.getByAttribute('Role').subscribe((data: AttributeValue[]) => {
      this.Roles = data;
    });

  }



  public createInterview() {
    this.bsModalRef.hide()
  }

  prevSlide() {
    if (this.activeImg == 0) {
      this.activeImg = 1; //length-1
    }
    else {
      this.activeImg--;
    }
  }

  nextSlide() {
    if (this.activeImg == 1) {//length-1
      this.activeImg = 0;
    }
    else {
      this.activeImg++;
    }
  }

}
