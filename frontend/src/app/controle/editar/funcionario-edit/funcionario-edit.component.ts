import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario.models';
import { FuncionarioService } from '../../criar/funcionario/service/funcionario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-funcionario-edit',
  templateUrl: './funcionario-edit.component.html',
  styleUrls: ['./funcionario-edit.component.scss']
})
export class FuncionarioEditComponent implements OnInit, OnDestroy {

  funcionarioID!: Funcionario;
  funcionario: Funcionario[] = [];
  formulario: FormGroup;
  unsubscribe$!: Subscription;

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  cargos = [
    {
      id: 1,
      nome: 'Atendente',
    },
    {
      id: 2,
      nome: 'Operador de Máquinas',
    },
    {
      id: 3,
      nome: 'Supervisor',
    },
    {
      id: 4,
      nome: 'Limpeza',
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private funcionarioService: FuncionarioService
  ) {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: [null, [Validators.required, Validators.email]],
      cargo: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.funcionarioService.pegarIdFuncionario(id)
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.funcionarioID = data;

          this.formulario.get("id")?.setValue(this.funcionarioID.id);
          this.formulario.get("nome")?.setValue(this.funcionarioID.nome);
          this.formulario.get("email")?.setValue(this.funcionarioID.email);
          this.formulario.get("cargo")?.setValue(this.funcionarioID.cargo);
          this.formulario.get("senha")?.setValue(this.funcionarioID.senha);

          for (let i = 1; i < 6; i++) {
            if (this.funcionarioID.cargo == this.cargos[i].nome) {
              const selectFuncionario = document.getElementById('selectFuncionario') as HTMLInputElement;
              selectFuncionario.value = this.cargos[i].nome;
            }
          }
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

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  enviarForm() {
    const funcionarioEditado: Funcionario = this.formulario.value;

    this.funcionarioService.editarFuncionario(this.funcionario).subscribe({
        next: (data: any) => {
            this.funcionario = data;
            this.formulario.reset();
            this.mostrarAlert = true;
            this.tipoAlert = 'info';
            this.message = 'Funcionário editado com sucesso!';
            setTimeout(() => {
                this.mostrarAlert = false;
                this.router.navigate(['listar/funcionario']); // Navega para a tela de listar após ocultar o spinner
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
    this.router.navigate(["api/funcionario/editar"]);
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
      this.tipoAlert = "warning";
      this.message = "Informação inválida. Preencha os campos!";
      setTimeout(() => {
        this.mostrarAlert = false;
      }, 5000);
    }
  }
}
