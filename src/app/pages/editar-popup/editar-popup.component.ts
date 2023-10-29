import { Component, OnInit } from '@angular/core';
import { ClienteIdService } from 'src/app/services/cliente-id.service';
import { ClienteSelecionadoServiceService } from 'src/app/services/cliente-selecionado-service.service';



@Component({
  selector: 'app-editar-popup',
  templateUrl: './editar-popup.component.html',
  styleUrls: ['./editar-popup.component.css'],
})
export class EditarPopupComponent implements OnInit {
  clienteEditado: any;



  constructor(
    private clienteSelecionadoService: ClienteSelecionadoServiceService,
    private clienteIdService: ClienteIdService
  ) {
  }


  ngOnInit() {
    this.clienteEditado = this.clienteIdService.getClienteSelecionado(); // Recupera o cliente selecionado do serviço
    console.log(this.clienteIdService.getClienteSelecionado());

  }

  // Outros métodos do seu componente...
}




