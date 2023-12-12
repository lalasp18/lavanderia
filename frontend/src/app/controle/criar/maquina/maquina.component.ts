import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaquinaService } from './service/maquina.service';
import { Maquina } from 'src/app/models/maquina.models';

@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.component.html',
  styleUrls: ['./maquina.component.scss'],
})
export class MaquinaComponent implements OnInit {
  maquina: Maquina[] = [];
  formulario: FormGroup;

  mostrarAlert: boolean = false;
  message: string = '';
  tipoAlert: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private maquinaService: MaquinaService
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
      tipo: [null, [Validators.required]],
      valor: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() { }

  enviarForm() {
    const novaMaquina: Maquina = this.formulario.value;
    this.maquinaService.salvarMaquina(this.maquina).subscribe({
        next: (data: any) => {
            this.maquina = data;
            this.formulario.reset();
            this.mostrarAlert = true;
            this.tipoAlert = 'info';
            this.message = 'Máquina cadastrada com sucesso!';
            setTimeout(() => {
                this.mostrarAlert = false;
                this.router.navigate(['listar/maquina']); // Ajuste a rota conforme necessário
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
    this.router.navigate(['api/maquina/criar']);
  }

  onSubmit() {
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      this.maquina = this.formulario.value;
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
