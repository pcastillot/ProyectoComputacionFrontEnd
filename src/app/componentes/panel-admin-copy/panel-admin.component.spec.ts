import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdminCopyComponent } from './panel-admin.component';

describe('PanelAdminComponent', () => {
  let component: PanelAdminCopyComponent;
  let fixture: ComponentFixture<PanelAdminCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAdminCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdminCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
