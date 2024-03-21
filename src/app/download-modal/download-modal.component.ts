import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosIniciaisFormulario } from 'src/app/types/formulario';
import { jsPDF } from "jspdf";
import { ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { EmailService } from 'src/app/services/email.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.css']
})
export class DownloadModalComponent implements OnInit {



  @ViewChild('content', { static: false }) el!: ElementRef

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
  // ...

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private emailService: EmailService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

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
      selectedStatus
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
  }

  closeModal() {
    this.activeModal.close()
  }

  // Salvar PDF
  salvarPdf() {

    const registrationData = {
      cliente: this.cliente,
      qtd: this.qtd,
      tipo_de_carga: this.tipo_de_carga,
      origem: this.origem,
      destino: this.destino,
      selectedStatus: this.selectedStatus,
      selectedInform: this.selectedInform,
      processo: this.processo,
    };



    const pdf = new jsPDF('p', 'pt', 'a4');

    // Seleciona o elemento que contém o conteúdo que você deseja converter
    const content = this.el.nativeElement;

    // Converte o conteúdo para um canvas
    html2canvas(content, { scale: 2 }).then(canvas => {
      // Obtém a imagem do canvas como um URL de dados
      const imgData = canvas.toDataURL('image/png');

      // Adiciona a imagem ao PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);

      // Salva o PDF
      pdf.save("cliente.pdf");
    });
  }
}
