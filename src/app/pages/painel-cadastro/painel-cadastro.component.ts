import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-painel-cadastro',
  templateUrl: './painel-cadastro.component.html',
  styleUrls: ['./painel-cadastro.component.css']
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


  constructor() {

  }

  ngOnInit(): void {
  }

}
