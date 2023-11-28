import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from '../cliente.component';
import { ClienteListaComponent } from 'src/app/controle/listar/cliente/cliente.component';
import { ClienteEditComponent } from 'src/app/controle/editar/cliente-edit/cliente-edit.component';

const routes: Routes = [
  { path: 'api/cliente/criar', redirectTo: 'cadastrar/cliente', pathMatch: 'full' },
  {
    path: 'cadastrar/cliente',
    component: ClienteComponent,
  },
  { path: 'listar/cliente', component: ClienteListaComponent },

  { path: 'api/cliente/listar/:id', redirectTo: 'editar/cliente/:id', pathMatch: 'full' },
  { path: 'editar/cliente/:id', component: ClienteEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
