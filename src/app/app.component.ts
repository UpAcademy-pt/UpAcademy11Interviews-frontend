import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountApiService } from './core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    translate: TranslateService,

    private router: Router,
    private accountApi: AccountApiService
  ) {
    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('pt');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'en');
  }

  public logout() {
    this.accountApi.logout();
    this.router.navigate(['']);
  }

}
