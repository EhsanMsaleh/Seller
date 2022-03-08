/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotActiveComponent } from './NotActive.component';

describe('NotActiveComponent', () => {
  let component: NotActiveComponent;
  let fixture: ComponentFixture<NotActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
