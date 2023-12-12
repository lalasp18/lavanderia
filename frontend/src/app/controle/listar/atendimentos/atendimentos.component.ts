import { Component, OnDestroy, OnInit } from '@angular/core';
import { PedidoService } from '../../criar/pedido/service/pedido.service';
import { Pedido } from 'src/app/models/pedido.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss']
})
export class AtendimentosComponent implements OnInit, OnDestroy {
  
  pedidosInicia: Pedido[]=[];
  pedidosAnda: Pedido[]=[];
  pedidosConclui: Pedido[]=[];
  unsubscribe$0!: Subscription;
  unsubscribe$1!: Subscription;
  unsubscribe$2!: Subscription;

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";
  
  constructor(
    private pedidoService: PedidoService,
  ){}

  ngOnInit() {
    this.unsubscribe$0 = this.pedidoService.listarPedidoStatus0()
      .subscribe({
        next: (itens: any) => {
          this.pedidosInicia = itens;
          // if(this.pedidosInicia.length <= 0) {
          //   this.tipoAlert = 'info'
          //   this.mostrarAlert = true
          //   this.message = "Nenhum pedido atendido encontrado."
          // }
        },
        error: (err: any) => {
          this.tipoAlert = 'danger'
          this.mostrarAlert = true
          this.message = "Dados não encontrados."
        }
    });

    this.unsubscribe$1 = this.pedidoService.listarPedidoStatus1()
      .subscribe({
        next: (itens: any) => {
          this.pedidosAnda = itens;
          // if(this.pedidosAnda.length <= 0) {
          //   this.tipoAlert = 'info'
          //   this.mostrarAlert = true
          //   this.message = "Nenhum pedido atendido encontrado."
          // }
        },
        error: (err: any) => {
          this.tipoAlert = 'danger'
          this.mostrarAlert = true
          this.message = "Dados não encontrados."
        }
    });

    this.unsubscribe$2 = this.pedidoService.listarPedidoStatus2()
      .subscribe({
        next: (itens: any) => {
          this.pedidosConclui = itens;
          // if(this.pedidosConclui.length <= 0) {
          //   this.tipoAlert = 'info'
          //   this.mostrarAlert = true
          //   this.message = "Nenhum pedido atendido encontrado."
          // }
        },
        error: (err: any) => {
          this.tipoAlert = 'danger'
          this.mostrarAlert = true
          this.message = "Dados não encontrados."
        }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$0.unsubscribe();
    this.unsubscribe$1.unsubscribe();
    this.unsubscribe$2.unsubscribe();
  }

  voltaIniciar(pedido: Pedido){
    this.pedidoService.editarPedidoStatus0(pedido).subscribe(
      data => {
        this.ngOnInit();
        window.location.reload();
      }
    );
  }

  paraAndamento(pedido: Pedido){
    this.pedidoService.editarPedidoStatus1(pedido).subscribe(
      data => {
        this.ngOnInit();
        window.location.reload();
      }
    );
  }

  paraConcluir(pedido: Pedido){
    this.pedidoService.editarPedidoStatus2(pedido).subscribe(
      data => {
        this.ngOnInit();
        window.location.reload();
      }
    );
  }
}
