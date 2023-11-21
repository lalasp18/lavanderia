import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuncionarioService } from '../service/funcionario.service';
import { FuncionarioComponent } from '../funcionario.component';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioListaComponent } from 'src/app/controle/listar/funcionario/funcionario.component';
import { FuncionarioEditComponent } from 'src/app/controle/editar/funcionario-edit/funcionario-edit.component';

@NgModule({
  declarations: [
    FuncionarioComponent,
    FuncionarioListaComponent,
    FuncionarioEditComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    FuncionarioService, 
  ],
  exports: [FuncionarioComponent]
})
export class FuncionarioModule { }
