import { Component, OnInit } from '@angular/core';
import { AccountApiService } from 'src/app/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {

  id: number;

  constructor(
    public bsModalRef: BsModalRef,
    public accountApi: AccountApiService
  ) { }

  ngOnInit() {
  }

  public deleteAccount() {
    this.accountApi.delete(this.id).subscribe((data) => {
    this.bsModalRef.hide()
  },
  (error) => {
  }
  );
}
}
