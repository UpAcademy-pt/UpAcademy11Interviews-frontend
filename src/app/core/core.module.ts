import { NgModule, ModuleWithProviders } from '@angular/core';

import { DataService, QuestionApiService, AccountApiService } from './services';

@NgModule({})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        DataService,
        QuestionApiService,
        AccountApiService
      ]
    };
  }
}
