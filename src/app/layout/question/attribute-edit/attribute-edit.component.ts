import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Attribute } from 'src/app/core/models/attribute';
import { AttributeApiService } from 'src/app/core/services/attribute-service';
import { DataService } from 'src/app/core';


@Component({
  selector: 'app-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  styleUrls: ['./attribute-edit.component.scss']
})
export class AttributeEditComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  attribute: Attribute = new Attribute();

  id: number;

  constructor(
    public dataService: DataService,
    public attributeApi: AttributeApiService,
    public bsModalRef: BsModalRef) { 
      this.attribute.category = "";
    }

  ngOnInit() {
    this.attributeApi.get(this.id).subscribe((data: Attribute) => {
      console.log(data);
      this.attribute.category = data.category;
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