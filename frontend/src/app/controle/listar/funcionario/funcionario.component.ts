import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Funcionario } from "src/app/models/funcionario.models";
import { FuncionarioService } from "../../criar/funcionario/service/funcionario.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-funcionario-lista",
  templateUrl: "./funcionario.component.html",
  styleUrls: ["./funcionario.component.scss"]
})
export class FuncionarioListaComponent implements OnInit, OnDestroy {

  funcionarios: Funcionario[] = [];
  unsubscribe$!: Subscription;
  funcionarioParaDeletarId: number = -1;
  funcionarioParaDeletarNome: string = "";

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unsubscribe$ = this.funcionarioService.listarFuncionarios()
      .subscribe({
        next: (funcionarios: any) => {
          const data = funcionarios;
          this.funcionarios = data;
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
    this.router.navigate(["api/funcionario/listar", id]);  // Adjust the route
  }

  definirIdParaDeletar(id: number, nome: string) {
    this.funcionarioParaDeletarId = id;
    this.funcionarioParaDeletarNome = nome;
  }

  limparIdParaDeletar() {
    this.funcionarioParaDeletarId = -1;
    this.funcionarioParaDeletarNome = "";
  }

  deletarID(id: number) {
    this.funcionarioService.deletarFuncionario(id)  // Adjust the service method
    .subscribe({
      next: (funcionarios: any) => {
        this.ngOnInit();
      },
      error: (err: any) => {
        this.mostrarAlert = true;
        this.tipoAlert = "danger";
        this.message = "Não foi possível deletar o funcionário.";
        setTimeout(() => {
          this.mostrarAlert = false;
        }, 10000);
      }
    });
  }
}
