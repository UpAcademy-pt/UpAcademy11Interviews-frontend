import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { DataService } from 'src/app/core';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';


@Component({
  selector: 'app-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  styleUrls: ['./attribute-edit.component.scss']
})
export class AttributeEditComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  attribute: Attribute = new Attribute();
  attributeValue : AttributeValue = new AttributeValue();
  attributeValues : AttributeValue[] = [];

  id: number;

  constructor(
    public dataService: DataService,
    public attributeApi: AttributeApiService,
    public attributeValueApi: AttributeValueApiService,
    public bsModalRef: BsModalRef) { 
      this.attributeValue.value = "";
    }

  ngOnInit() {
    this.attributeApi.get(this.id).subscribe((attribute: Attribute) => {
      console.log(attribute);
      this.attribute = attribute;
      this.attributeValueApi.getByAttribute(this.attribute.category).subscribe((attributeValues: AttributeValue[]) => {
        this.attributeValues = attributeValues;
        console.log(attributeValues);
      });
      });
  }

  public edit() {
      this.attributeApi.update(this.id, this.attribute).subscribe(
        (data) => {
          this.dataService.updateAttributes();
          this.bsModalRef.hide()
        },
        (error) => {
        }
      );
  }
}