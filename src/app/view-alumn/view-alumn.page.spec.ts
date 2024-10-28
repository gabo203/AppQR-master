import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAlumnPage } from './view-alumn.page';

describe('ViewAlumnPage', () => {
  let component: ViewAlumnPage;
  let fixture: ComponentFixture<ViewAlumnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAlumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
