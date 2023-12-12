import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.models';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly API = '/api/pedido';

  constructor(private http: HttpClient) { }

  salvarPedido(record: Pedido[]): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarPedido(record: Pedido): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }
  
  editarPedidoStatus0(record: Pedido): Observable<Object> {
    return this.http.put(`${this.API}/editar/iniciar`, record);
  }

  editarPedidoStatus1(record: Pedido): Observable<Object> {
    return this.http.put(`${this.API}/editar/andamento`, record);
  }

  editarPedidoStatus2(record: Pedido): Observable<Object> {
    return this.http.put(`${this.API}/editar/concluido`, record);
  }

  listarPedido(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API}/listar`);
  }
  listarPedidoStatus0(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API}/listar/atendimento/inicia`);
  }

  listarPedidoStatus1(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API}/listar/atendimento/andamento`);
  }

  listarPedidoStatus2(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API}/listar/atendimento/concluido`);
  }

  pegarIdPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.API}/listar/${id}`);
  }

  deletarPedido(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${id}`);
  }
}

