import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { CadastroPopupComponent } from '../cadastro-popup/cadastro-popup.component';

@Component({
  selector: 'app-painel-cadastro',
  templateUrl: './painel-cadastro.component.html',
  styleUrls: ['./painel-cadastro.component.css'],

})
export class PainelCadastroComponent implements OnInit {

  constructor() {

  }


  abrirPopupCadastro() {
    // Especifique a URL da página do componente CadastroPopupComponent
    const url = '/cadastro';

    // Configuração da janela pop-up (tamanho, nome, etc.)
    const configuracao = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, width=1300, height=350,resizable=no';

    // Abra a janela pop-up
    window.open(url, 'CadastroPopup', configuracao);
  }



  abrirJanelaDoPainel() {
    // Especifique a URL da página do componente CadastroPopupComponent
    const token = localStorage.getItem('token');
    const url = '/listagem?token=${token}';

    // Abra uma nova guia no navegador

    window.open(url, '_blank');
  }


  ngOnInit(): void {
  }

}
