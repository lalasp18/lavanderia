import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from './service/cliente.service';
import { Cliente } from 'src/app/models/cliente.models';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  cliente: Cliente[] = [];
  formulario: FormGroup;

  mostrarAlert: boolean = false;
  message: string = '';
  tipoAlert: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService: ClienteService
  ) {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      endereco: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required, Validators.minLength(11)]],
    });
  }

  ngOnInit() {}

  formatarTelefone(event: any) {
    const telefone = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (telefone.length <= 11) {
      event.target.value = this.formatarNumero(telefone);
    } else {
      event.target.value = this.formatarNumero(telefone.substring(0, 11));
    }
  }

  // Função para formatar o número no estilo desejado
  formatarNumero(numero: string): string {
    if (numero.length <= 2) {
      return `(${numero}`;
    } else if (numero.length <= 7) {
      return `(${numero.substring(0, 2)}) ${numero.substring(2)}`;
    } else {
      return `(${numero.substring(0, 2)}) ${numero.substring(2, 7)}-${numero.substring(7)}`;
    }
  }

  enviarForm() {
    const novoCliente: Cliente = this.formulario.value; // Obtenha o cliente do formulário
    this.clienteService.salvarCliente(novoCliente).subscribe({
      next: (data: any) => {
        this.cliente = data;
        this.goToRoute();
        this.formulario.reset();
        this.mostrarAlert = true;
        this.tipoAlert = 'info';
        this.message = 'Cliente cadastrado com sucesso!';
        setTimeout(() => {
          this.mostrarAlert = false;
        }, 5000);
      },
      error: (err: any) => {
        this.mostrarAlert = true;
        this.tipoAlert = 'danger';
        this.message = 'Cadastro não enviado.';
        setTimeout(() => {
          this.mostrarAlert = false;
        }, 5000);
      },
    });
  }

  goToRoute() {
    this.router.navigate(['api/cliente/cadastrar']);
  }

  onSubmit() {
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      this.cliente = this.formulario.value;
      this.enviarForm();
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      this.mostrarAlert = true;
      this.tipoAlert = 'warning';
      this.message = 'Informação inválida. Preencha os campos!';
      setTimeout(() => {
        this.mostrarAlert = false;
      }, 5000);
    }
  }
}
