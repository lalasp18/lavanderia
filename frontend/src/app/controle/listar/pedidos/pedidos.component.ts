import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Pedido } from "src/app/models/pedido.models";

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
    // private inventarioService: InventarioService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.unsubscribe$ = this.inventarioService.listarInventario()
    //   .subscribe({
    //     next: (itens: any) => {
    //       const data = itens;
    //       this.pedidoData = data;
    //       if(this.pedidoData.length <= 0) {
    //         this.mostrarAlert = true;
    //         this.tipoAlert = "warning";
    //         this.message = "Nenhum inventário encontrado.";
    //         setTimeout(() => {
    //           this.mostrarAlert = false;
    //         }, 10000);
    //       }
    //     },
    //     error: (err: any) => {
    //       this.mostrarAlert = true;
    //       this.tipoAlert = "danger";
    //       this.message = "Dados não encontrados.";
    //       setTimeout(() => {
    //         this.mostrarAlert = false;
    //       }, 5000);
    //     }
    // });
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
    // this.inventarioService.deletarInventario(id)
    // .subscribe({
    //   next: (itens: any) => {
    //     this.ngOnInit();
    //   }
    // });
  }
}
