/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Seller_FormComponent } from './Seller_Form.component';

describe('Seller_FormComponent', () => {
  let component: Seller_FormComponent;
  let fixture: ComponentFixture<Seller_FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Seller_FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Seller_FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
