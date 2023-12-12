import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventario } from 'src/app/models/inventario.models';
import { InventarioService } from '../../criar/inventario/service/inventario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventario-edit',
  templateUrl: './inventario-edit.component.html',
  styleUrls: ['./inventario-edit.component.scss']
})
export class InventarioEditComponent implements OnInit {

  inventarioID!: Inventario;
  inventario: Inventario[] = [];
  formulario: FormGroup;
  unsubscribe$!: Subscription;

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";
  
  opt = [
    {
      id: 1,
      nome: 'Amaciante',
    },
    {
      id: 2,
      nome: 'Alvejante e removedor de mancha',
    },
    {
      id: 3,
      nome: 'Desinfetante e sanitizante',
    },
    {
      id: 4,
      nome: 'Produto especializado',
    },
    {
      id: 5,
      nome: 'Produto para cuidado especial',
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private inventarioService: InventarioService
  ) {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      valor: [null, [Validators.required, Validators.min(1)]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(350)]],
      categoria: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.inventarioService.pegarIdInventario(id)
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.inventarioID = data;

          this.formulario.get("id")?.setValue(this.inventarioID.id);
          this.formulario.get("nome")?.setValue(this.inventarioID.nome);
          this.formulario.get("quantidade")?.setValue(this.inventarioID.quantidade);
          this.formulario.get("valor")?.setValue(this.inventarioID.valor);
          this.formulario.get("descricao")?.setValue(this.inventarioID.descricao);
          this.formulario.get("categoria")?.setValue(this.inventarioID.categoria);

          for (let i = 1; i < 6; i++) {
            if(this.inventarioID.categoria == this.opt[i].nome){
              const selectTitulo = document.getElementById('selectTitulo') as HTMLInputElement;
              selectTitulo.value = this.opt[i].nome;
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
      const inventarioEditado: Inventario = this.formulario.value;
  
      this.inventarioService.editarInventario(this.inventario).subscribe({
          next: (data: any) => {
              this.inventario = data;
              this.formulario.reset();
              this.mostrarAlert = true;
              this.tipoAlert = 'info';
              this.message = 'Inventário editado com sucesso!';
              setTimeout(() => {
                  this.mostrarAlert = false;
                  this.router.navigate(['listar/itens']); // Navega para a tela de listar após ocultar o spinner
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
    this.router.navigate(["api/inventario/editar"]);
  }

  onSubmit() {
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      this.inventario = this.formulario.value;
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
