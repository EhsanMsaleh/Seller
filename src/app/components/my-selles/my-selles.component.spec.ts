import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySellesComponent } from './my-selles.component';

describe('MySellesComponent', () => {
  let component: MySellesComponent;
  let fixture: ComponentFixture<MySellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySellesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
