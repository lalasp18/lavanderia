import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario } from 'src/app/models/inventario.models';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private readonly API = '/api/inventario';

  constructor(private http: HttpClient) { }

  salvarInventario(record: Inventario[]): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarInventario(record: Inventario[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  listarInventario(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(`${this.API}/listar`);
  }

  pegarIdInventario(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.API}/listar/${id}`);
  }

  deletarInventario(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${id}`);
  }
}

