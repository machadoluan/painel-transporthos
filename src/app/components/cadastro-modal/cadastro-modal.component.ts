import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosIniciaisFormulario } from 'src/app/types/formulario';

@Component({
  selector: 'app-cadastro-modal',
  templateUrl: './cadastro-modal.component.html',
  styleUrls: ['./cadastro-modal.component.css']
})
export class CadastroModalComponent implements OnInit {

  isEdit: boolean = false;

  // Propriedades para armazenar os dados do formulário
  id?: number;
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
  cnpj: string = '';
  // ...

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal
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
      selectedStatus,
      cnpj
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
    this.cnpj = cnpj || '';
  }

  closeModal() {
    this.activeModal.close()
  }

  enviar() {

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
      status: this.selectedStatus,
      cnpj: this.cnpj
      // ...
    };

    console.log(data.dataAbreviada)
    console.log(data.horaAbreviada)

    if (!this.isEdit) {
      // Cadastro
      this.http.post('https://transporthos-painel-backend.onrender.com/clientes', data)
        .subscribe(
          (response: any) => {
            const defaultMessage = 'Cadastro enviado com sucesso';
            console.log(defaultMessage, response);
            window.alert(response.Mensagem || defaultMessage);
            location.reload();
          },
          (error: any) => {
            const defaultMessage = 'Erro ao enviar cadastro';
            console.error(defaultMessage, error.error);
            window.alert(error.error.Mensagem || defaultMessage);
          }
        );
    } else {
      // Edição
      this.http.put(`https://transporthos-painel-backend.onrender.com/cliente/${this.id}`, data)
        .subscribe(
          (response: any) => {
            const defaultMessage = 'Alterações salvas com sucesso';
            console.log(defaultMessage, response);
            window.alert(response.Mensagem || defaultMessage);
            location.reload();
          },
          (error: any) => {
            const defaultMessage = 'Erro ao salvar alterações';
            console.error(defaultMessage, error.error);
            window.alert(error.error.Mensagem || defaultMessage);
          }
        );
    }
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
    this.cnpj = '';
  }
}
