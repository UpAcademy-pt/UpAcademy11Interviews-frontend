import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';

@Component({
  selector: 'app-attribute-new',
  templateUrl: './attribute-new.component.html',
  styleUrls: ['./attribute-new.component.scss']
})
export class AttributeNewComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  attribute: Attribute = new Attribute();

  constructor(
    public attributeApi: AttributeApiService,
    public bsModalRef: BsModalRef
  ) {
    this.attribute.category = "";
  }

  ngOnInit() {
  }

  public create() {
      this.attributeApi.create(this.attribute).subscribe(
        (data) => {
          this.bsModalRef.hide()
        },
        (error) => {
        }
      );
  }
}
