import { Component, type TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Resposta } from '../../models/resposta.model';
import { Saida } from '../../models/saida.model';
import { Router } from '@angular/router';
import { SaidaService } from '../../services/api/saida.service';
import { CommonModule } from '@angular/common';
import { SaidaEditComponent } from '../../components/modals/saida-edit/saida-edit.component';
import { SaidaAddComponent } from "../../components/modals/saida-add/saida-add.component";

@Component({
  selector: 'app-saidas',
  standalone: true,
  imports: [FormsModule, CommonModule, SaidaEditComponent, SaidaAddComponent],
  templateUrl: './saidas.component.html',
  styleUrl: './saidas.component.scss'
})
export class SaidasComponent {
  resposta: Resposta<Saida[]> | undefined;
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
  selectedSaida: Saida | undefined;



  constructor(private serviceSaida: SaidaService, private route: Router) { }
  ngOnInit(): void {
    this.loadSaidas(this.hoje);
  }

  get saidas() {
    return this.resposta?.data.sort((b, a) => {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });;
  }

  private async loadSaidas(referencia?: Date): Promise<void> {
    try {
      this.resposta = await this.serviceSaida.getFaturas(referencia);
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }

  aplicarFiltros() {
    const ano = this.filtro.ano;
    const mes = this.filtro.mes;
    if (ano && mes) {
      this.loadSaidas(new Date(ano, mes, 1))
    } else {
      this.loadSaidas();
    }
    console.log(this.filtro);
  }


  getAlgo(algo: string): number {
    return parseFloat((this.saidas?.filter(item => (item.descricao.toLowerCase().includes(algo)))
      .reduce((total, item) => total + (item.valor || 0), 0) || 0).toFixed(2));
  }
  getAlgoMinus(algo: string, algo2: string): number {
    return parseFloat((this.saidas?.filter(item => (!(item.descricao.toLowerCase().includes(algo)) && !(item.descricao.toLowerCase().includes(algo2))))
      .reduce((total, item) => total + (item.valor || 0), 0) || 0).toFixed(2));
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

  prevMonth() {
    if (this.filtro.mes == 0) {
      this.filtro.mes = 11;
      this.filtro.ano--;
    } else {
      this.filtro.mes--;
    }
    this.aplicarFiltros();
  }




  adjustNubankData(data: string) {
    const newDate = new Date(data); // Cria uma nova data baseada na data original
    newDate.setMonth(newDate.getMonth() - 1); // Subtrai um mês
    return newDate;
  }

  goHome() {
    console.log("ir home")
  }


  async deletarSaida(id: string, row: HTMLElement) {
    try {
      row.classList.add('hide');
      this.resposta = await this.serviceSaida.delete(id);
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }


  isCheckboxChecked(checkbox: HTMLInputElement): boolean {
    return checkbox.checked;
  }


}
