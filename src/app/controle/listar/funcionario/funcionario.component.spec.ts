import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioListaComponent } from './funcionario.component';

describe('FuncionarioListaComponent', () => {
  let component: FuncionarioListaComponent;
  let fixture: ComponentFixture<FuncionarioListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioListaComponent],
    });
    fixture = TestBed.createComponent(FuncionarioListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
