import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterFirstLoginComponent } from './after-first-login.component';

describe('AfterFirstLoginComponent', () => {
  let component: AfterFirstLoginComponent;
  let fixture: ComponentFixture<AfterFirstLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterFirstLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterFirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
