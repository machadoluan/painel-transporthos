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
import { response } from 'express';


@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})

export class PopUpModalComponent implements OnInit {


  @ViewChild('content', { static: false }) el!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  isEdit: boolean = false;

  // Propriedades para armazenar os dados do formulário
  id?: number;
  data: string = '';
  hora: string = '';
  userEmail: string = "";
  emails: string[] = [];
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
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  fullScreenImageUrl: string | null = null;
  enviandoEmails: boolean = false;
  selectedFile: File[] = [];
  clientesSelecionados: DadosIniciaisFormulario[] = [];
  inicioPrevisto: string = "";
  conclusaoOperacao: string = "";

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

  setInitialDatas(isEdit: boolean, dadosClientes?: DadosIniciaisFormulario[]) {
    console.log('chegou: ', dadosClientes)

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
    this.clientesSelecionados = dadosClientes || [];

    if (this.clientesSelecionados.length > 0) {
      const firstClient = this.clientesSelecionados[0];
      this.cliente = firstClient.cliente || '';
      this.tipo_de_carga = firstClient.tipo_de_carga || '';
      this.origem = firstClient.origem || '';
      this.cnpj = firstClient.cnpj || '';
      this.processo = firstClient.processo || '';
      this.di = firstClient.di || '';
      this.destino = firstClient.destino || '';
      this.qtd = firstClient.qtd || '';
    }

    this.clientesSelecionados = dadosClientes ? dadosClientes.map(cliente => ({
      ...cliente,
      tipo_de_carga: cliente.tipo_de_carga || '',
      inicioPrevisto: formatDate(cliente.data || ''),
      conclusaoOperacao: formatDate(cliente.data || ''),
      selectedInform: cliente.selectedInform || '',
      hora: formatHour(cliente.hora || '')
    })) : [];
  }

  closeModal() {
    this.activeModal.close()
  }

  historicoInformacoes: any[] = [];

  onFilesSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files) {
      const files = Array.from(fileInput.files);

      console.log('Arquivos selecionados:', files);

      files.forEach(file => {
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.imagePreviews.push(base64String);
        };
        reader.readAsDataURL(file);
      });
    }

    this.fileInput.nativeElement.value = '';
  }

  enviarEmail() {
    // Verifica se há e-mails inválidos
    this.emailInvalid = this.emails.some(email => !this.validateEmail(email));

    // Verifica se nenhuma opção do select está selecionada
    this.selectedInvalid = this.clientesSelecionados.some(cliente => !cliente.selectedInform);

    if (this.emails.length === 0) {
      this.toastr.error('Não tem nenhum email a quem mandar.');
      return;
    }

    // Verifica se há algum erro de validação
    if (this.emailInvalid || this.selectedInvalid) {
      this.toastr.error('Por favor, verifique os campos inválidos.');
      return;
    }
    const clientesSelecionadosData = this.clientesSelecionados.map(cliente => ({
      tipo_de_carga: cliente.tipo_de_carga,
      id: cliente.id,
      data: cliente.data,
      hora: cliente.hora,
      conclusaoOperacao: cliente.conclusaoOperacao,
      inicioPrevisto: cliente.inicioPrevisto,
      selectedInform: cliente.selectedInform
    }));

    const emailData = {
      cliente: this.cliente,
      cnpj: this.cnpj,
      processo: this.processo,
      di: this.di,
      origem: this.origem,
      destino: this.destino,
      recipientEmail: this.emails,
      imagePreviews: this.imagePreviews,
      selectedFiles: this.selectedFiles,
      clientesSelecionados: clientesSelecionadosData,
    };

    this.enviandoEmails = true;

    this.emailService.sendEmail(this.emails, emailData).subscribe(
      data => {
        this.toastr.success('E-mail enviado com sucesso!', 'Sucesso');
        this.closeModal()
        this.enviandoEmails = false;
      },
      error => {
        console.error(error)
        this.toastr.error('Erro ao enviar e-mail. Por favor, tente novamente.', 'Erro');
        this.enviandoEmails = false;
      }
    );

  }



  addEmail() {
    if (!this.validateEmail(this.userEmail)) {
      this.toastr.error('E-mail inválido. Por favor, insira um e-mail válido.');
      this.emailInvalid = true; // Atualiza a validação
      return;
    }

    if (this.emails.includes(this.userEmail)) {
      this.toastr.error('Este e-mail já foi adicionado.');
      return;
    }

    this.emails.push(this.userEmail);
    this.userEmail = ''; // Limpa o campo de entrada
    this.emailInvalid = false; // Atualiza a validação
  }


  removeEmail(email: string) {
    this.emails = this.emails.filter(e => e !== email);
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


  shortenFileName(fileName: string): string {
    const maxLength = 20; // Máximo de caracteres desejados
    if (fileName.length > maxLength) {
      const extension = fileName.split('.').pop()?.toLowerCase();
      const shortenedName = fileName.substring(0, maxLength - (extension?.length ?? 0)) + '...' + extension;
      return shortenedName;
    }

    return fileName;
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1); // Remove o arquivo do array de arquivos selecionados
    this.imagePreviews.splice(index, 1); // Remove a pré-visualização correspondente do array de pré-visualizações

    this.fileInput.nativeElement.value = '';

    console.log(this.selectedFiles.length)
  }

  openFullScreenImage(imageUrl: string): void {
    this.fullScreenImageUrl = imageUrl; // Exibe a imagem em tela cheia
  }

  closeFullScreenImage(): void {
    this.fullScreenImageUrl = null; // Fecha a imagem em tela cheia
  }

}
