import { Routes } from '@angular/router';
import { EntradaComponent } from './testes/entrada/entrada.component';
import { SaidaComponent } from './testes/saida/saida.component';

export const routes: Routes = 
[
  {path: 'entrada', component: EntradaComponent},
  {path: 'saida', component: SaidaComponent}
];
