import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';
import { ClienteComponent } from '../cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListaComponent } from 'src/app/controle/listar/cliente/cliente.component';
import { ClienteEditComponent } from 'src/app/controle/editar/cliente-edit/cliente-edit.component';

@NgModule({
  declarations: [
    ClienteComponent,
    ClienteListaComponent,
    ClienteEditComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ClienteService,
  ],
  exports: [ClienteComponent]
})
export class ClienteModule { }
