import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleReviewPage } from './single-review.page';

describe('SingleReviewPage', () => {
  let component: SingleReviewPage;
  let fixture: ComponentFixture<SingleReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
