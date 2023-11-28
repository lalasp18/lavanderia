import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'api/cliente';

  constructor(private http: HttpClient) { }

  salvarCliente(record: Cliente): Observable<Object> {
    return this.http.post(`${this.API}`, record);
  }

  editarCliente(record: Cliente): Observable<Object> {
    return this.http.put(`${this.API}`, record);
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.API}`);
  }

  pegarIdCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/${id}`);
  }

  deletarCliente(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
