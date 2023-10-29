import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteSelecionadoServiceService {
  clienteSelecionado: any;

  setClienteSelecionado(cliente: any) {
    this.clienteSelecionado = cliente;
  }

  getClienteSelecionado() {
    return this.clienteSelecionado;
  }
  constructor() { }
}
