import { Injectable } from '@angular/core';
import { Cliente } from '../pages/painel-cadastro/painel-cadastro.component'

@Injectable({
  providedIn: 'root'
})
export class ClienteIdService {

  clienteSelecionado: Cliente[] = [];

  constructor() { }

  // Função para limpar quando uma linha for desmarcada.
  limparClientesSelecionados(cliente?: Cliente) {
    if (cliente) {
      const index = this.clienteSelecionado.findIndex((c) => c.id === cliente.id);
      if (index !== -1) {
        this.clienteSelecionado.splice(index, 1);
      }
    } else {
      this.clienteSelecionado = [];
    }
  }

  setClienteSelecionado(cliente: Cliente) {
    this.clienteSelecionado.push(cliente);
    console.log('Cliente adicionado:', cliente);
  }

  getClienteSelecionado() {
    console.log('Clientes selecionados:', this.clienteSelecionado);
    return this.clienteSelecionado;
  }
}
