import { Component, OnInit } from '@angular/core';
import { Dado } from 'src/app/dataBase/dados';
import { DataApiService } from 'src/app/services/data-api.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {


  dados: Dado[] = []

  clientes: any[] = [];


  usuariosFiltrados: any[] = [];
  termoDeBusca: string = '';



  constructor(private dataService: DataService, private clienteService: DataApiService) { }

  ngOnInit(): void {
    // this.dados = this.dataService.getDados()
    // this.usuariosFiltrados = this.dados

    // this.filtrarEOrdenarDados()

    this.clienteService.listarClientes().subscribe((data: any) => {
      this.clientes = data;
    });



  }




  // onInputChange(): void {
  //   // this.usuariosFiltrados = this.dados.filter(usuario =>
  //   //   usuario.cliente.toLowerCase().includes(this.termoDeBusca.toLowerCase())
  //   // );
  //   // this.filtrarEOrdenarDados()




  // }


  // formatarData(data: Date): string {
  //   if (!data) {
  //     return ''; // Tratar casos em que a data está ausente ou inválida
  //   }

  //   const options: Intl.DateTimeFormatOptions = {
  //     day: 'numeric',
  //     month: 'short',
  //     year: 'numeric',
  //   };

  //   return new Intl.DateTimeFormat('pt-BR', options).format(data);
  // }

  // formatarHora(hora: Date): string {
  //   if (!hora) {
  //     return ''; // Tratar casos em que a hora está ausente ou inválida
  //   }

  //   const options: Intl.DateTimeFormatOptions = {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   };

  //   return new Intl.DateTimeFormat('pt-BR', options).format(hora);
  // }



  // filtrarEOrdenarDados(): void {
  //   // Aplicar filtragem aqui com base no termo de busca, se necessário
  //   // ...

  //   // Ordenar os dados por data e hora
  //   this.usuariosFiltrados.sort((a, b) => {
  //     const dataHoraA = new Date(a.data);
  //     dataHoraA.setHours(a.hora.getHours(), a.hora.getMinutes(), 0, 0);
  //     const dataHoraB = new Date(b.data);
  //     dataHoraB.setHours(b.hora.getHours(), b.hora.getMinutes(), 0, 0);
  //     return dataHoraA.getTime() - dataHoraB.getTime();
  //   });


  //   // Formatar as datas e horas
  //   this.usuariosFiltrados.forEach(item => {
  //     item.dataFormatada = this.formatarData(item.data);
  //     item.horaFormatada = this.formatarHora(item.hora);
  //   });




  // }
}
