import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PedidoComponent } from '../pedido.component';
import { PedidosComponent } from 'src/app/controle/listar/pedidos/pedidos.component';
import { PedidoEditComponent } from 'src/app/controle/editar/pedido-edit/pedido-edit.component';
import { PedidoRoutingModule } from './pedido-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AtendimentosComponent } from 'src/app/controle/listar/atendimentos/atendimentos.component';

@NgModule({
  declarations: [
    PedidoComponent,
    PedidosComponent,
    PedidoEditComponent,
    AtendimentosComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    // PedidoService,
    // FormDeactivateGuard,
    // AlertService
  ],
  exports: [PedidoComponent]
})
export class PedidoModule { }
