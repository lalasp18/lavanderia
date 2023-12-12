import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Funcionario } from "src/app/models/funcionario.models";
import { Inventario } from "src/app/models/inventario.models";
import { Maquina } from "src/app/models/maquina.models";
import { MaquinaService } from "../maquina/service/maquina.service";
import { InventarioService } from "../inventario/service/inventario.service";
import { FuncionarioService } from "../funcionario/service/funcionario.service";
import { ClienteService } from "../cliente/service/cliente.service";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";
import { Cliente } from "src/app/models/cliente.models";
import { Pedido } from "src/app/models/pedido.models";
import { PedidoService } from "./service/pedido.service";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.component.html",
  styleUrls: ["./pedido.component.scss"]
})
export class PedidoComponent implements OnInit, OnDestroy {

  pedido: Pedido[] = [];
  funcionarioList: Funcionario[]=[];
  maquinaList: Maquina[]=[];
  produtoList: Inventario[]=[];
  clienteList: Cliente[]=[];

  formulario: FormGroup;
  unsubscribe$Prod!: Subscription;
  unsubscribe$Maq!: Subscription;
  unsubscribe$Cli!: Subscription;
  unsubscribe$Func!: Subscription;

  orcamento: number = 0;
  adicionouFrete: boolean = false;

  mostrarAlert: boolean = false;
  mostrarSpin: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private maquinaService: MaquinaService,
    private inventarioService: InventarioService,
    private funcionarioService: FuncionarioService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService
  ) {
    this.formulario = this.formBuilder.group({
      id: [null],
      cliente: [null, [Validators.required]],
      // tipoLavagem: [null, [Validators.required]],
      dtPedido: [null, [Validators.required]],
      status: [null, [Validators.required]],
      maquinas: this.formBuilder.array([]),
      produtos: this.formBuilder.array([]),
      funcionario: [null, [Validators.required]],
      valorTotal: [null, [Validators.required]],
      entrega: [null, [Validators.required]],
      pesoRoupa: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    
    this.unsubscribe$Prod = this.inventarioService.listarInventario()
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.produtoList = data;

          const total = document.getElementById('inputValor') as HTMLInputElement;
          total.valueAsNumber = 0;

          const dataEfet = document.getElementById('inputDt') as HTMLInputElement;
          dataEfet.valueAsDate = new Date();
          this.formulario.get('dtPedido')?.setValue(dataEfet.value);
        },
        error: (err: any) => {
          this.tipoAlert = 'info'
          this.mostrarAlert = true
          this.message = "Dados não encontrados.";
        }
    });

    this.unsubscribe$Maq = this.maquinaService.listarMaquina()
      .subscribe({
        next: (maquinas: any) => {
          const data = maquinas;
          this.maquinaList = data;
        },
        error: (err: any) => {
          this.tipoAlert = 'info'
          this.mostrarAlert = true
          this.message = "Dados não encontrados.";
        }
    });

    this.unsubscribe$Func = this.funcionarioService.listarFuncionarios()
      .subscribe({
        next: (funcionarios: any) => {
          const data = funcionarios;
          this.funcionarioList = data;
        },
        error: (err: any) => {
          this.tipoAlert = 'info'
          this.mostrarAlert = true
          this.message = "Dados não encontrados.";
        }
    });

    this.unsubscribe$Cli = this.clienteService.listarClientes()
      .subscribe({
        next: (clientes: any) => {
          const data = clientes;
          this.clienteList = data;
        },
        error: (err: any) => {
          this.tipoAlert = 'info'
          this.mostrarAlert = true
          this.message = "Dados não encontrados.";
        }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$Prod.unsubscribe();
    this.unsubscribe$Maq.unsubscribe();
    this.unsubscribe$Func.unsubscribe();
  }

  onChange(event: any) {
    if (event.target.id === 'flexRadioSim' && !this.adicionouFrete) {
      this.formulario.get('entrega')?.setValue(true);
      this.orcamento += 3;
      this.adicionouFrete = true;
    } else if(this.adicionouFrete) {
      this.formulario.get('entrega')?.setValue(false);
      this.orcamento -= 3;
      this.adicionouFrete = false;
    } else {
      this.orcamento += 0;
    }
  }

  getMaquina(): FormArray {
    return this.formulario.get('maquinas') as FormArray;
  }

  addMaquina(maquina: Maquina) {
    this.getMaquina().push(new FormControl(maquina));
  }

  removeMaquina(maquina: Maquina) {
    const maquinasArray = this.getMaquina();
    const index = maquinasArray.controls.findIndex((control:any) => control.value === maquina);

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
    const index = produtosArray.controls.findIndex((control: any) => control.value === produto);

    if (index !== -1) {
      produtosArray.removeAt(index);
    } else {
      console.error('Produto não encontrado no FormArray.');
    }
  }
  
  pegarCliente(event: any) {
    let clienteSelecionado = event.target.value;

    if (clienteSelecionado) {
      this.clienteService.pegarIdCliente(clienteSelecionado).subscribe({
        next: (dir: any) => {
          clienteSelecionado = dir;
          this.formulario.get("cliente")?.setValue(clienteSelecionado);
        }
      })
    }
  }
  
  pegarFuncionario(event: any) {
    let funcionarioSelecionado = event.target.value;

    if (funcionarioSelecionado) {
      this.funcionarioService.pegarIdFuncionario(funcionarioSelecionado).subscribe({
        next: (dir: any) => {
          funcionarioSelecionado = dir;
          this.formulario.get("funcionario")?.setValue(funcionarioSelecionado);
          this.orcamento += 8.51;
        }
      })
    }
  }
  
  pegarMaquina(event: any, maquina: Maquina) {
    if (event.target.checked) {
      this.addMaquina(maquina)
      this.orcamento += maquina.valor;
    } else {
      this.removeMaquina(maquina)
      this.orcamento -= maquina.valor;
    }
  }
  
  pegarProduto(event: any, produto: Inventario) {
    if (event.target.checked) {
      this.addProduto(produto)
      this.orcamento += produto.valor;
    } else {
      this.removeProduto(produto)
      this.orcamento -= produto.valor;
    }
  }

  enviarForm() {
    this.pedidoService.salvarPedido(this.pedido).subscribe({
      next: (data: any) => {
        this.pedido = data;
        this.goToRoute();
        this.formulario.reset();
        this.tipoAlert = 'info'
        this.mostrarAlert = true
        this.mostrarSpin = true
        this.message = "Pedido cadastrado com sucesso!";
        setTimeout(() => {
          this.router.navigate(['listar/pedidos']);
        }, 5000);
      },
      error: (err: any) => {
        this.tipoAlert = 'danger'
        this.mostrarAlert = true
        this.message = "Cadastro não enviado.";
      }
    });
  }

  goToRoute() {
    this.router.navigate(["api/pedido/criar"]);
  }

  onSubmit() {
    this.formulario.get('status')?.setValue(0);
    this.formulario.get('valorTotal')?.setValue(this.orcamento);
    if (this.formulario.valid) {
      this.pedido = this.formulario.value;
      this.enviarForm();
      this.orcamento = 0;
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      this.tipoAlert = 'warning'
      this.mostrarAlert = true
      this.message = "Informação inválida. Preencha os campos!";
    }
  }
}
