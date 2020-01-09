import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Question, QuestionApiService } from 'src/app/core';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';
import { QuestionComponent } from '../question.component';

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

  attributes: Attribute[] = [];

  attributeValues: AttributeValue[] = [];

  selectedValues: AttributeValue[] = [];

  selectedValuesString: Set<String> = new Set<String>();

  attributesString: Set<String> = new Set<String>();  

  filteredValues: AttributeValue[] = [];

  empty = false;

  questionComponent : QuestionComponent;


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
          this.bsModalRef.hide()
        },
        (error) => {
        }
      );
  }

  onKeyUp(event){
    console.log(event.target.value);
    
  }

  ngOnInit() {
    this.attributeApi.getAll().subscribe(
      (response: Attribute[]) => {
        this.attributes = response;
        console.log(this.attributes);
        this.attributes.forEach(attribute => {
          this.attributesString.add(attribute.category)
        });
      },
      (error) => console.log(error)
    )

    this.attributeValueApi.getAll().subscribe(
      (response: AttributeValue[]) => {
        this.attributeValues = response;
        console.log(this.attributeValues);
      },
      (error) => console.log(error))
  }

  getAttributeValues() {
    console.log(this.attributeOption);
    
    this.attributeValueApi.getByAttribute(this.attributeOption).subscribe(
      (response: AttributeValue[]) => {
        this.filteredValues = response;
        console.log(this.attributeValues);
        console.log(this.attributeOption);
      },
      (error) => console.log(error)
    )
  }

  addAttributeValue(id: number) {
    this.attributeValueApi.get(id).subscribe( (data : AttributeValue) =>{
      let attributeValue = data;
      this.selectedValuesString.add(attributeValue.value);
      this.attributesString.delete(attributeValue.attribute['category']);
      this.attributeOption = '';
    });

    if (this.attributesString.size == 1) {
      this.empty = true;
    }
  }

  remove(str: string) {
      this.selectedValuesString.delete(str);
      let index= this.attributeValues.findIndex((attr: any) => attr.value == str);
      this.attributesString.add(this.attributeValues[index].attribute['category']);

      if (this.attributesString.size != 0) {
        this.empty = false;
      }
  }

}
