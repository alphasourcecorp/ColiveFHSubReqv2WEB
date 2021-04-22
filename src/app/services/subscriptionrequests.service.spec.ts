import { TestBed } from '@angular/core/testing';

import { SubscriptionRequestsService } from './subscriptionrequests.service';

describe('SubscriptionrequestsService', () => {
  let service: SubscriptionRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
