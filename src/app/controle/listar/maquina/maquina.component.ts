import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Maquina } from "src/app/models/maquina.models";
import { MaquinaService } from "../../criar/maquina/service/maquina.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-maquina",
  templateUrl: "./maquina.component.html",
  styleUrls: ["./maquina.component.scss"]
})
export class MaquinaListaComponent implements OnInit, OnDestroy {

  maquinas: Maquina[] = [];
  unsubscribe$!: Subscription;
  maquinaParaDeletarId: number = -1;
  maquinaParaDeletarNome: string = "";

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  constructor(
    private maquinaService: MaquinaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unsubscribe$ = this.maquinaService.listarMaquina()
      .subscribe({
        next: (maquinas: any) => {
          const data = maquinas;
          this.maquinas = data;
          if(this.maquinas.length <= 0) {
            this.mostrarAlert = true;
            this.tipoAlert = "warning";
            this.message = "Nenhuma máquina encontrada.";
            setTimeout(() => {
              this.mostrarAlert = false;
            }, 10000);
          }
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
    this.router.navigate(["api/maquina/listar", id]);
  }

  definirIdParaDeletar(id: number, nome: string) {
    this.maquinaParaDeletarId = id;
    this.maquinaParaDeletarNome = nome;
  }

  limparIdParaDeletar() {
    this.maquinaParaDeletarId = -1;
    this.maquinaParaDeletarNome = "";
  }

  deletarID(id: number) {
    this.maquinaService.deletarMaquina(id)
    .subscribe({
      next: (maquinas: any) => {
        this.ngOnInit();
      }//,
      // error: (err: any) => {
      //   this.mostrarAlert = true;
      //   this.tipoAlert = "danger";
      //   this.message = "Não foi possível deletar a máquina.";
      //   setTimeout(() => {
      //     this.mostrarAlert = false;
      //   }, 10000);
      // }
    });
  }
}
