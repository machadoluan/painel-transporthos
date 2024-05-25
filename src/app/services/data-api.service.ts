import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private apiUrl = 'https://transporthos-painel-backend.onrender.com';

  constructor(private http: HttpClient) { }

  listarClientes() {
    return this.http.get(`${this.apiUrl}/clientes`);
  }

}
