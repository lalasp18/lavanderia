import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaquinaService } from '../service/maquina.service';
import { MaquinaComponent } from '../maquina.component';
import { MaquinaRoutingModule } from './maquina-routing.module';
import { MaquinaListaComponent } from 'src/app/controle/listar/maquina/maquina.component';
import { MaquinaEditComponent } from 'src/app/controle/editar/maquina-edit/maquina-edit.component';

@NgModule({
  declarations: [
    MaquinaComponent,
    MaquinaListaComponent,
    MaquinaEditComponent
  ],
  imports: [
    CommonModule,
    MaquinaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MaquinaService,
  ],
  exports: [MaquinaComponent]
})
export class MaquinaModule { }
