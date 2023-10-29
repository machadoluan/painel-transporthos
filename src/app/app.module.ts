import { NgModule } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarPopupComponent } from './pages/editar-popup/editar-popup.component';
import { DadosPainelService } from './services/dados-painel.service';
import { ClienteSelecionadoServiceService } from './services/cliente-selecionado-service.service';
import { ClienteIdService } from './services/cliente-id.service';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PainelComponent,
    PainelCadastroComponent,
    DateFormatDirective,
    CadastroPopupComponent,
    EditarPopupComponent,

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TextMaskModule,
    NgxPaginationModule,
    BrowserAnimationsModule,

  ],
  providers: [
    DadosPainelService,
    ClienteIdService,
    ClienteSelecionadoServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
