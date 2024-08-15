import { Routes } from '@angular/router';
import { SaidasComponent } from './pages/saidas/saidas.component';
import { EntradasComponent } from './pages/entradas/entradas.component';

export const routes: Routes = 
[
  {path: 'saidas', component: SaidasComponent},
  {path: 'entradas', component: EntradasComponent},
  
  {path: '', pathMatch: 'full', redirectTo: '/inicio'},


];
