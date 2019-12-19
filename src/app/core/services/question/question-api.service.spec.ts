import { TestBed } from '@angular/core/testing';

import { QuestionApiService } from './question-api.service';

describe('QuestionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionApiService = TestBed.get(QuestionApiService);
    expect(service).toBeTruthy();
  });
});
