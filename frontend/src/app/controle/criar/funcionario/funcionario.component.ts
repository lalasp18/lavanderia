import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from './service/funcionario.service';
import { Funcionario } from 'src/app/models/funcionario.models';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss'],
})
export class FuncionarioComponent implements OnInit {
  funcionario: Funcionario[] = [];
  formulario: FormGroup;
  senhaVisivel: boolean = false;
  complexidadeSenha: number = 0;

  mostrarAlert: boolean = false;
  mostrarSpin: boolean = false;
  message: string = '';
  tipoAlert: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private funcionarioService: FuncionarioService
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
      email: [null, [Validators.required, Validators.email]],
      cargo: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
    });
    this.formulario.get('senha')?.valueChanges.subscribe((novaSenha) => {
      this.calcularComplexidadeSenha(novaSenha);
    });
  }

  ngOnInit() { }

 enviarForm() {
    const novoFuncionario: Funcionario = this.formulario.value;
    this.funcionarioService.salvarFuncionario(this.funcionario).subscribe({
        next: (data: any) => {
            this.funcionario = data;
            this.formulario.reset();
            this.mostrarAlert = true;
            this.mostrarSpin = true;
            this.tipoAlert = 'info';
            if(data != null){
            this.message = 'Funcionário cadastrado com sucesso!';
            setTimeout(() => {
                this.mostrarAlert = false;
                this.router.navigate(['listar/funcionario']);
            }, 5000);
          }else {
            this.mostrarSpin = false
            this.message = 'E-mail já existente!'
          }
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
    this.router.navigate(['api/funcionario/criar']);
  }

  onSubmit() {
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      this.funcionario = this.formulario.value;
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

  toggleSenhaVisibility() {
    this.senhaVisivel = !this.senhaVisivel;
    const senhaInput = document.getElementById('inputSenha') as HTMLInputElement;

    if (this.senhaVisivel) {
      senhaInput.type = 'text';
    } else {
      senhaInput.type = 'password';
    }
  }

  calcularComplexidadeSenha(senha: string) {
    let complexidade = 0;

    complexidade += Math.min(senha.length * 4, 50);
    const caracteresEspeciais = /[!@#$%^&*(),.?":{}|<>]/;
    if (caracteresEspeciais.test(senha)) {
      complexidade += 60;
    }
    const letrasMaiusculas = /[A-Z]/g;
    const matchLetrasMaiusculas = senha.match(letrasMaiusculas);
    if (matchLetrasMaiusculas) {
      complexidade += Math.min(matchLetrasMaiusculas.length * 2, 60);
    }
    this.complexidadeSenha = Math.min(complexidade, 100);
  }
}
