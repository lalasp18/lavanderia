import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Maquina } from 'src/app/models/maquina.models';
import { MaquinaService } from '../../criar/maquina/service/maquina.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maquina-edit',
  templateUrl: './maquina-edit.component.html',
  styleUrls: ['./maquina-edit.component.scss']
})
export class MaquinaEditComponent implements OnInit {

  maquinaID!: Maquina;
  maquina: Maquina[] = [];
  formulario: FormGroup;
  unsubscribe$!: Subscription;

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  tipos = [
    {
      id: 1,
      nome: 'Lavadora',
    },
    {
      id: 2,
      nome: 'Secadora',
    },
    {
      id: 3,
      nome: 'Lava e Seca',
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private maquinaService: MaquinaService
  ) {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      tipo: [null, [Validators.required]],
      valor: [null, [Validators.required, Validators.min(1)]],

    });
  }

  ngOnInit() {
    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.maquinaService.pegarIdMaquina(id)
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.maquinaID = data;

          this.formulario.get("id")?.setValue(this.maquinaID.id);
          this.formulario.get("nome")?.setValue(this.maquinaID.nome);
          this.formulario.get("tipo")?.setValue(this.maquinaID.tipo);
          this.formulario.get("valor")?.setValue(this.maquinaID.valor);

          for (let i = 1; i < 6; i++) {
            if(this.maquinaID.tipo == this.tipos[i].nome){
              const selectMaquina = document.getElementById('selectMaquina') as HTMLInputElement;
              selectMaquina.value = this.tipos[i].id.toString();
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

  enviarForm() {
    this.maquinaService.editarMaquina(this.maquina).subscribe({
      next: (data: any) => {
        this.maquina = data;
        this.goToRoute();
        this.formulario.reset();
        this.mostrarAlert = true;
        this.tipoAlert = "info";
        this.message = "Máquina editada com sucesso!";
        setTimeout(() => {
          this.mostrarAlert = false;
        }, 5000);
      },
      error: (err: any) => {
        this.mostrarAlert = true;
        this.tipoAlert = "danger";
        this.message = "Erro! Máquina não foi salva.";
        setTimeout(() => {
          this.mostrarAlert = false;
        }, 5000);
      }
    });
  }

  goToRoute() {
    this.router.navigate(["api/maquina/editar"]);
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
      this.tipoAlert = "warning";
      this.message = "Informação inválida. Preencha os campos!";
      setTimeout(() => {
        this.mostrarAlert = false;
      }, 5000);
    }
  }
}
