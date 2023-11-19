import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { InventarioService } from "./service/inventario.service";
import { Inventario } from "src/app/models/inventario.models";

@Component({
  selector: "app-inventario",
  templateUrl: "./inventario.component.html",
  styleUrls: ["./inventario.component.scss"]
})
export class InventarioComponent implements OnInit {

  inventario: Inventario[] = [];
  formulario: FormGroup;

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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

  ngOnInit() {}

  enviarForm() {
    this.inventarioService.salvarInventario(this.inventario).subscribe({
      next: (data: any) => {
        this.inventario = data;
        this.goToRoute();
        this.formulario.reset();
        this.mostrarAlert = true;
        this.tipoAlert = "info";
        this.message = "Inventário cadastrado com sucesso!";
        setTimeout(() => {
          this.mostrarAlert = false;
        }, 5000);
      },
      error: (err: any) => {
        this.mostrarAlert = true;
        this.tipoAlert = "danger";
        this.message = "Cadastro não enviado.";
        setTimeout(() => {
          this.mostrarAlert = false;
        }, 5000);
      }
    });
  }

  goToRoute() {
    this.router.navigate(["api/inventario/criar"]);
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
