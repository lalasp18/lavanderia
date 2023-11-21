import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaquinaComponent } from '../maquina.component';
import { MaquinaListaComponent } from 'src/app/controle/listar/maquina/maquina.component';
import { MaquinaEditComponent } from 'src/app/controle/editar/maquina-edit/maquina-edit.component';


const routes: Routes = [
  { path: 'api/maquina/criar', redirectTo: 'cadastrar/maquina', pathMatch: 'full' },
  {
    path: 'cadastrar/maquina',
    component: MaquinaComponent,
  },
  { path: 'listar/maquina', component: MaquinaListaComponent },

  { path: 'api/maquina/listar/:id', redirectTo: 'editar/maquina/:id', pathMatch: 'full' },
  { path: 'editar/maquina/:id', component: MaquinaEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaquinaRoutingModule { }
