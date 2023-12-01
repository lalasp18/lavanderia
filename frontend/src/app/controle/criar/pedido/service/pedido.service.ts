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

  editarPedido(record: Pedido[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  listarPedido(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API}/listar`);
  }

  pegarIdPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.API}/listar/${id}`);
  }

  deletarPedido(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${id}`);
  }
}

