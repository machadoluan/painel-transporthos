import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteService } from 'src/app/services/delete.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { ClienteIdService } from 'src/app/services/cliente-id.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroModalComponent } from 'src/app/components/cadastro-modal/cadastro-modal.component';
import { PopUpModalComponent } from 'src/app/pages/follow-up/follow-up.component';
import { DadosIniciaisFormulario } from 'src/app/types/formulario';
import { DownloadModalComponent } from 'src/app/download-modal/download-modal.component';
import { PdfComponent } from '../pdf/pdf.component';


export interface Cliente {
  id: number;
  cliente: string;
  ajudantes: string;
  conferentes?: string;
  conferente?: string;
  data: string;
  destino: string;
  di: string;
  dta: string;
  hora: string;
  motorista: string;
  origem: string;
  pl_carreta?: string;
  pl_cavalo?: string;
  plCarreta: string;
  plCavalo?: string;
  processo: string;
  quantidade: number;
  status: string;
  tipoDeCarga: string;
}

@Component({
  selector: 'app-painel-cadastro',
  templateUrl: './painel-cadastro.component.html',
  styleUrls: ['./painel-cadastro.component.css'],
})

export class PainelCadastroComponent implements OnInit {
  clientes: any[] = [];
  termoDeBusca: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  alternarCores: boolean = true;
  selectedRows: Cliente[] = [];;
  clienteSelecionado: any;
  mostrarPopupEditar: boolean | undefined;
  clienteIdSalvo: any;
  selectedRow: any;


  constructor(
    private clientesservice: ClientesService,
    private http: HttpClient,
    private deleteService: DeleteService,
    private modalService: NgbModal,
    private clienteIdService: ClienteIdService,
    private toastr: ToastrService
  ) { }

  selecionarLinha(cliente: Cliente) {
    const index = this.selectedRows.findIndex((row) => row.id === cliente.id);
    if (index === -1) {
      this.selectedRows.push(cliente);
      this.clienteIdService.setClienteSelecionado(cliente);
    } else {
      this.selectedRows.splice(index, 1);
      this.clienteIdService.limparClientesSelecionados(cliente);
    }
  }


  isClienteSelecionado(cliente: Cliente): boolean {
    return this.selectedRows.some((row) => row.id === cliente.id);
  }


  removerClienteSelecionado() {
    if (this.selectedRows.length > 0) {
      const confirmarExclusao = window.confirm(`Tem certeza de que deseja remover os clientes selecionados?`);

      if (confirmarExclusao) {
        // Mapeia os IDs dos clientes selecionados
        const idsDosClientes = this.selectedRows.map(cliente => cliente.id);

        // Remove os clientes selecionados um por um
        idsDosClientes.forEach(idDoCliente => {
          this.deleteService.removerCliente(idDoCliente).subscribe(
            () => {
              console.log(`Cliente com ID ${idDoCliente} removido com sucesso`);
              // Remove o cliente da lista de clientes após a exclusão
              this.clientes = this.clientes.filter(cliente => cliente.id !== idDoCliente);
            },
            (error) => {
              console.error(`Erro ao remover cliente com ID ${idDoCliente}`, error);
            }
          );
        });

        // Limpa a lista de clientes selecionados após a exclusão
        this.selectedRows = [];
        window.alert('Clientes removidos com sucesso');
      }
    } else {
      window.alert('Nenhum cliente selecionado para exclusão');
    }
  }


  paginaAlterada(event: any): void {
    this.currentPage = event;
    this.buscarClientes();
  }

  buscarClientes() {
    const params = {
      busca: this.termoDeBusca,
      page: this.currentPage,
      pageSize: this.itemsPerPage,
    };

    this.http
      .get<any[]>('https://transporthos-painel-backend.vercel.app/buscar', { params })
      .subscribe((response) => {
        this.clientes = response;
        this.totalItems = response.length;
        this.alternarCores = !this.alternarCores;
      });
  }

  abrirModalCadastro() {
    this.abrirModalFormulario();
  }


  // Abrindo follow up

  abrirPopUp() {
    if (this.selectedRows.length === 1) {
      const primeiroClienteSelecionado = this.selectedRows[0]; // Obtém o primeiro cliente do array

      // Extrair os dados do primeiro cliente selecionado
      const {
        id,
        cliente,
        data,
        hora,
        quantidade,
        ajudantes,
        conferentes,
        conferente,
        destino,
        di,
        dta,
        motorista,
        origem,
        pl_carreta,
        pl_cavalo,
        plCarreta,
        plCavalo,
        processo,
        status,
        tipoDeCarga
      } = primeiroClienteSelecionado;

      // Criar um objeto de dados iniciais do formulário
      const dadosIniciaisFormulario: DadosIniciaisFormulario = {
        id,
        cliente,
        data,
        hora,
        qtd: String(quantidade),
        di,
        dta,
        tipo_de_carga: tipoDeCarga,
        processo,
        pl_cavalo: pl_cavalo || plCavalo,
        pl_carreta: pl_carreta || plCarreta,
        motorista,
        origem,
        destino,
        ajudantes,
        conferente: conferentes || conferente,
        selectedStatus: status
      };

      // Chamar o método para abrir o modal com os dados do cliente selecionado
      this.abrirModalPopUp(true, dadosIniciaisFormulario);
    } else if (this.selectedRows.length > 1) {
      this.toastr.error("Você só pode selecionar um de cada vez!");
    } else {
      window.alert("Nenhum cliente selecionado");
    }
  }



  abrirModalPopUp(isEdit = false, dadosIniciais?: DadosIniciaisFormulario) {
    const modalRef = this.modalService.open(PopUpModalComponent, { size: 'xl' });
    modalRef.componentInstance.setInitialDatas(isEdit, dadosIniciais)
  }

  abrirModalEdicao() {
    if (this.selectedRows.length === 1) {
      const primeiroClienteSelecionado = this.selectedRows[0];

      const {
        id,
        cliente,
        data,
        hora,
        quantidade,
        ajudantes,
        conferentes,
        conferente,
        destino,
        di,
        dta,
        motorista,
        origem,
        pl_carreta,
        pl_cavalo,
        plCarreta,
        plCavalo,
        processo,
        status,
        tipoDeCarga
      } = primeiroClienteSelecionado;

      const dadosIniciaisFormulario: DadosIniciaisFormulario = {
        id,
        cliente,
        data,
        hora,
        qtd: String(quantidade),
        di,
        dta,
        tipo_de_carga: tipoDeCarga,
        processo,
        pl_cavalo: pl_cavalo || plCavalo,
        pl_carreta: pl_carreta || plCarreta,
        motorista,
        origem,
        destino,
        ajudantes,
        conferente: conferentes || conferente,
        selectedStatus: status
      };
      this.abrirModalFormulario(true, dadosIniciaisFormulario);
    } else if (this.selectedRows.length > 1) {
      this.toastr.error("Você só pode selecionar um de cada vez!");
    } else {
      window.alert("Nenhum cliente selecionado");
    }
  }

  abrirModalFormulario(isEdit = false, dadosIniciais?: DadosIniciaisFormulario) {
    const modalRef = this.modalService.open(CadastroModalComponent, { size: 'xl' });
    modalRef.componentInstance.setInitialDatas(isEdit, dadosIniciais)
  }


  // Abrir o download pdf. com todos que estiver selecionado.

  abrirPDF(): void {
    const clientesSelecionados = this.clienteIdService.getClienteSelecionado();

    console.log('Clientes selecionados:', clientesSelecionados);

    if (clientesSelecionados.length > 0) {
      // Acumula as informações dos clientes selecionados em uma única variável
      const dadosClientes: DadosIniciaisFormulario[] = clientesSelecionados.map(cliente => {
        return {
          id: cliente.id,
          cliente: cliente.cliente,
          data: cliente.data,
          hora: cliente.hora,
          qtd: String(cliente.quantidade),
          di: cliente.di,
          dta: cliente.dta,
          tipo_de_carga: cliente.tipoDeCarga,
          processo: cliente.processo,
          pl_cavalo: cliente.pl_cavalo || cliente.plCavalo,
          pl_carreta: cliente.pl_carreta || cliente.plCarreta,
          motorista: cliente.motorista,
          origem: cliente.origem,
          destino: cliente.destino,
          ajudantes: cliente.ajudantes,
          conferente: cliente.conferentes || cliente.conferente,
          selectedStatus: cliente.status
        };
      });

      // Abre o modal com todas as informações dos clientes selecionados
      this.abrirModalpdf(true, dadosClientes);
    } else {
      window.alert("Nenhum cliente selecionado");
    }
  }


  abrirModalpdf(isEdit = false, dadosClientes?: DadosIniciaisFormulario[]) {
    const modalRef = this.modalService.open(PdfComponent, { size: 'xl' });
    modalRef.componentInstance.setInitialDatas(isEdit, dadosClientes);
  }

  abrirJanelaDoPainel() {
    const token = localStorage.getItem('token');
    const url = `/listagem?token=${token}`;
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientesservice.obterClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
      },
      (error) => {
        console.error('Erro ao obter a lista de clientes', error);
      }
    );
  }

  stopPropagation(event: any) {
    event.stopPropagation()
  }

  updateStatus(cliente: Cliente, status: string) {
    const { id, data, hora, tipoDeCarga, pl_cavalo, pl_carreta, plCavalo, plCarreta, conferentes, conferente, ...clienteProps } = cliente;

    this.http.put(`https://transporthos-painel-backend.vercel.app/cliente/${cliente.id}`, {
      ...clienteProps,
      status,
      dataAbreviada: cliente.data,
      horaAbreviada: cliente.hora,
      tipo_de_carga: cliente.tipoDeCarga,
      pl_cavalo: cliente.pl_cavalo || cliente.plCavalo,
      pl_carreta: cliente.pl_carreta || cliente.plCarreta,
      conferente: cliente.conferentes || cliente.conferente,
    })
      .subscribe(
        (response: any) => {
          const defaultMessage = 'Status alterado com sucesso';
          console.log(defaultMessage, response);
          window.alert(response.Mensagem || defaultMessage);
          location.reload();
        },
        (error: any) => {
          const defaultMessage = 'Erro ao alterar status';
          console.error(defaultMessage, error.error);
          window.alert(error.error.Mensagem || defaultMessage);
        }
      );
  }
}
