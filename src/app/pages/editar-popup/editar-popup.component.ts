import { Component, OnInit } from '@angular/core';
import { ClienteIdService } from 'src/app/services/cliente-id.service';



@Component({
  selector: 'app-editar-popup',
  templateUrl: './editar-popup.component.html',
  styleUrls: ['./editar-popup.component.css'],
})
export class EditarPopupComponent implements OnInit {
  clienteEditado: any;



  constructor(private clienteIdService: ClienteIdService) {
    // this.clienteEditado = this.clienteIdService.getClienteSelecionado();
    // console.log('Cliente Id', this.clienteEditado);

  }


  ngOnInit() {
    setTimeout(() => {
      this.clienteEditado = this.clienteIdService.getClienteSelecionado();
      console.log('Cliente recuperado no EditarPopupComponent:', this.clienteEditado);
    }, 0);
  }

  // Outros métodos do seu componente...
}




