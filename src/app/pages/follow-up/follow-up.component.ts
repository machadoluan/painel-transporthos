import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosIniciaisFormulario } from 'src/app/types/formulario';
import { ElementRef, ViewChild } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DownloadModalComponent } from 'src/app/download-modal/download-modal.component';
import { SharedService } from 'src/app/services/shared.service';
import { PainelCadastroComponent } from '../painel-cadastro/painel-cadastro.component';


@Component({
  selector: 'app-home',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})

export class PopUpModalComponent implements OnInit {


  @ViewChild('content', { static: false }) el!: ElementRef;

  isEdit: boolean = false;

  // Propriedades para armazenar os dados do formulário
  id?: number;
  data: string = '';
  hora: string = '';
  userEmail: string = ""
  cliente: string = '';
  qtd: string = '';
  di: string = '';
  dta: string = '';
  tipo_de_carga: string = '';
  pl_cavalo: string = '';
  pl_carreta: string = '';
  motorista: string = '';
  origem: string = '';
  destino: string = '';
  selectedStatus: string = '';
  selectedInform: string = '';
  statusSelected: boolean = false;
  emailInvalid: boolean = false;
  selectedInvalid: boolean = false;
  ajudantes: string = '';
  conferente: string = '';
  processo: string = '';
  cnpj: string = '';
  // ...

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private emailService: EmailService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {

  }

  setInitialDatas(isEdit: boolean, dadosIniciais?: DadosIniciaisFormulario) {
    console.log('chegou: ', dadosIniciais)

    function formatDate(date: string) {
      if (!date) return '';

      const [day, month, year] = date.split('/');

      const formattedDay = day.length < 2 ? '0' + day : day;
      const formattedMonth = month.length < 2 ? '0' + month : month;

      return `${year}-${formattedMonth}-${formattedDay}`
    }

    function formatHour(hour: string) {
      if (!hour) return '';

      const [hours, minutes] = hour.split(':')

      const formattedHours = hours.length < 2 ? '0' + hours : hours;
      const formattedMinutes = minutes.length < 2 ? '0' + minutes : minutes;

      return `${formattedHours}:${formattedMinutes}`
    }

    this.isEdit = isEdit;

    const {
      id,
      data,
      hora,
      cliente,
      qtd,
      di,
      dta,
      tipo_de_carga,
      processo,
      pl_cavalo,
      pl_carreta,
      motorista,
      origem,
      destino,
      ajudantes,
      conferente,
      selectedStatus,
      cnpj
    } = dadosIniciais || {};

    this.id = id;
    this.data = formatDate(data || '');
    this.hora = formatHour(hora || '');
    this.cliente = cliente || '';
    this.qtd = qtd || '';
    this.di = di || '';
    this.dta = dta || '';
    this.tipo_de_carga = tipo_de_carga || '';
    this.processo = processo || '';
    this.pl_cavalo = pl_cavalo || '';
    this.pl_carreta = pl_carreta || '';
    this.motorista = motorista || '';
    this.origem = origem || '';
    this.destino = destino || '';
    this.ajudantes = ajudantes || '';
    this.conferente = conferente || '';
    this.selectedStatus = selectedStatus || '';
    this.cnpj = cnpj || '';
  }

  closeModal() {
    this.activeModal.close()
  }

  historicoInformacoes: any[] = [];

  enviarEmail() {

    console.log('Enviando e-mail...');

    const dataSplit = this.data.split('-'); // Divide a data em ano, mês e dia
    const dd = dataSplit[2];
    const mm = dataSplit[1];
    const aaaa = dataSplit[0];
    const dataFormatada = `${dd}/${mm}/${aaaa}`;


    this.emailInvalid = !this.validateEmail(this.userEmail)
    this.selectedInvalid = !this.statusSelected

    if (!this.emailInvalid && !this.selectedInvalid) {
      // Cria um objeto com os dados do cadastro
      const registrationData = {
        ataAbreviada: dataFormatada,
        horaAbreviada: this.hora,
        cliente: this.cliente,
        qtd: this.qtd,
        tipo_de_carga: this.tipo_de_carga,
        origem: this.origem,
        destino: this.destino,
        selectedStatus: this.selectedStatus,
        selectedInform: this.selectedInform,
        processo: this.processo,
        data: this.data,
        hora: this.hora,
        cnpj: this.cnpj
      };


      // Variavel modelo email.

      const emailBody = `<head>
      <style>
        /* Reset */
        :root {
            --color-text-inform: #000;
            --color-text: #454d53;
            --color-background: #d9d9d9;
            --color-inform: #f8be8e;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: sans-serif;
        }



        /* Header */

        header {
            overflow: hidden;
            /* Limpar o float */
            padding: 10px;
            background-color: #fff;
        }

        header img {
            width: 100px;
            float: left;
        }

        header .titulo {
            padding-top: 20px;
            float: right;
            padding-right: 400px;
        }

        /* Conteúdo */
        .container_inform {
            margin: 2% 0;
            overflow: hidden;
            /* Limpar o float */
        }

        .informs,
        .inform_2 {
            width: 50%;
            float: left;
            box-sizing: border-box;
        }

        .cliente_processo, .doc {
            background-color: #fff;
            border: 4px solid #fff;
            margin-bottom: 10px;
        }

        .cliente,
        .processo,
        .doc {
            overflow: hidden;
            /* Limpar o float */
        }

        .inform-descr,
        .inform-cliente {
            width: 50%;
            box-sizing: border-box;
            float: left;
            text-align: center;
            margin-bottom: 7px;
        }

        .inform-descr {
            background-color: #f8be8e;
            padding: 5px 0;
        }

        .inform-cliente {
            padding: 5px 0;
            background-color: rgba(217, 217, 217, 0.5);
            color: #454d53;
        }

        /* Segundo Painel Informações */

        .container_inform_2 {
            padding: 0 0 50px 0;
            background-color: #fff;
            overflow: hidden;
            /* Limpar o float */
            border: 4px solid #fff;
        }

        .titulo-desc {
            padding: 2px;
            font-weight: bold;
            background-color: #f8be8e;
        }

        .continer {
            text-align: center;
            width: 25%;
            float: left;
            box-sizing: border-box;
        }

        .inform {
            margin-top: 10px;
        }

        .lorem {
            padding: 2px 0px;
            background-color: rgba(217, 217, 217, 0.5);
            color: #454d53;
        }
    </style>

</head>

<div class="container_principal">
    <header>
        <div class="logo">
            <img src="https://github.com/flaviopcsilva/painel-transporthos/blob/main/src/assets/transporthos.png?raw=true" alt="logo-img">
        </div>
        <div class="titulo">
            <h1>FOLLOW UP</h1>
        </div>
    </header>

    <div class="container_inform">
        <div class="informs">
            <div class="cliente_processo">
                <div class="cliente">
                    <div class="inform-descr">Cliente:</div>
                    <div class="inform-cliente">${this.cliente}</div>
                </div>
                <div class="cnpj">
                    <div class="inform-descr">CNPJ:</div>
                    <div class="inform-cliente">${this.cnpj}</div>
                </div>
                <div class="processo">
                    <div class="inform-descr">Processo:</div>
                    <div class="inform-cliente">${this.processo}</div>

                </div>
            </div>

            <div class="doc">
                <div class="inform-descr">Documento:</div>
                <div class="inform-cliente">${this.di}</div>
            </div>
        </div>

        <div class="inform_2">
            <div class="cliente_processo">
                <div class="cliente">
                    <div class="inform-descr">Origem:</div>
                    <div class="inform-cliente">${this.origem}</div>
                </div>
                <div class="processo">
                    <div class="inform-descr">Destino:</div>
                    <div class="inform-cliente">${this.destino}</div>

                </div>
            </div>
        </div>
    </div>


    <div class="container_inform_2">
    <div class="continer">
    <div class="titulo-desc">Container</div>
    <div class="inform">
      <div class="lorem">${this.tipo_de_carga}</div>
    </div>
  </div>
  <div class="continer">
    <div class="titulo-desc">Inicio Previsto</div>
    <div class="inform">
      <div class="lorem">${this.data} - ${this.hora}</div>
    </div>
  </div>
  <div class="continer">
    <div class="titulo-desc">Conclusão da operação</div>
    <div class="inform">
      <div class="lorem">${this.data} </div>
    </div>
  </div>
  <div class="continer">
    <div class="titulo-desc">Follow up atual</div>
    <div class="inform">
      <div class="lorem">${this.selectedInform}</div>
    </div>
  </div>
    </div>

</div>
`;
      // Passa os dados do cadastro como parte do corpo do e-mail
      this.emailService.sendEmail(this.userEmail, registrationData, emailBody).subscribe(
        data => {
          this.toastr.success('E-mail enviado com sucesso!', 'Sucesso');
        },
        error => {
          this.toastr.error('Erro ao enviar e-mail. Por favor, tente novamente.', 'Erro');
        }
      );

      this.userEmail = ''

    } else {
      console.error('Preencha todos os campos, incluindo o status.');
    }
  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Salvar PDF



  salvarPdf() {
    this.sharedService.abrirPDF()
  }

  abrirModalpdf(isEdit = false, dadosIniciais?: DadosIniciaisFormulario) {
    const modalRef = this.modalService.open(DownloadModalComponent, { size: 'xl' });
    modalRef.componentInstance.setInitialDatas(isEdit, dadosIniciais)
  }


}
