import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListOfRestaurantTestPage } from './list-of-restaurant-test.page';

describe('ListOfRestaurantTestPage', () => {
  let component: ListOfRestaurantTestPage;
  let fixture: ComponentFixture<ListOfRestaurantTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfRestaurantTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfRestaurantTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
