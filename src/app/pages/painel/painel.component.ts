import { Component, HostListener, OnInit } from '@angular/core';
import { Dado } from 'src/app/dataBase/dados';
import { DataApiService } from 'src/app/services/data-api.service';
import { DataService } from 'src/app/services/data.service';
import jsPDF from 'jspdf';
const autoTable = require('jspdf-autotable');


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

    if (clientesPorPaginaAntigo !== this.clientesPorPagina) {
      if (this.timeoutId) clearTimeout(this.timeoutId);

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

  //GERAR PDF

  gerarPDF() {
    const doc = new jsPDF('landscape');
    console.log("autoTable function: ", (doc as any).autoTable);

    const columns = [
      { title: "DATA", dataKey: "data" },
      { title: "HORA", dataKey: "hora" },
      { title: "CLIENTE", dataKey: "cliente" },
      { title: "QTD", dataKey: "quantidade" },
      { title: "DI", dataKey: "di" },
      { title: "DTA", dataKey: "dta" },
      { title: "TIPO DE CARGA", dataKey: "tipoDeCarga" },
      { title: "PROCESSO", dataKey: "processo" },
      { title: "CAVALO", dataKey: "pl_Cavalo" },
      { title: "CARRETA", dataKey: "pl_Carreta" },
      { title: "MOTORISTA", dataKey: "motorista" },
      { title: "ORIGEM", dataKey: "origem" },
      { title: "DESTINO", dataKey: "destino" },
      { title: "AJUDANTES", dataKey: "ajudantes" },
      { title: "CONFERENTE", dataKey: "conferentes" },
      { title: "STATUS", dataKey: "status" }
    ];

    console.log("clientesPaginado: ", this.clientes);

    const rows = this.clientes.map(cliente => ({
      data: cliente.data,
      hora: cliente.hora,
      cliente: cliente.cliente,
      quantidade: cliente.quantidade,
      di: cliente.di,
      dta: cliente.dta,
      tipoDeCarga: cliente.tipoDeCarga,
      processo: cliente.processo,
      pl_Cavalo: cliente.pl_Cavalo,
      pl_Carreta: cliente.pl_Carreta,
      motorista: cliente.motorista,
      origem: cliente.origem,
      destino: cliente.destino,
      ajudantes: cliente.ajudantes,
      conferentes: cliente.conferentes,
      status: cliente.status
    }));

    console.log("rows: ", rows);
    rows.forEach(row => console.log(Object.values(row)));

    (doc as any).autoTable({
      head: [columns.map(col => col.title)],
      body: rows.map(row => Object.values(row)),
      styles: { fontSize: 8 },
      theme: 'striped'
    });

    doc.save('painel_transporthos.pdf');
  }


}
