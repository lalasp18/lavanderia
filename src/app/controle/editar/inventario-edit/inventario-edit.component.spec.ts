import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioEditComponent } from './inventario-edit.component';

describe('InventarioEditComponent', () => {
  let component: InventarioEditComponent;
  let fixture: ComponentFixture<InventarioEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioEditComponent]
    });
    fixture = TestBed.createComponent(InventarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
