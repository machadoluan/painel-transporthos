import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private apiUrl = 'https://transporthos-painel-backend.onrender.com';


  constructor(private http: HttpClient) { }

  removerCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}/cliente/${id}`; // Substitua pela rota correta da sua API
    return this.http.delete(url);
  }


}
