import { Cliente } from "./cliente.models";
import { Funcionario } from "./funcionario.models";
import { Inventario } from "./inventario.models";
import { Maquina } from "./maquina.models";

export interface Pedido {
    id: number;
    cliente: Cliente;
    tipoLavagem: string;
    status: string;
    maquinas: Array<Maquina>;
    produtos: Array<Inventario>;
    funcionario: Funcionario;
    valorTotal: number;
    entrega: boolean;
    pesoRoupa: number;
}