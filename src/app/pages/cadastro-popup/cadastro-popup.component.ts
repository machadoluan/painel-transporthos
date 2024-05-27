import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-cadastro-popup',
  templateUrl: './cadastro-popup.component.html',
  styleUrls: ['./cadastro-popup.component.css']
})
export class CadastroPopupComponent {
  // Propriedades para armazenar os dados do formulário
  data: string = '';
  hora: string = '';
  cliente: string = '';
  qtd: string = '';
  di: string = '';
  dta: string = '';
  tipo_de_carga: string = '';
  processo: string = '';
  pl_cavalo: string = '';
  pl_carreta: string = '';
  motorista: string = '';
  origem: string = '';
  destino: string = '';
  ajudantes: string = '';
  conferente: string = '';
  selectedStatus: string = '';
  // ...

  constructor(private authService: AuthService, private http: HttpClient) { }

  enviarCadastro() {

    const dataSplit = this.data.split('-'); // Divide a data em ano, mês e dia
    const dd = dataSplit[2];
    const mm = dataSplit[1];
    const aaaa = dataSplit[0];
    const dataFormatada = `${dd}/${mm}/${aaaa}`;


    const data = {
      dataAbreviada: dataFormatada,
      horaAbreviada: this.hora,
      cliente: this.cliente,
      quantidade: this.qtd,
      di: this.di,
      dta: this.dta,
      tipo_de_carga: this.tipo_de_carga,
      processo: this.processo,
      pl_cavalo: this.pl_cavalo,
      pl_carreta: this.pl_carreta,
      motorista: this.motorista,
      origem: this.origem,
      destino: this.destino,
      ajudantes: this.ajudantes,
      conferente: this.conferente,
      status: this.selectedStatus
      // ...
    };

    console.log(data.dataAbreviada)
    console.log(data.horaAbreviada)

    // Faça uma solicitação HTTP POST para a API
    this.http.post('https://transporthos-painel-backend.onrender.com/clientes', data).subscribe(
      (response: any) => {
        // Lidar com a resposta da API
        console.log('Cadastro enviado com sucesso', response);
        window.alert(response.Mensagem)


        // Limpar os campos do formulário
        this.resetForm();

      },
      (error) => {
        // Lidar com erros
        console.log(error.error)
        window.alert(error.error.Mensagem)
        console.error('Erro ao enviar cadastro', error);
      }
    );
  }

  resetForm() {
    // Método para limpar os campos do formulário
    this.data = '';
    this.hora = '';
    this.cliente = '';
    this.qtd = '';
    this.di = '';
    this.dta = '';
    this.tipo_de_carga = '';
    this.processo = '';
    this.pl_cavalo = '';
    this.pl_carreta = '';
    this.motorista = '';
    this.origem = '';
    this.destino = '';
    this.ajudantes = '';
    this.conferente = '';
    this.selectedStatus = '';
  }
}

