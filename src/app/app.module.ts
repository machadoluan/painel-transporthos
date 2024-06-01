import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PainelComponent } from './pages/painel/painel.component';
import { FormsModule } from '@angular/forms';
import { PainelCadastroComponent } from './pages/painel-cadastro/painel-cadastro.component';
import { TextMaskModule } from 'angular2-text-mask';
import { DateFormatDirective } from './pages/painel-cadastro/date-format.directive';
import { CadastroPopupComponent } from './pages/cadastro-popup/cadastro-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarPopupComponent } from './pages/editar-popup/editar-popup.component';
import { DadosPainelService } from './services/dados-painel.service';
import { ClienteSelecionadoServiceService } from './services/cliente-selecionado-service.service';
import { ClienteIdService } from './services/cliente-id.service';
import { CadastroModalComponent } from './components/cadastro-modal/cadastro-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { PopUpModalComponent } from './pages/follow-up/follow-up.component';
import { EmailService } from './services/email.service';
import { DownloadModalComponent } from './download-modal/download-modal.component';
import { PdfComponent } from './pages/pdf/pdf.component';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PainelComponent,
    PainelCadastroComponent,
    DateFormatDirective,
    CadastroPopupComponent,
    EditarPopupComponent,
    CadastroModalComponent,
    PopUpModalComponent,
    DownloadModalComponent,
    PdfComponent

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TextMaskModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Tempo em milissegundos antes de fechar automaticamente
      positionClass: 'toast-top-right', // Posição da notificação (veja outras opções na documentação)
      preventDuplicates: true, // Evita notificações duplicadas
    }),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),

  ],
  providers: [
    DadosPainelService,
    ClienteIdService,
    ClienteSelecionadoServiceService,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
