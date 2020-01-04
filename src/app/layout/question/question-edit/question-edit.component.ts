import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Question, QuestionApiService } from 'src/app/core';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { AttributeValue } from 'src/app/core/models/attribute-value';
import { AttributeValueApiService } from 'src/app/core/services/attribute-value-service';

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
  attributes: Set<Attribute> = new Set<Attribute>();
  attributeValues: AttributeValue[] = [];
  selectedValues: AttributeValue[] = [];
  attributeValuesString: Set<String> = new Set<String>();
  selectedValuesString: Set<String> = new Set<String>();

  filteredValues: AttributeValue[] = [];

  id: number;


  constructor(
    public attributeApi: AttributeApiService,
    private questionApi: QuestionApiService,
    private attributeValueApi: AttributeValueApiService,
    public bsModalRef: BsModalRef
  ) {
  }

  public editQuestion() {
    console.log(this.selectedValuesString);
    this.selectedValuesString.forEach(element => {
      let index = this.attributeValues.findIndex((attr: any) => attr.value == element);
      this.selectedValues.push(this.attributeValues[index]);
      console.log(this.selectedValues);
      
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
      (response: Set<Attribute>) => {
        this.attributes = response;
        console.log(this.attributes);
      },
      (error) => console.log(error)
    )
    this.attributeValueApi.getAll().subscribe(
      (response: AttributeValue[]) => {
        this.attributeValues = response;
        console.log(this.attributeValues);
      },
      (error) => console.log(error)
    )
  }

  getAttributeValues() {
    this.attributeValueApi.getByAttribute(this.attributeOption).subscribe(
      (response: AttributeValue[]) => {
        this.filteredValues = response;

        this.filteredValues.forEach((attributeValue: AttributeValue) => {
          if (this.selectedValuesString.has(attributeValue.value) != true) {
            this.attributeValuesString.add(attributeValue.value);
          }
        });
        console.log(this.getAttributeValues);
        console.log(this.filteredValues);
      },
      (error) => console.log(error)
    )
  }

  addAttributeValue(value: String) {
    this.selectedValuesString.add(value);
    this.attributeValuesString.delete(value);
  }

  remove(value: String) {
    this.attributeValuesString.add(value);
    this.selectedValuesString.delete(value);
  }
}
