import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountApiService, DataService } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public name: string;
  constructor(
    private translate: TranslateService,
    private modalService: BsModalService,
    private dataService: DataService,
    private router: Router,
    private accountApi: AccountApiService
  ) {
    this.name = accountApi.getCurrentName();
  }

  ngOnInit() { }

  public logout() {
    this.accountApi.logout();
    this.router.navigate(['/login']);
  }

  

}

