import { TranslateService } from '@ngx-translate/core';


import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap';

import { Product } from 'src/app/core';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent {

  public product: Product = new Product();
  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    private translate: TranslateService,

    public bsModalRef: BsModalRef
  ) {
    this.product.iva = 1 ;
    this.product.pvp = 1 ;
    this.product.discount = 1 ;
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  triggerEvent() {
    this.event.emit(this.product);
  }

}
