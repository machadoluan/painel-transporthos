import { Component, HostListener, OnInit } from '@angular/core';
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
  clientesPaginado: any[] = [];
  clientesPorPagina = 0;

  usuariosFiltrados: any[] = [];
  termoDeBusca: string = '';

  alturaDisponivelNaTabela = window.innerHeight - 150;

  timeoutId: any;

  constructor(private dataService: DataService, private clienteService: DataApiService) { }

  ngOnInit(): void {
    // this.dados = this.dataService.getDados()
    // this.usuariosFiltrados = this.dados

    // this.filtrarEOrdenarDados()

    this.obterNumeroDeClientesPorPagina();

    this.iniciarPainel();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.alturaDisponivelNaTabela = window.innerHeight - 150;

    const clientesPorPaginaAntigo = this.clientesPorPagina;

    this.obterNumeroDeClientesPorPagina();

    if(clientesPorPaginaAntigo !== this.clientesPorPagina) {
      if(this.timeoutId) clearTimeout(this.timeoutId);

      this.iniciarPainel()
    };
  }

  obterNumeroDeClientesPorPagina() {
    const alturaDaLinha = 100;

    this.clientesPorPagina = Math.floor(this.alturaDisponivelNaTabela / alturaDaLinha);
  }

  paginacaoAutomatica(pagina: number) {
    const primeiroIndex = (pagina - 1) * this.clientesPorPagina;
    const ultimoIndex = (primeiroIndex - 1) + this.clientesPorPagina;

    const primeiraPagina = pagina === 1;
    const ultimaPagina = (ultimoIndex + 1) >= this.clientes.length;

    this.clientesPaginado = this.clientes.filter((_, index) => index >= primeiroIndex && index <= ultimoIndex);

    this.timeoutId = setTimeout(() => ultimaPagina ? this.iniciarPainel() : this.paginacaoAutomatica(pagina + 1), primeiraPagina ? 30000 : 15000);
  }

  iniciarPainel() {
    this.clienteService.listarClientes().subscribe((data: any) => {
      this.clientes = data || [];

      console.log("clientes: ", this.clientes);

      this.paginacaoAutomatica(1);
    });
  }

  obterAlturaDaLinha() {
    const alturaMaxima = 150;
    const altura = this.alturaDisponivelNaTabela / this.clientesPorPagina;

    return altura > alturaMaxima ? alturaMaxima : altura
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
