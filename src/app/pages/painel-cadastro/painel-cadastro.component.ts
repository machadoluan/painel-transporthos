import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { CadastroPopupComponent } from '../cadastro-popup/cadastro-popup.component';

@Component({
  selector: 'app-painel-cadastro',
  templateUrl: './painel-cadastro.component.html',
  styleUrls: ['./painel-cadastro.component.css'],

})
export class PainelCadastroComponent implements OnInit {

  formularioCadastroVisivel = false;
  cadastro: any = {};

  mostrarFormularioCadastro() {
    this.formularioCadastroVisivel = true;
  }

  enviarCadastro() {
    // Lógica para enviar o cadastro à sua API
    // Depois de enviar o cadastro, você pode redefinir o formulário e ocultá-lo
    console.log('Dados do cadastro:', this.cadastro);
    // Reinicialize o formulário após o envio
    this.formularioCadastroVisivel = false;
    this.cadastro = {};
  }


  formatDateInput() {
    let value = this.cadastro.data;
    value = value.replace(/\D/g, ''); // Remova todos os caracteres não numéricos
    if (value.length >= 2) {
      value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    this.cadastro.data = value;
  }

  constructor() {

  }


  abrirPopupCadastro() {
    // Especifique a URL da página do componente CadastroPopupComponent
    const url = '/cadastro';

    // Configuração da janela pop-up (tamanho, nome, etc.)
    const configuracao = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1300, height=350';

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
