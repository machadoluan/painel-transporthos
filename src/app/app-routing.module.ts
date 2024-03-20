import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PainelComponent } from './pages/painel/painel.component';
import { PainelCadastroComponent } from './pages/painel-cadastro/painel-cadastro.component';
import { AuthGuard } from './auth.guard';
import { CadastroPopupComponent } from './pages/cadastro-popup/cadastro-popup.component';
import { EditarPopupComponent } from './pages/editar-popup/editar-popup.component';
import { EnviarPdfComponent } from './pages/enviar-pdf/enviar-pdf.component';
import { ManutencaoComponent } from './pages/manutencao/manutencao.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ManutencaoComponent
  // },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'painel',
    component: PainelCadastroComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    component: CadastroPopupComponent, canActivate: [AuthGuard]
  },
  {
    path: 'listagem',
    component: PainelComponent, canActivate: [AuthGuard]
  },
  {
    path: 'editar',
    component: EditarPopupComponent, canActivate: [AuthGuard]
  },
  {
    path: 'enviar-pdf',
    component: EnviarPdfComponent, canActivate: [AuthGuard]
  },

  {
    path: '**', // Rota padrão
    redirectTo: '' // Redireciona para a página inicial ('home')
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
