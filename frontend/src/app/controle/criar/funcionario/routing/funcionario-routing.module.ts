import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioComponent } from '../funcionario.component';
import { FuncionarioListaComponent } from 'src/app/controle/listar/funcionario/funcionario.component';
import { FuncionarioEditComponent } from 'src/app/controle/editar/funcionario-edit/funcionario-edit.component';

const routes: Routes = [
  { path: 'api/funcionario/criar', redirectTo: 'cadastrar/funcionario', pathMatch: 'full' },
  {
    path: 'cadastrar/funcionario',
    component: FuncionarioComponent,
  },
  { path: 'listar/funcionario', component: FuncionarioListaComponent },

  { path: 'api/funcionario/listar/:id', redirectTo: 'editar/funcionario/:id', pathMatch: 'full' },
  { path: 'editar/funcionario/:id', component: FuncionarioEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
