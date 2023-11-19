import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maquina } from 'src/app/models/maquina.models';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  private readonly API = '/api/maquina';

  constructor(private http: HttpClient) { }

  salvarMaquina(record: Maquina[]): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarMaquina(record: Maquina[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  listarMaquina(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(`${this.API}/listar`);
  }

  pegarIdMaquina(id: number): Observable<Maquina> {
    return this.http.get<Maquina>(`${this.API}/listar/${id}`);
  }

  deletarMaquina(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${id}`);
  }
}

