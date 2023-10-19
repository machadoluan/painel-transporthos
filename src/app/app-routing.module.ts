import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PainelComponent } from './pages/painel/painel.component';
import { PainelCadastroComponent } from './pages/painel-cadastro/painel-cadastro.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'painel',
    component: PainelComponent
  },
  {
    path: 'cadastro',
    component: PainelCadastroComponent
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
