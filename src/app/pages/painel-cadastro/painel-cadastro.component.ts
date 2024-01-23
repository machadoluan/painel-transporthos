import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteService } from 'src/app/services/delete.service';
import { ClientesService } from 'src/app/services/clientes.service';

import { ClienteIdService } from 'src/app/services/cliente-id.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastroModalComponent } from 'src/app/components/cadastro-modal/cadastro-modal.component';
import { DadosIniciaisFormulario } from 'src/app/types/formulario';



interface Cliente {
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
  selectedRow: any;
  clienteSelecionado: any;
  mostrarPopupEditar: boolean | undefined;
  clienteIdSalvo: any;

  constructor(
    private clientesservice: ClientesService,
    private http: HttpClient,
    private deleteService: DeleteService,
    private modalService: NgbModal,
    private clienteIdService: ClienteIdService
  ) { }

  selecionarLinha(cliente: any) {
    this.selectedRow = cliente;
    this.clienteIdService.setClienteSelecionado(cliente); // Define o cliente selecionado no serviço
    this.clienteIdSalvo = this.clienteIdService.getClienteSelecionado();
    console.log('Cliente Service (definido no componente):', this.clienteIdService.getClienteSelecionado());
  }

  removerClienteSelecionado() {
    if (this.selectedRow) {
      const idDoCliente = this.selectedRow.id;
      const confirmarExclusao = window.confirm(`Tem certeza de que deseja remover o cliente ${this.selectedRow.cliente} id: ${idDoCliente}?`);

      if (confirmarExclusao) {
        this.deleteService.removerCliente(idDoCliente).subscribe(
          () => {
            console.log('Cliente removido com sucesso');
            window.alert('Cliente removido com sucesso');
            this.carregarClientes();
            this.selectedRow = null;
          },
          (error) => {
            console.error('Erro ao remover cliente', error);
          }
        );
      }
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

  abrirModalEdicao() {
    const clienteSelecionado: Cliente | undefined = this.clienteIdService.getClienteSelecionado();

    console.log('selecionado ', clienteSelecionado)

    if (clienteSelecionado) {
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
      } = clienteSelecionado;

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
    } else {
      window.alert("Selecione um cliente")
    }
  }

  abrirModalFormulario(isEdit = false, dadosIniciais?: DadosIniciaisFormulario) {
    const modalRef = this.modalService.open(CadastroModalComponent, { size: 'xl' });
    modalRef.componentInstance.setInitialDatas(isEdit, dadosIniciais)
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
