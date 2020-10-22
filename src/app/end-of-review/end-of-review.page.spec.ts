import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EndOfReviewPage } from './end-of-review.page';

describe('EndOfReviewPage', () => {
  let component: EndOfReviewPage;
  let fixture: ComponentFixture<EndOfReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndOfReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EndOfReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
