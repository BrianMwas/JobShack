import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QModalComponent } from './q-modal.component';

describe('QModalComponent', () => {
  let component: QModalComponent;
  let fixture: ComponentFixture<QModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
