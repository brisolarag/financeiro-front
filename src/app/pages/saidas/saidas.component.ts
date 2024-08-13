import { Component, type TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Resposta } from '../../models/resposta.model';
import { Saida } from '../../models/saida.model';
import { Router } from '@angular/router';
import { SaidaService } from '../../services/api/saida.service';
import { CommonModule } from '@angular/common';
import { SaidaEditComponent } from '../../components/modals/saida-edit/saida-edit.component';
import { SaidaAddComponent } from "../../components/modals/saida-add/saida-add.component";
import type { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-saidas',
  standalone: true,
  imports: [FormsModule, CommonModule, SaidaEditComponent, SaidaAddComponent],
  templateUrl: './saidas.component.html',
  styleUrl: './saidas.component.scss'
})
export class SaidasComponent {
  // resposta api
  resposta: Resposta<Saida[]> | undefined;
  
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





  constructor(private service: SaidaService, private route: Router) { }
  ngOnInit(): void {
    this.caregarSaidas();
  }

  caregarSaidas() {
    const ano = this.filtro.ano;
    let mes = this.filtro.mes;
    if (mes != undefined) {
      mes = mes + 1;
      const mesString = mes.toString().padStart(2, '0');
      this.loadSaidas(undefined, undefined, undefined, undefined, `${ano}-${mesString}-01`);
    } else {
      this.loadSaidas();
    }
  }

  
  get saidas() {
    if (Array.isArray(this.resposta?.data)) {
      return this.resposta.data.sort((b, a) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
      });
    }
    return []; // Return an empty array if `data` is not an array
  }

  private async loadSaidas(id?: string, descricao?: string, is_fatura?: boolean, pago?: boolean, referencia?: string): Promise<void> {
    try {
      this.resposta = await this.service.getSaidas(id, descricao, is_fatura, pago, referencia);
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }
  
  
  
  async deletarSaida(id: string, row: HTMLElement) {
    try {
      this.resposta = await this.service.delete(id);
      this.caregarSaidas();
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }

  async criarSaida(venc:string, valor: number, descricao: string, isFatura: boolean, pagamento: string | undefined) {
    try {
      const novaSaida = this.service.novaSaida(venc,valor,descricao,isFatura,pagamento);
    } catch (err) {
      console.error('Erro na requisicao',err);
    }
  }

  aplicarFiltros() {
    const ano = this.filtro.ano;
    let mes = this.filtro.mes;

    if (ano != undefined && mes != undefined) {
      mes = mes + 1;
      const mesString = mes.toString().padStart(2, '0');
      this.loadSaidas(undefined, undefined, undefined, undefined, `${ano}-${mesString}-01`);
    } else {
      this.loadSaidas();
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
    return parseFloat((this.saidas?.filter(item => (item.descricao.toLowerCase().includes(algo)))
      .reduce((total, item) => total + (item.valor || 0), 0) || 0).toFixed(2));
  }
  getAll(): number {
    return parseFloat((this.saidas?.reduce((total, item) => total + (item.valor || 0), 0) || 0).toFixed(2));
  }
  
  
  
  
  adjustNubankData(data: string) {
    const newDate = new Date(data); 
    newDate.setMonth(newDate.getMonth() - 1);
    return newDate;
  }
  isCheckboxChecked(checkbox: HTMLInputElement): boolean {
    return checkbox.checked;
  }
  goHome() {
    this.route.navigateByUrl('');
  }


}
