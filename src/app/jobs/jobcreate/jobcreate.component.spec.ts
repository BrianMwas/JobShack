import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcreateComponent } from './jobcreate.component';

describe('JobcreateComponent', () => {
  let component: JobcreateComponent;
  let fixture: ComponentFixture<JobcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
