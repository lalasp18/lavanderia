import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Cliente } from "src/app/models/cliente.models";
import { ClienteService } from "../../criar/cliente/service/cliente.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cliente",
  templateUrl: "./cliente.component.html",
  styleUrls: ["./cliente.component.scss"]
})
export class ClienteListaComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = [];
  unsubscribe$!: Subscription;
  clienteParaDeletarId: number = -1;
  clienteParaDeletarNome: string = "";

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unsubscribe$ = this.clienteService.listarClientes()
      .subscribe({
        next: (clientes: any) => {
          const data = clientes;
          this.clientes = data;
          this.formatarTelefones();
        },
        error: (err: any) => {
          alert("Dados não encontrados.");
        }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  // Função para formatar os telefones
  formatarTelefones() {
    this.clientes.forEach(cliente => {
      if (cliente.telefone && cliente.telefone.length === 11) {
        cliente.telefone = `(${cliente.telefone.substring(0, 2)}) ${cliente.telefone.substring(2, 7)}-${cliente.telefone.substring(7)}`;
      }
    });
  }

  editarID(id: number) {
    this.router.navigate(["api/cliente/listar", id]);
  }

  definirIdParaDeletar(id: number, nome: string) {
    this.clienteParaDeletarId = id;
    this.clienteParaDeletarNome = nome;
  }

  limparIdParaDeletar() {
    this.clienteParaDeletarId = -1;
    this.clienteParaDeletarNome = "";
  }

  deletarID(id: number) {
    this.clienteService.deletarCliente(id)
    .subscribe({
      next: (clientes: any) => {
        this.ngOnInit();
      },
      error: (err: any) => {
        if(err.status === 400){
          alert('Cliente deletado com sucesso.')
        } else if(err.status === 500){
          alert('Cliente está com pedido em andamento.')
        }
      }
    });
  }
}
