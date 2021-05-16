import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenuPanelComponent } from './list-menu-panel.component';

describe('ListMenuPanelComponent', () => {
  let component: ListMenuPanelComponent;
  let fixture: ComponentFixture<ListMenuPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMenuPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMenuPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
