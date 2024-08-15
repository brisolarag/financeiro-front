import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Resposta } from '../../models/resposta.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SaidaEditComponent } from '../../components/modals/saida-edit/saida-edit.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EntradaAddComponent } from '../../components/modals/entrada-add/entrada-add.component';
import { Entrada } from '../../models/entrada.model';
import { EntradaService } from '../../services/api/entrada.service';
import { EntradaEditComponent } from '../../components/modals/entrada-edit/entrada-edit.component';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [FormsModule, CommonModule, SaidaEditComponent, EntradaAddComponent, EntradaEditComponent],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.scss'
})
export class EntradasComponent {
  // resposta api
  resposta: Resposta<Entrada[]> | undefined;
  
  // filtros
  hoje = new Date();
  filtro = {
    mes: this.hoje.getMonth(),
    ano: this.hoje.getFullYear(),
  }
  get dataDoFiltro() {
    return new Date(this.filtro.ano,this.filtro.mes,1)
  }
  anos = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']





  constructor(private service: EntradaService, private route: Router) { }
  ngOnInit(): void {
    this.caregarEntradas();
  }

  caregarEntradas() {
    const ano = this.filtro.ano;
    let mes = this.filtro.mes;
    if (mes != undefined) {
      mes = mes + 1;
      const mesString = mes.toString().padStart(2, '0');
      //this.loadSaidas(undefined, undefined, undefined, undefined, `${ano}-${mesString}-01`);
      this.loadEntradas();
    } else {
      this.loadEntradas();
    }
  }

  
  get entradas() {
    if (Array.isArray(this.resposta?.data)) {
      return this.resposta.data.sort((b, a) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
      });
    }
    return []; // Return an empty array if `data` is not an array
  }

  private async loadEntradas(id?: string, de_quem?: string): Promise<void> {
    try {
      this.resposta = await this.service.getEntradas(id, de_quem);
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }
  
  
  
  async deletarEntrada(id: string) {
    try {
      this.resposta = await this.service.delete(id);
      this.caregarEntradas();
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }

  // async criarEntrada(venc:string, valor: number, descricao: string, isFatura: boolean, pagamento: string | undefined) {
  //   // try {
  //   //   const novaSaida = this.service.novaSaida(venc,valor,descricao,isFatura,pagamento);
  //   // } catch (err) {
  //   //   console.error('Erro na requisicao',err);
  //   // }
  // }

  aplicarFiltros() {
    const ano = this.filtro.ano;
    let mes = this.filtro.mes;

    if (ano != undefined && mes != undefined) {
      mes = mes + 1;
      const mesString = mes.toString().padStart(2, '0');
      // this.loadEntradas(undefined, undefined, undefined, undefined, `${ano}-${mesString}-01`);
      this.loadEntradas();
    } else {
      this.loadEntradas();
    }
  }

  prevMonth() {
    if (this.filtro.mes == 0) {
      this.filtro.mes = 11;
      this.filtro.ano--;
    } else {
      this.filtro.mes--;
    }
    this.aplicarFiltros();
  }
  nextMonth() {
    if (this.filtro.mes == 11) {
      this.filtro.mes = 0
      this.filtro.ano++;
    }
    else {
      this.filtro.mes++;
    }
    this.aplicarFiltros();
  }
  
  
   getAlgo(algo: string): number {
    return parseFloat((this.entradas?.filter(item => (item.deQuem.toLowerCase().includes(algo)))
      .reduce((total, item) => total + (item.valor || 0), 0) || 0).toFixed(2));
  }
  getAll(): number {
    return parseFloat((this.entradas?.reduce((total, item) => total + (item.valor || 0), 0) || 0).toFixed(2));
  }
  
  
  

  isCheckboxChecked(checkbox: HTMLInputElement): boolean {
    return checkbox.checked;
  }
  goHome() {
    this.route.navigateByUrl('');
  }


}
