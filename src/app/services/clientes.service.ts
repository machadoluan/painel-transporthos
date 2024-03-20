import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'https://transporthos-painel-backend.vercel.app';

  constructor(private http: HttpClient) { }
  obterClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listagemcompleta`);
  }


}
