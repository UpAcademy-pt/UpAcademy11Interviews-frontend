import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { DataService } from 'src/app/core';

@Component({
  selector: 'app-attribute-new',
  templateUrl: './attribute-new.component.html',
  styleUrls: ['./attribute-new.component.scss']
})
export class AttributeNewComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  attribute: Attribute = new Attribute();
  
  isInvalid = false;

  constructor(
    public dataService: DataService,
    public attributeApi: AttributeApiService,
    public bsModalRef: BsModalRef
  ) {
    this.attribute.category = "";
  }

  ngOnInit() {
  }

  public create() {
    if (this.attribute.category == '') {
      this.isInvalid = true;
    } else {
      this.attributeApi.create(this.attribute).subscribe(
        (data) => {
          this.dataService.updateAttributes();
          this.bsModalRef.hide();
        },
        (error) => {
        }
      );
    }
  }
}
