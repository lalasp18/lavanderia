import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario.models';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly API = 'api/funcionario';

  constructor(private http: HttpClient) { }

  salvarFuncionario(record: Funcionario[]): Observable<Object> {
    return this.http.post(`${this.API}`, record);
  }

  editarFuncionario(record: Funcionario[]): Observable<Object> {
    return this.http.put(`${this.API}`, record);
  }

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.API}`);
  }

  pegarIdFuncionario(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.API}/${id}`);
  }

  deletarFuncionario(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
