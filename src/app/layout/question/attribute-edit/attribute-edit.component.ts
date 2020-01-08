import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { DataService } from 'src/app/core';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';
import { ReplaySubject, Subscription } from 'rxjs';


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
  attributeValues$ : ReplaySubject<AttributeValue[]>;

  id: number;

  private subscriptionAttributeValues: Subscription;

  constructor(
    public dataService: DataService,
    public attributeApi: AttributeApiService,
    public attributeValueApi: AttributeValueApiService,
    public bsModalRef: BsModalRef) { 
      this.attributeValue.value = "";
      this.attributeValue.attribute = {};

      // this.attributeValues$ = this.dataService.attributeValues$;
      // this.subscriptionAttributeValues = this.attributeValues$.subscribe((data) => {
      //   console.log('attributeValues$ on AttributeEditComponent', JSON.stringify(data));
      //   this.attributeValues = data;
      // });
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

  public updateAttributeValues(){
    this.attributeValueApi.getByAttribute(this.attribute.category).subscribe((attributeValues: AttributeValue[]) => {
      this.attributeValues = attributeValues;
      console.log(attributeValues);
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

  public createAttributeValue () {
    Object.assign(this.attributeValue.attribute, this.attribute);
    this.attributeValueApi.create(this.attributeValue).subscribe(
      (data : AttributeValue) => {
        this.updateAttributeValues();
        this.attributeValues.push(data);
      },
      (error) => {
      }
    );
  }

  public deleteAttributeValue(id : number) {
    this.attributeValueApi.delete(id).subscribe(
      (data) => {
        console.log(data);
        
        this.updateAttributeValues();

        let index = this.attributeValues.findIndex(attr => attr.id == id);
        this.attributeValues.splice(index, 1);
      },
      (error) => {
        console.log(error);
        
      }
    );
  }
}