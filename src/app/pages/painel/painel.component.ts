import { Component, OnInit } from '@angular/core';
import { Dado } from 'src/app/dataBase/dados';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  dados: Dado[] = []


  usuariosFiltrados: any[] = [];
  termoDeBusca: string = '';



  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dados = this.dataService.getDados()
    this.usuariosFiltrados = this.dados
  }

  onInputChange(): void {
    this.usuariosFiltrados = this.dados.filter(usuario =>
      usuario.cliente.toLowerCase().includes(this.termoDeBusca.toLowerCase())
    );


  }


}
