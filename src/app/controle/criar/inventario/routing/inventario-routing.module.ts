import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from '../inventario.component';
import { InventariosComponent } from 'src/app/controle/listar/inventarios/inventarios.component';
import { InventarioEditComponent } from 'src/app/controle/editar/inventario-edit/inventario-edit.component';


const routes: Routes = [
  { path: 'api/item/criar', redirectTo: 'cadastrar/item', pathMatch: 'full' },
  {
    path: 'cadastrar/item',
    component: InventarioComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar/itens', component: InventariosComponent },

  { path: 'api/item/listar/:id', redirectTo: 'editar/item/:id', pathMatch: 'full' },
  { path: 'editar/item/:id', component: InventarioEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
