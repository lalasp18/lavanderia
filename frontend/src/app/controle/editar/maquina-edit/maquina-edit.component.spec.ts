import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaEditComponent } from './maquina-edit.component';

describe('MaquinaEditComponent', () => {
  let component: MaquinaEditComponent;
  let fixture: ComponentFixture<MaquinaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquinaEditComponent]
    });
    fixture = TestBed.createComponent(MaquinaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
