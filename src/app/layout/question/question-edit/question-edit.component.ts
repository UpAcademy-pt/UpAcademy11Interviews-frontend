import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Question, QuestionApiService } from 'src/app/core';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';
import { QuestionComponent } from '../question.component';

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
  attribute: Attribute = new Attribute();
  attributeValue: AttributeValue = new AttributeValue();
  attributes: Attribute[] = [];
  attributeValues: AttributeValue[] = [];
  selectedValues: AttributeValue[] = [];
  attributeValuesString: Set<String> = new Set<String>();
  selectedValuesString: Set<String> = new Set<String>();

  filteredValues: AttributeValue[] = [];

  attributesString: Set<String> = new Set<String>();

  id: number;
  empty = false;
  questionComponent: QuestionComponent;

  isInvalid = false;

  constructor(
    public attributeApi: AttributeApiService,
    private questionApi: QuestionApiService,
    private attributeValueApi: AttributeValueApiService,
    public bsModalRef: BsModalRef
  ) {
  }

  public editQuestion() {
    if (this.question.question == '') {
      this.isInvalid = true;
    } else {
      this.selectedValuesString.forEach(element => {
        let index = this.attributeValues.findIndex((attr: any) => attr.value == element);
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
  }


  ngOnInit() {
    console.log(this.id);

    this.questionApi.get(this.id).subscribe((data: Question) => {
      console.log(data);
      this.question.question = data.question;
      this.question.answer = data.answer;
      this.question.attributes = data.attributes;

      this.question.attributes.forEach(attribute => {
        this.selectedValuesString.add(attribute.value);
      });

      this.attribute.category = "";
      this.attributeValue.value = "";

    })

    this.attributeApi.getAll().subscribe(
      (response: Attribute[]) => {
        this.attributes = response;
        console.log(this.attributes);


        let done = false;


        this.attributeValueApi.getAll().subscribe(
          (response: AttributeValue[]) => {
            this.attributeValues = response;
            console.log(this.attributeValues);
            console.log(this.attributes);
            console.log(this.selectedValuesString);

            this.attributes.forEach(attribute => {
              this.attributesString.add(attribute.category);
            });

            this.selectedValuesString.forEach(element => {
              let index = this.attributeValues.findIndex((attr: any) => attr.value == element);
              this.attributesString.delete(this.attributeValues[index].attribute['category']);
            });


            if (this.attributesString.size == 0) {
              this.empty = true;
            }
          });
      },
      (error) => console.log(error)
    )
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
    this.attributeValueApi.get(id).subscribe((data: AttributeValue) => {
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
    let index = this.attributeValues.findIndex((attr: any) => attr.value == str);
    this.attributesString.add(this.attributeValues[index].attribute['category']);

    if (this.attributesString.size != 0) {
      this.empty = false;
    }
  }
}
