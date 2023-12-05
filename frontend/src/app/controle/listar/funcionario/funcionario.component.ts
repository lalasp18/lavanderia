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
        next: (data: any) => {
          this.funcionarios = data;
          if(this.funcionarios.length <= 0) {
            this.tipoAlert = 'info'
            this.mostrarAlert = true
            this.message = "Nenhum funcionário encontrado."
          }
        },
        error: (err: any) => {
          this.mostrarAlert = true;
          this.tipoAlert = "danger";
          this.message = "Dados não encontrados.";
          setTimeout(() => {
            this.mostrarAlert = false;
          }, 5000);
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
    this.funcionarioService.deletarFuncionario(id)
    .subscribe({
      next: (funcionarios: any) => {
        this.tipoAlert = 'success'
        this.mostrarAlert = true
        this.message = 'Funcionário deletado com sucesso.'
        window.location.reload();
        this.ngOnInit();
      },
      error: (err: any) => {
        if(err.status === 400){
          this.tipoAlert = 'success'
          this.mostrarAlert = true
          this.message = 'Funcionário deletado com sucesso.'
        } else if(err.status === 500){
          this.tipoAlert = 'danger'
          this.mostrarAlert = true
          this.message = 'Funcionário está em operação.'
        }
      }
    });
  }
}
