import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventarioService } from '../service/inventario.service';
import { InventarioComponent } from '../inventario.component';
import { InventarioRoutingModule } from './inventario-routing.module';
import { InventariosComponent } from 'src/app/controle/listar/inventarios/inventarios.component';
import { InventarioEditComponent } from 'src/app/controle/editar/inventario-edit/inventario-edit.component';

@NgModule({
  declarations: [
    InventarioComponent,
    InventariosComponent,
    InventarioEditComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule
  ],
  providers: [
    InventarioService,
    // FormDeactivateGuard,
    // AlertService
  ],
  exports: [InventarioComponent]
})
export class InventarioModule { }
