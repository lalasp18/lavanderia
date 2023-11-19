import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaComponent } from './maquina.component';

describe('MaquinaComponent', () => {
  let component: MaquinaComponent;
  let fixture: ComponentFixture<MaquinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquinaComponent],
    });
    fixture = TestBed.createComponent(MaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
