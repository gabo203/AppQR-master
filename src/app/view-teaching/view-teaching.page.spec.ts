import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTeachingPage } from './view-teaching.page';

describe('ViewTeachingPage', () => {
  let component: ViewTeachingPage;
  let fixture: ComponentFixture<ViewTeachingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeachingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
