import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/item.models';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private readonly API = '/api/item';

  constructor(private http: HttpClient) { }

  salvarInventario(record: Item[]): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarInventario(record: Item[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  listarInventario(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.API}/listar`);
  }

  pegarIdInventario(idItem: number): Observable<Item> {
    return this.http.get<Item>(`${this.API}/listar/${idItem}`);
  }

  deletarInventario(idItem: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${idItem}`);
  }
}

