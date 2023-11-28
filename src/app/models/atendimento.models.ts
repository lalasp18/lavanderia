import { Inventario } from "./inventario.models";
import { Maquina } from "./maquina.models";

export interface Atendimento {
    id: number;
    cliente: any;
    status: string;
    maquinas: Array<Maquina>;
    produtos: Array<Inventario>;
    funcionario: any;
    valorTotal: number;
}