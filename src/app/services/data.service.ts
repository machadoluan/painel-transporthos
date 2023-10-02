import { Injectable } from '@angular/core';
import { Dado } from '../dataBase/dados';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dados: Dado[] = [
    {
      "data": "20/02/2023",
      "hora": "12:37",
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
      "data": "25/09/2023",
      "hora": "10:37",
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
      "data": "20/02/2023",
      "hora": "12:37",
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
    }
  ]

  getDados(): Dado[] {
    return this.dados
  }
  constructor() { }
}
