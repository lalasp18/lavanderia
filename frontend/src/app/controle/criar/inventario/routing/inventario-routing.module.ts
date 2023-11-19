import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from '../inventario.component';
import { InventariosComponent } from 'src/app/controle/listar/inventarios/inventarios.component';
import { InventarioEditComponent } from 'src/app/controle/editar/inventario-edit/inventario-edit.component';


const routes: Routes = [
  { path: 'api/inventario/criar', redirectTo: 'cadastrar/inventario', pathMatch: 'full' },
  {
    path: 'cadastrar/inventario',
    component: InventarioComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar/itens', component: InventariosComponent },

  { path: 'api/inventario/listar/:id', redirectTo: 'editar/inventario/:id', pathMatch: 'full' },
  { path: 'editar/inventario/:id', component: InventarioEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
