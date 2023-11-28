import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Atendimento } from "src/app/models/atendimento.models";

@Component({
  selector: "app-atendimentos",
  templateUrl: "./atendimentos.component.html",
  styleUrls: ["./atendimentos.component.scss"]
})
export class AtendimentosComponent implements OnInit, OnDestroy {

  atendimentoData: Atendimento[] = [];
  unsubscribe$!: Subscription;
  atendimentoParaDeletarId: number = -1;
  
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
    //       this.atendimentoData = data;
    //       if(this.atendimentoData.length <= 0) {
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
    //       }, 10000);
    //     }
    // });
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  editarID(id: number) {
    this.router.navigate(["api/atendimento/listar", id]);
  }

  definirIdParaDeletar(id: number) {
    this.atendimentoParaDeletarId = id;
  }

  limparIdParaDeletar() {
    this.atendimentoParaDeletarId = -1;
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
