import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Question, QuestionApiService } from 'src/app/core';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.scss']
})
export class QuestionNewComponent {

  public question: Question = new Question();
  public event: EventEmitter<any> = new EventEmitter();
  attributeOption = '';
  attributeValueOption = '';
  attribute: Attribute = new Attribute();
  attributeValue: AttributeValue = new AttributeValue();

  attributes: Set<Attribute> = new Set<Attribute>();

  attributeValues: AttributeValue[] = [];

  selectedValues: AttributeValue[] = [];

  attributeValuesString: Set<String> = new Set<String>();

  selectedValuesString: Set<String> = new Set<String>();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public attributeApi: AttributeApiService,
    private questionApi: QuestionApiService,
    private attributeValueApi: AttributeValueApiService,
    public bsModalRef: BsModalRef
  ) {
    this.question.question = "";
    this.question.answer = "";
    this.question.attributes = [];

    this.attribute.category = "";

    this.attributeValue.value = "";
    this.attributeValue.attribute = null;
  }

  public create() {

    this.selectedValuesString.forEach(element => {
      let index= this.attributeValues.findIndex((attr: any) => attr.value == element);
      this.selectedValues.push(this.attributeValues[index]);
    });

    this.question.attributes = this.selectedValues;
    console.log(this.question.attributes);
    console.log(this.question);

    this.questionApi.create(this.question).subscribe(
      (data) => {
        console.log(data);
        this.bsModalRef.hide()
      },
      (error) => {
      }
    );
  }

  ngOnInit() {
    this.attributeApi.getAll().subscribe(
      (response: Set<Attribute>) => {
        this.attributes = response;
        console.log(this.attributes);
      },
      (error) => console.log(error)
    )
  }

  getAttributeValues() {
    this.attributeValueApi.getByAttribute(this.attributeOption).subscribe(
      (response: AttributeValue[]) => {
        this.attributeValues = response;
        
        this.attributeValues.forEach((attributeValueString : AttributeValue) => {
          this.attributeValuesString.add(attributeValueString.value);
        }); 

        console.log(this.attributeValues);
      },
      (error) => console.log(error)
    )
  }

  addAttributeValue(value: String) {
    //console.log(id);
    console.log(this.attributeValues);

    //this.attributeValueApi.get(id).subscribe((data: AttributeValue) => {
      //this.attributeValue = data;
      //let index = this.attributeValues.findIndex((attr: any) => attr.id == id);
      //console.log(index);

      this.attributeValuesString.delete(value);
      this.selectedValuesString.add(value);
    //});
  }

  remove(value: String) {
    //const index = this.selectedValues.indexOf(value);

    //if (index >= 0) {
      this.selectedValuesString.delete(value);

      this.attributeValuesString.add(value);

    //}
  }


}
