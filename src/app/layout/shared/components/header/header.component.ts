import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AccountApiService } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public name: string;
  constructor(
    private router: Router,
    private translate: TranslateService,

    private accountApi: AccountApiService
  ) {
    this.name = accountApi.getCurrentName();
  }

  ngOnInit() { }


  changeLang(lang: string) {
    this.translate.use(lang);
  }
  public logout() {
    this.accountApi.logout();
    this.router.navigate(['/login']);
  }

}
