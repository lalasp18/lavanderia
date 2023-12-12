import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.models';
import { ClienteService } from '../../criar/cliente/service/cliente.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit {

  clienteID!: Cliente;
  cliente: Cliente[] = [];
  formulario: FormGroup;
  unsubscribe$!: Subscription;

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService
  ) {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      endereco: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
    });
  }

  ngOnInit() {
    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.clienteService.pegarIdCliente(id)
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.clienteID = data;

          this.formulario.get("id")?.setValue(this.clienteID.id);
          this.formulario.get("nome")?.setValue(this.clienteID.nome);
          this.formulario.get("endereco")?.setValue(this.clienteID.endereco);
          this.formulario.get("numero")?.setValue(this.clienteID.numero);
          this.formulario.get("email")?.setValue(this.clienteID.email);
          this.formulario.get("telefone")?.setValue(this.formatarTelefone(this.clienteID.telefone));
        },
        error: (err: any) => {
          this.mostrarAlert = true;
          this.tipoAlert = "danger";
          this.message = 'ERRO! Dados não encontrados!';
          setTimeout(() => {
            this.mostrarAlert = false;
          }, 5000);
        }
      });
  }

  // Função para formatar o telefone
  formatarTelefone(telefone: string): string {
    if (telefone && telefone.length === 11) {
      return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`;
    }
    return telefone;
  }

  enviarForm() {
    const clienteEditado: Cliente = this.formulario.value;
    clienteEditado.telefone = this.formulario.value.telefone.replace(/\D/g, ''); // Remove caracteres não numéricos

    this.clienteService.salvarCliente(clienteEditado).subscribe({
        next: (data: any) => {
            this.cliente = data;
            this.formulario.reset();
            this.mostrarAlert = true;
            this.tipoAlert = 'info';
            this.message = 'Cliente editado com sucesso!';
            setTimeout(() => {
                this.mostrarAlert = false;
                this.router.navigate(['listar/cliente']); // Navega para a tela de listar após ocultar o spinner
            }, 2000); // Tempo para mostrar o spinner (2 segundos)
        },
        error: (err: any) => {
            this.mostrarAlert = true;
            this.tipoAlert = 'danger';
            this.message = 'Edição não concluída.';
            setTimeout(() => {
                this.mostrarAlert = false;
            }, 5000);
        },
    });
}

  goToRoute() {
    this.router.navigate(["api/cliente/editar"]);
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.cliente = this.formulario.value;
      this.enviarForm();
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      this.mostrarAlert = true;
      this.tipoAlert = "warning";
      this.message = "Informação inválida. Preencha os campos!";
      setTimeout(() => {
        this.mostrarAlert = false;
      }, 5000);
    }
  }
}
