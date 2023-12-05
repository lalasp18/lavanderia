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
        },
        error: (err: any) => {
          alert(err)
          alert("Dados não encontrados.");
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
      next: (maquinas:any) => {
        this.ngOnInit();
        window.location.reload();
      },
      error: (err: any) => {
        if(err.status === 400){
          alert('Máquina deletada com sucesso.')
        } else if(err.status === 500){
          alert('Máquina está em uso.')
        }
      }
    });
  }
}
