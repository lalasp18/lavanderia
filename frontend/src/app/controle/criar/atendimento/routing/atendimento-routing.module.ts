import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtendimentoComponent } from '../atendimento.component';
import { AtendimentosComponent } from 'src/app/controle/listar/atendimentos/atendimentos.component';
import { AtendimentoEditComponent } from 'src/app/controle/editar/atendimento-edit/atendimento-edit.component';


const routes: Routes = [
  { path: 'api/atendimento/criar', redirectTo: 'cadastrar/atendimento', pathMatch: 'full' },
  {
    path: 'cadastrar/atendimento',
    component: AtendimentoComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar/atendimentos', component: AtendimentosComponent },

  { path: 'api/atendimento/listar/:id', redirectTo: 'editar/atendimento/:id', pathMatch: 'full' },
  { path: 'editar/atendimento/:id', component: AtendimentoEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtendimentoRoutingModule { }
