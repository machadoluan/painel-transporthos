import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteIdService {

  clienteSelecionado: any;

  setClienteSelecionado(cliente: any) {
    this.clienteSelecionado = cliente.id;
  }

  getClienteSelecionado() {
    return this.clienteSelecionado;
  }

  constructor() { }
}
