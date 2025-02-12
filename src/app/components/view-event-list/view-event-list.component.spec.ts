import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventListComponent } from './view-event-list.component';

describe('ViewEventListComponent', () => {
  let component: ViewEventListComponent;
  let fixture: ComponentFixture<ViewEventListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEventListComponent]
    });
    fixture = TestBed.createComponent(ViewEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
