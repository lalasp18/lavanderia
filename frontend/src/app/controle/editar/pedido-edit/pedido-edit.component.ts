import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Funcionario } from "src/app/models/funcionario.models";
import { Inventario } from "src/app/models/inventario.models";
import { Maquina } from "src/app/models/maquina.models";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";
import { Cliente } from "src/app/models/cliente.models";
import { Pedido } from "src/app/models/pedido.models";
import { MaquinaService } from "../../criar/maquina/service/maquina.service";
import { InventarioService } from "../../criar/inventario/service/inventario.service";
import { FuncionarioService } from "../../criar/funcionario/service/funcionario.service";
import { ClienteService } from "../../criar/cliente/service/cliente.service";
import { PedidoService } from "../../criar/pedido/service/pedido.service";

@Component({
  selector: "app-pedido-edit",
  templateUrl: "./pedido-edit.component.html",
  styleUrls: ["./pedido-edit.component.scss"]
})
export class PedidoEditComponent implements OnInit, OnDestroy {

  pedidoID!: Pedido;
  pedidoEditado!: Pedido;
  funcionarioList: Funcionario[]=[];
  maquinaList: Maquina[]=[];
  produtoList: Inventario[]=[];
  clienteList: Cliente[]=[];

  formulario: FormGroup;
  unsubscribe$!: Subscription;
  unsubscribe$Prod!: Subscription;
  unsubscribe$Maq!: Subscription;
  unsubscribe$Cli!: Subscription;
  unsubscribe$Func!: Subscription;

  orcamento: number = 0;
  adicionouFrete!: boolean;

  mostrarAlert: boolean = false;
  mostrarSpin: boolean = false;
  message: string = "";
  tipoAlert: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
      status: [null, [Validators.required]],
      dtPedido: [null, [Validators.required]],
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
        },
        error: (err: any) => {
          this.tipoAlert = 'danger'
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
          this.tipoAlert = 'danger'
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
          this.tipoAlert = 'danger'
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
          this.tipoAlert = 'danger'
          this.mostrarAlert = true
          this.message = "Dados não encontrados.";
        }
    });

    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.pedidoService.pegarIdPedido(id)
      .subscribe({
        next: (data:any) => {
          this.pedidoID = data;

          this.formulario.get("id")?.setValue(this.pedidoID.id);
          this.formulario.get("cliente")?.setValue(this.pedidoID.cliente);
          // this.formulario.get("tipoLavagem")?.setValue(this.pedidoID.tipoLavagem);
          this.formulario.get("status")?.setValue(this.pedidoID.status);
          this.formulario.get("dtPedido")?.setValue(this.pedidoID.dtPedido);
          this.formulario.get("maquinas")?.patchValue(this.pedidoID.maquinas);
          this.formulario.get("produtos")?.patchValue(this.pedidoID.produtos);
          this.formulario.get("funcionario")?.setValue(this.pedidoID.funcionario);
          this.formulario.get("valorTotal")?.setValue(this.pedidoID.valorTotal);
          this.formulario.get("entrega")?.setValue(this.pedidoID.entrega);
          this.formulario.get("pesoRoupa")?.setValue(this.pedidoID.pesoRoupa);
          
          this.orcamento = this.pedidoID.valorTotal;
          const selCli = document.getElementById('selectCliente') as HTMLInputElement;
          selCli.value = this.pedidoID.cliente.id.toString();
          const selFun = document.getElementById('selectFuncionario') as HTMLInputElement;
          selFun.value = this.pedidoID.funcionario.id.toString();
          if(this.pedidoID.entrega){
            this.adicionouFrete = true;
            const radioElementS = document.getElementById("flexRadioSim") as HTMLInputElement;
            radioElementS.checked = true;
          } else {
            this.adicionouFrete = false;
            const radioElementN = document.getElementById("flexRadioNao") as HTMLInputElement;
            radioElementN.checked = true;
          }
          
          for(let i = 0; i < this.maquinaList.length; i++) {
            for (let maq of this.pedidoID.maquinas) {
              if(this.maquinaList[i].id == maq.id) {
                const dropM = document.getElementById("flexMaquina"+i) as HTMLInputElement;
                dropM.checked = true;
              }
            }
          }
          
          for(let i = 0; i < this.produtoList.length; i++) {
            for (let pro of this.pedidoID.produtos) {
              if(this.produtoList[i].id == pro.id) {
                const dropP = document.getElementById("flexProduto"+i) as HTMLInputElement;
                dropP.checked = true;
              }
            }
          }
        },
        error: (err: any) => {
          this.tipoAlert = 'danger'
          this.mostrarAlert = true
          this.message = 'Dados do pedido não foram encontrados! Servidor não está respondendo.'
        }
      })
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
    this.pedidoService.editarPedido(this.pedidoEditado).subscribe({
      next: (data: any) => {
        this.pedidoEditado = data;
        this.goToRoute();
        this.formulario.reset();
        this.tipoAlert = 'success'
        this.mostrarAlert = true
        this.mostrarSpin = true
        this.message = "Pedido editado com sucesso!";
        setTimeout(() => {
          this.router.navigate(['listar/pedidos']);
        }, 5000);
      },
      error: (err: any) => {
        this.tipoAlert = 'danger'
        this.mostrarAlert = true
        this.message = "Edição não enviada.";
      }
    });
  }

  goToRoute() {
    this.router.navigate(["api/pedido/criar"]);
  }

  onSubmit() {
    this.formulario.get('valorTotal')?.setValue(this.orcamento);
    if (this.formulario.valid) {
      this.pedidoEditado = this.formulario.value;
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
