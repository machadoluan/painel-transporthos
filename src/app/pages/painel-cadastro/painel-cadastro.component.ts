import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CadastroPopupComponent } from '../cadastro-popup/cadastro-popup.component';
import { DataApiService } from 'src/app/services/data-api.service';
import { HttpClient } from '@angular/common/http';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-painel-cadastro',
  templateUrl: './painel-cadastro.component.html',
  styleUrls: ['./painel-cadastro.component.css'],

})
export class PainelCadastroComponent implements OnInit {

  clientes: any[] = [];
  termoDeBusca: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  alternarCores: boolean = true;




  constructor(private clienteService: DataApiService, private http: HttpClient) {


  }

  paginaAlterada(event: any): void {
    this.currentPage = event;
    this.buscarClientes(); // Atualize a lista de clientes ao mudar de página
  }


  buscarClientes() {
    const params = {
      busca: this.termoDeBusca,
      page: this.currentPage,
      pageSize: this.itemsPerPage
    };

    this.http.get<any[]>('https://transporthos-painel-backend.vercel.app/buscar', { params }).subscribe((response) => {
      this.clientes = response;
      this.totalItems = response.length; // Atualize o total de itens
      this.alternarCores = !this.alternarCores; // Alternar as cores
    });
  }




  abrirPopupCadastro() {
    // Especifique a URL da página do componente CadastroPopupComponent
    const url = '/cadastro';

    // Configuração da janela pop-up (tamanho, nome, etc.)
    const configuracao = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, width=1300, height=350,resizable=no';

    // Abra a janela pop-up
    window.open(url, 'CadastroPopup', configuracao);
  }


  abrirPopupEditarCadastro() {
    // Especifique a URL da página do componente EditarPopupComponent
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


  ngOnInit() {
    this.buscarClientes();
  }





}
