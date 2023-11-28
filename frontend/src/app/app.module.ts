import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventarioModule } from './controle/criar/inventario/routing/inventario.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { FooterComponent } from './footer/footer.component';
import { MaquinaModule } from './controle/criar/maquina/routing/maquina.module';
import { FuncionarioModule } from './controle/criar/funcionario/routing/funcionario.module';
import { ClienteModule } from './controle/criar/cliente/routing/cliente.module';
import { AtendimentoModule } from './controle/criar/atendimento/routing/atendimento.module';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,

    InventarioModule,
    MaquinaModule,
    FuncionarioModule,
    ClienteModule,
    AtendimentoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
