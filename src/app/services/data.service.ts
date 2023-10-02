import { Injectable } from '@angular/core';
import { Dado } from '../dataBase/dados';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dados: Dado[] = [
    {
      "data": new Date(2023, 10, 2),
      "hora": new Date(2023, 10, 2, 14, 13),
      "cliente": "Carlos Santana",
      "qtd": 12,
      "peso": 10,
      "plCavalo": "???",
      "plCarreta": "???",
      "motorista": "João",
      "origem": "Rio de Janeiro",
      "destino": "São Paulo",
      "ajudantes": "Alberto",
      "conferentes": "Sebastião"
    },
    {
      "data": new Date(2023, 9, 25),
      "hora": new Date(2023, 9, 25, 8, 49),
      "cliente": "DIEGO SILVA",
      "qtd": 2,
      "peso": 200,
      "plCavalo": "?????",
      "plCarreta": "???",
      "motorista": "INACIO",
      "origem": "Rio de Janeiro",
      "destino": "São Paulo",
      "ajudantes": "MARIO",
      "conferentes": "LUCIO"
    },
    {
      "data": new Date(2023, 11, 21),
      "hora": new Date(2023, 11, 21, 15, 24),
      "cliente": "Carlos Santana",
      "qtd": 12,
      "peso": 10,
      "plCavalo": "???",
      "plCarreta": "???",
      "motorista": "João",
      "origem": "Rio de Janeiro",
      "destino": "São Paulo",
      "ajudantes": "Alberto",
      "conferentes": "Sebastião"
    },
    {
      "data": new Date(2023, 10, 15),
      "hora": new Date(2023, 10, 15, 10, 8),
      "cliente": "DIEGO SILVA",
      "qtd": 2,
      "peso": 200,
      "plCavalo": "?????",
      "plCarreta": "???",
      "motorista": "INACIO",
      "origem": "Rio de Janeiro",
      "destino": "São Paulo",
      "ajudantes": "MARIO",
      "conferentes": "LUCIO"
    }, {
      "data": new Date(2023, 10, 17),
      "hora": new Date(2023, 10, 17, 11, 20),
      "cliente": "DIEGO SILVA",
      "qtd": 2,
      "peso": 200,
      "plCavalo": "?????",
      "plCarreta": "???",
      "motorista": "INACIO",
      "origem": "Rio de Janeiro",
      "destino": "São Paulo",
      "ajudantes": "MARIO",
      "conferentes": "LUCIO"
    },
    {
      "data": new Date(2023, 10, 17),
      "hora": new Date(2023, 10, 17, 17, 24),
      "cliente": "Carlos Santana",
      "qtd": 12,
      "peso": 10,
      "plCavalo": "???",
      "plCarreta": "???",
      "motorista": "João",
      "origem": "Rio de Janeiro",
      "destino": "São Paulo",
      "ajudantes": "Alberto",
      "conferentes": "Sebastião"
    },
  ]

  getDados(): Dado[] {
    return this.dados
  }
  constructor() { }
}
