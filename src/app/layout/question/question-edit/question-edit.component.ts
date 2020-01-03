import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Question, QuestionApiService } from 'src/app/core';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})

export class QuestionEditComponent {

  public question: Question = new Question();
  public event: EventEmitter<any> = new EventEmitter();
  attributeOption = '';
  attributeValueOption = '';
  attribute : Attribute = new Attribute();
  attributeValue : AttributeValue = new AttributeValue();

  attributes : Set<Attribute> = new Set<Attribute>();
  id: number;

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
    public attributeApi : AttributeApiService,
    private questionApi: QuestionApiService,
    private attributeValueApi : AttributeValueApiService,
    public bsModalRef: BsModalRef
  ) {
   }

   public editQuestion() {

    this.selectedValuesString.forEach(element => {
      let index= this.attributeValues.findIndex((attr: any) => attr.value == element);
      this.selectedValues.push(this.attributeValues[index]);
    });

      this.question.attributes = this.selectedValues; 
     this.questionApi.update(this.id, this.question).subscribe(
      (data) => {
        this.bsModalRef.hide()
      },
      (error) => {
      }
    );
  }

  
  ngOnInit() {
    console.log(this.id);
    
    this.questionApi.get(this.id).subscribe((data:Question) => {
      console.log(data);
      this.question.question = data.question;
      this.question.answer = data.answer;
      this.attribute.category = "";
      this.attributeValue.value = "";
    })
    this.attributeApi.getAll().subscribe(
      (response : Set<Attribute>) => {
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

    // this.attributeValueApi.get(id).subscribe((data: AttributeValue) => {
    //   this.attributeValue = data;
    //   let index = this.attributeValues.findIndex((attr: any) => attr.id == id);
    //   console.log(index);

      this.selectedValuesString.add(value);

      this.attributeValuesString.delete(value);
    //});
  }

  remove(value: String) {
    // const index = this.selectedValues.indexOf(value);

    // if (index >= 0) {

      this.attributeValuesString.add(value);

      this.selectedValuesString.delete(value);

    //}
  }
}
