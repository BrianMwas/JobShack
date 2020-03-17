import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationlistComponent } from './applicationlist.component';

describe('ApplicationlistComponent', () => {
  let component: ApplicationlistComponent;
  let fixture: ComponentFixture<ApplicationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
