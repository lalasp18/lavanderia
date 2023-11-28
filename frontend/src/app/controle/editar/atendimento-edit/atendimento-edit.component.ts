import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Funcionario } from "src/app/models/funcionario.models";
import { Inventario } from "src/app/models/inventario.models";
import { Maquina } from "src/app/models/maquina.models";
import { MaquinaService } from "../../criar/maquina/service/maquina.service";
import { InventarioService } from "../../criar/inventario/service/inventario.service";
import { FuncionarioService } from "../../criar/funcionario/service/funcionario.service";

@Component({
  selector: "app-atendimento-edit",
  templateUrl: "./atendimento-edit.component.html",
  styleUrls: ["./atendimento-edit.component.scss"]
})
export class AtendimentoEditComponent implements OnInit {

  // inventario: Inventario[] = [];
  funcionarioList: Funcionario[]=[];
  maquinaList: Maquina[]=[];
  produtoList: Inventario[]=[];
  clienteList: any[]=[];

  formulario: FormGroup;

  orcamento: number = 0;

  mostrarAlert: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private maquinaService: MaquinaService,
    private inventarioService: InventarioService,
    private funcionarioService: FuncionarioService,
    // private clienteService: ClienteService,
  ) {
    this.formulario = this.formBuilder.group({
      id: [null],
      cliente: [null, [Validators.required]],
      status: [null, [Validators.required]],
      maquinas: [null, [Validators.required]],
      produtos: [null, [Validators.required]],
      funcionario: [null, [Validators.required]],
      valorTotal: [null, [Validators.required]]
    });
  }

  ngOnInit() {}

  getMaquina(): FormArray {
    return this.formulario.get('maquinas') as FormArray;
  }

  addMaquina(maquina: Maquina) {
    this.getMaquina().push(new FormControl(maquina));
  }

  removeMaquina(maquina: Maquina) {
    const maquinasArray = this.getMaquina();
    const index = maquinasArray.controls.findIndex(control => control.value === maquina);

    if (index !== -1) {
      maquinasArray.removeAt(index);
    } else {
      console.error('Maquina não encontrada no FormArray.');
    }
  }

  getProduto(): FormArray {
    return this.formulario.get('produtos') as FormArray;
  }

  addProduto(produto: Inventario) {
    this.getProduto().push(new FormControl(produto));
  }

  removeProduto(produto: Inventario) {
    const produtosArray = this.getProduto();
    const index = produtosArray.controls.findIndex(control => control.value === produto);

    if (index !== -1) {
      produtosArray.removeAt(index);
    } else {
      console.error('Produto não encontrado no FormArray.');
    }
  }
  
  pegarCliente(event: any) {
    let clienteSelecionado = event.target.value;

    if (clienteSelecionado) {
      // this.clienteService.pegarIdCliente(clienteSelecionado).subscribe({
      //   next: (dir: any) => {
      //     clienteSelecionado = dir;
      //     this.tituloform.get("cliente")?.setValue(clienteSelecionado);
      //   }
      // })
    }
  }
  
  pegarFuncionario(event: any) {
    let funcionarioSelecionado = event.target.value;

    if (funcionarioSelecionado) {
      this.funcionarioService.pegarIdFuncionario(funcionarioSelecionado).subscribe({
        next: (dir: any) => {
          funcionarioSelecionado = dir;
          this.formulario.get("funcionario")?.setValue(funcionarioSelecionado);
        }
      })
    }
  }
  
  pegarMaquina(event: any, maquina: Maquina, index: number) {
    if (event.target.checked) {
      this.addMaquina(maquina)
    } else {
      this.removeMaquina(maquina)
    }
  }
  
  pegarProduto(event: any, produto: Inventario, index: number) {
    if (event.target.checked) {
      this.addProduto(produto)
    } else {
      this.removeProduto(produto)
    }
  }

  enviarForm() {
    // this.inventarioService.salvarInventario(this.inventario).subscribe({
    //   next: (data: any) => {
    //     this.inventario = data;
    //     this.goToRoute();
    //     this.formulario.reset();
    //     this.mostrarAlert = true;
    //     this.tipoAlert = "info";
    //     this.message = "Inventário cadastrado com sucesso!";
    //     setTimeout(() => {
    //       this.mostrarAlert = false;
    //     }, 5000);
    //   },
    //   error: (err: any) => {
    //     this.mostrarAlert = true;
    //     this.tipoAlert = "danger";
    //     this.message = "Cadastro não enviado.";
    //     setTimeout(() => {
    //       this.mostrarAlert = false;
    //     }, 5000);
    //   }
    // });
  }

  goToRoute() {
    this.router.navigate(["api/atendimento/criar"]);
  }

  onSubmit() {
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      // this.inventario = this.formulario.value;
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
