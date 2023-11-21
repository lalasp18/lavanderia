import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Inventario } from "src/app/models/inventario.models";
import { InventarioService } from "../../criar/inventario/service/inventario.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-inventarios",
  templateUrl: "./inventarios.component.html",
  styleUrls: ["./inventarios.component.scss"]
})
export class InventariosComponent implements OnInit, OnDestroy {

  inventarioData: Inventario[] = [];
  unsubscribe$!: Subscription;
  itemParaDeletarId: number = -1;
  itemParaDeletarNome: string = "";
  
  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";
  
  constructor(
    private inventarioService: InventarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unsubscribe$ = this.inventarioService.listarInventario()
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.inventarioData = data;
        },
        error: (err: any) => {
          this.mostrarAlert = true;
          this.tipoAlert = "danger";
          this.message = "Dados não encontrados.";
          setTimeout(() => {
            this.mostrarAlert = false;
          }, 10000);
        }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  editarID(id: number) {
    this.router.navigate(["api/inventario/listar", id]);
  }

  definirIdParaDeletar(id: number, nome: string) {
    this.itemParaDeletarId = id;
    this.itemParaDeletarNome = nome;
    console.log(this.itemParaDeletarId)
    console.log(this.itemParaDeletarNome)
  }

  limparIdParaDeletar() {
    this.itemParaDeletarId = -1;
    this.itemParaDeletarNome = "";
    console.log(this.itemParaDeletarId)
    console.log(this.itemParaDeletarNome)
  }

  deletarID(id: number) {
    this.inventarioService.deletarInventario(id)
    .subscribe({
      next: (itens: any) => {
        this.ngOnInit();
      }//,
      // error: (err: any) => {
      //   this.mostrarAlert = true;
      //   this.tipoAlert = "danger";
      //   this.message = "Não foi possível deletar o item.";
      //   setTimeout(() => {
      //     this.mostrarAlert = false;
      //   }, 10000);
      // }
    });
  }
}
