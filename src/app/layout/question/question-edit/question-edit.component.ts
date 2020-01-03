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
  attribute : Attribute = new Attribute();
  attributeValue : AttributeValue = new AttributeValue();

  attributes : Attribute[] = [];
  attributeValues : AttributeValue[] = [];
  id;

  constructor(
    public attributeApi : AttributeApiService,
    private questionApi: QuestionApiService,
    private attributeValueApi : AttributeValueApiService,
    public bsModalRef: BsModalRef
  ) {
    this.question.question = "";
    this.question.answer = "";
    this.attribute.category = "";
    this.attributeValue.value = "";
   }

   public editQuestion() {
    /* this.question.attributes.push('attributeValue.value'); */
    console.log('entrei');
    
     this.questionApi.update(this.id, this.question).subscribe(
      (data) => {
        console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
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
}
