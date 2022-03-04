import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailedComponent } from './products-detailed.component';

describe('ProductsDetailedComponent', () => {
  let component: ProductsDetailedComponent;
  let fixture: ComponentFixture<ProductsDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
