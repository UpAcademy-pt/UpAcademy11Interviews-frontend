import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Question, QuestionApiService } from 'src/app/core';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

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
  attribute : Attribute = new Attribute();
  attributeValue : AttributeValue = new AttributeValue();

  attributes : Attribute[] = [];
  attributeValues : AttributeValue[] = [];
  
  constructor(
    public attributeApi : AttributeApiService,
    private questionApi: QuestionApiService,
    private attributeValueApi : AttributeValueApiService,
    public bsModalRef: BsModalRef
  ) {
    this.question.question = "";
    this.question.answer = "";
    this.question.attributes  = [];

    this.attribute.category = "";

    this.attributeValue.value = "";
    this.attributeValue.attribute = null;
  }

/*   triggerEvent() {
    this.event.emit(this.question);
  } */

  public create() {
    /* this.question.attributes.push('attributeValue.value'); */
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
      (response : Attribute[]) => {
        this.attributes = response;
        console.log(this.attributes);
      },
      (error) => console.log(error)
      )
  }

  getAttributeValues() {
    this.attributeValueApi.getByAttribute(this.attributeOption).subscribe(
      (response : AttributeValue[]) => {
        this.attributeValues = response;
        console.log(this.attributeValues);
      },
      (error) => console.log(error)
      )
  }

  addAttributeValue(id: number) {
    console.log(id);
    this.attributeValueApi.get(id).subscribe((data : AttributeValue)=>
      {
        this.attributeValue = data;
        this.question.attributes.push(this.attributeValue);
        console.log(this.question.attributes);
        console.log(this.question);
      });
  }



    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    fruits: Fruit[] = [
      {name: 'Lemon'},
      {name: 'Lime'},
      {name: 'Apple'},
    ];
  
    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
  
      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push({name: value.trim()});
      }
  
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  
    remove(fruit: Fruit): void {
      const index = this.fruits.indexOf(fruit);
  
      if (index >= 0) {
        this.fruits.splice(index, 1);
      }
    }


}
