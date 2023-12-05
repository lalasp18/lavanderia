import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from '../pedido.component';
import { PedidosComponent } from 'src/app/controle/listar/pedidos/pedidos.component';
import { PedidoEditComponent } from 'src/app/controle/editar/pedido-edit/pedido-edit.component';
import { AtendimentosComponent } from 'src/app/controle/listar/atendimentos/atendimentos.component';


const routes: Routes = [
  { path: 'api/pedido/criar', redirectTo: 'cadastrar/pedido', pathMatch: 'full' },
  {
    path: 'cadastrar/pedido',
    component: PedidoComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar/pedidos', component: PedidosComponent },
  { path: 'listar/atendimentos', component: AtendimentosComponent },

  { path: 'api/pedido/listar/:id', redirectTo: 'editar/pedido/:id', pathMatch: 'full' },
  { path: 'editar/pedido/:id', component: PedidoEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
