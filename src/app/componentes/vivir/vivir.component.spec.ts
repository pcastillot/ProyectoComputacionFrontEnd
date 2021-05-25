import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VivirComponent } from './vivir.component';

describe('VivirComponent', () => {
  let component: VivirComponent;
  let fixture: ComponentFixture<VivirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VivirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VivirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
