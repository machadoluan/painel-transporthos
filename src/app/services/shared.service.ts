// shared.service.ts

import { Injectable } from '@angular/core';
import { ClienteIdService } from './cliente-id.service';
import { DadosIniciaisFormulario } from 'src/app/types/formulario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DownloadModalComponent } from 'src/app/download-modal/download-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private clienteIdService: ClienteIdService, private modalService: NgbModal) { }

  abrirPDF(): void {
    const clientesSelecionados = this.clienteIdService.getClienteSelecionado();
    if (clientesSelecionados && clientesSelecionados.length > 0) {
      const clienteSelecionado = clientesSelecionados[0]; // Assuming you only need the first selected client
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
        tipoDeCarga,
        cnpj
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
        selectedStatus: status,
        cnpj
      };

      const modalRef = this.modalService.open(DownloadModalComponent, { size: 'xl' });
      modalRef.componentInstance.setInitialDatas(true, dadosIniciaisFormulario);
    }
  }

}
