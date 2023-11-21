import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaListaComponent } from './maquina.component';

describe('MaquinaListaComponent', () => {
  let component: MaquinaListaComponent;
  let fixture: ComponentFixture<MaquinaListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquinaListaComponent],
    });
    fixture = TestBed.createComponent(MaquinaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
