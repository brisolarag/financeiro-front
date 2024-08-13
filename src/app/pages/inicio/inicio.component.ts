import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Resposta } from '../../models/resposta.model';
import { Saida } from '../../models/saida.model';
import { SaidaService } from '../../services/api/saida.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaidaAddComponent } from '../../components/modals/saida-add/saida-add.component';
import { SaidaEditComponent } from '../../components/modals/saida-edit/saida-edit.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, CommonModule, SaidaEditComponent, SaidaAddComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
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
    this.loadSaidas();
  }

  
  get saidas() {
    return this.resposta?.data.sort((b, a) => {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });;
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
      row.classList.add('hide');
      this.resposta = await this.service.delete(id);
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
    const mes = this.filtro.mes;
    if (ano && mes) {
      this.loadSaidas()
    } else {
      this.loadSaidas();
    }
    console.log(this.filtro);
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

  adjustNubankData(data: string) {
    const newDate = new Date(data); // Cria uma nova data baseada na data original
    newDate.setMonth(newDate.getMonth() - 1); // Subtrai um mês
    return newDate;
  }
  isCheckboxChecked(checkbox: HTMLInputElement): boolean {
    return checkbox.checked;
  }


  goSaidas() {
    this.route.navigateByUrl('saidas')
  }
}
