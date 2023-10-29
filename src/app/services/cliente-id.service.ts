import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteIdService {

  clienteSelecionado: any;



  constructor() { }

  setClienteSelecionado(cliente: any) {
    this.clienteSelecionado = cliente;
    console.log('Cliente definido no serviço:', this.clienteSelecionado);
  }

  getClienteSelecionado() {
    console.log('Cliente recuperado do serviço:', this.clienteSelecionado);
    return this.clienteSelecionado;
  }
}
