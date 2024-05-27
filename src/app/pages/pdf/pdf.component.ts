import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosIniciaisFormulario } from 'src/app/types/formulario';
import { jsPDF } from "jspdf";
import { ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { ClienteIdService } from 'src/app/services/cliente-id.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

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
  cnpj: string = '';
  // ...

  clientesSelecionados: DadosIniciaisFormulario[] = [];

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void { 
  }

  setInitialDatas(isEdit: boolean, dadosClientes?: DadosIniciaisFormulario[]) {
    console.log('chegou: ', dadosClientes)
    this.isEdit = isEdit;
    this.clientesSelecionados = dadosClientes || [];
  }
  

  closeModal() {
    this.activeModal.close();
    window.location.reload();
  }


  // Salvar PDF
  salvarPdf() {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const content = this.el.nativeElement;

    html2canvas(content, { scale: 3, logging: true }).then(canvas => { // Aumentando a escala para 3
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Usando JPEG com alta qualidade (qualidade = 1.0)
      pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
      pdf.save("cliente.pdf");
    });
  }

}
