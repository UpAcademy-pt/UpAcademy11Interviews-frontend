import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap';

import { Product } from 'src/app/core/models/product';


@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent {

  public product: Product = new Product();
  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    public bsModalRef: BsModalRef
  ) {
    this.product.text = 0;
    this.product.value = 0;
   
  }

  triggerEvent() {
    this.event.emit(this.product);
  }

}
