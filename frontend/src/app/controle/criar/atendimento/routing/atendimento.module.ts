import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtendimentoComponent } from '../atendimento.component';
import { AtendimentosComponent } from 'src/app/controle/listar/atendimentos/atendimentos.component';
import { AtendimentoEditComponent } from 'src/app/controle/editar/atendimento-edit/atendimento-edit.component';
import { AtendimentoRoutingModule } from './atendimento-routing.module';

@NgModule({
  declarations: [
    AtendimentoComponent,
    AtendimentosComponent,
    AtendimentoEditComponent
  ],
  imports: [
    CommonModule,
    AtendimentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule
  ],
  providers: [
    // AtendimentoService,
    // FormDeactivateGuard,
    // AlertService
  ],
  exports: [AtendimentoComponent]
})
export class AtendimentoModule { }
