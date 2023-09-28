import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PainelComponent } from './pages/painel/painel.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'painel',
    component: PainelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
