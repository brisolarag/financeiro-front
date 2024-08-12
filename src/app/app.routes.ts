import { Routes } from '@angular/router';
import { EntradaTesteComponent } from './testes/entrada/entrada.component';
import { SaidaTesteComponent } from './testes/saida/saida.component';
import { SaidasComponent } from './pages/saidas/saidas.component';

export const routes: Routes = 
[
  {path: 'saidas', component: SaidasComponent},


  {path: 'entrada_teste', component: EntradaTesteComponent},
  {path: 'saida_teste', component: SaidaTesteComponent}
];
