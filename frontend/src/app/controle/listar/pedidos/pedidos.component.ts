import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Pedido } from "src/app/models/pedido.models";
import { PedidoService } from "../../criar/pedido/service/pedido.service";
import { Maquina } from "src/app/models/maquina.models";
import { Inventario } from "src/app/models/inventario.models";

@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.component.html",
  styleUrls: ["./pedidos.component.scss"]
})
export class PedidosComponent implements OnInit, OnDestroy {

  pedidos: Pedido[]=[];
  unsubscribe$!: Subscription;
  pedidoParaDeletarId: number = -1;

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";
  
  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unsubscribe$ = this.pedidoService.listarPedido()
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.pedidos = data;
          if(this.pedidos.length <= 0) {
            this.tipoAlert = 'info'
            this.mostrarAlert = true
            this.message = "Nenhum pedido encontrado."
          }
        },
        error: (err: any) => {
          this.tipoAlert = 'danger'
          this.mostrarAlert = true
          this.message = "Dados não encontrados."
        }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  editarID(id: number) {
    this.router.navigate(["api/pedido/listar", id]);
  }

  definirIdParaDeletar(id: number) {
    this.pedidoParaDeletarId = id;
  }

  limparIdParaDeletar() {
    this.pedidoParaDeletarId = -1;
  }

  deletarID(id: number) {
    this.pedidoService.deletarPedido(id)
    .subscribe({
      next: (itens: any) => {
        this.tipoAlert = 'success'
        this.mostrarAlert = true
        this.message = 'Pedido deletado com sucesso.'
        this.ngOnInit();
      },
      error: (err:any) => {
        if(err.status === 400){
          this.tipoAlert = 'success'
          this.mostrarAlert = true
          this.message = 'Pedido deletado com sucesso.'
        } else if(err.status === 500){
          this.tipoAlert = 'warning'
          this.mostrarAlert = true
          this.message = 'Pedido está em andamento.'
        }
      }
    });
  }

  formatarMaquinas(maquinas: Maquina[]) {
    return maquinas.map(maq => maq.nome+'-'+maq.tipo).join(', ');
  }

  formatarProdutos(produtos: Inventario[]) {
    return produtos.map(pro => pro.nome+'-'+pro.categoria).join(', ');
  }
}
