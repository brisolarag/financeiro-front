import { Component } from '@angular/core';
import { Resposta } from '../../models/resposta.model';
import { Saida } from '../../models/saida.model';
import { SaidaService } from '../../services/api/saida.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-saida',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './saida.component.html',
  styleUrl: './saida.component.scss'
})
export class SaidaComponent {
  resposta: Resposta<Saida[]> | undefined;
  // 0 = nao filtra
  // 1 = true
  // 2 = false
  filtros = {
    descricao: '',
    faturas: '0',
    pago: '0',
  }

  constructor(private serviceSaida: SaidaService, private route:Router) { }
  ngOnInit(): void {
    this.loadSaidas();
  }

  get saidas() {
    return this.resposta?.data.sort((b, a) => {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });;
  }

  private async loadSaidas(id?: string, descricao?: string, is_fatura?:boolean, pago?: boolean): Promise<void> {
    try {
      this.resposta = await this.serviceSaida.getSaidas(id,descricao,is_fatura,pago);
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }



  aplicarFiltros() {
    const descricao = this.filtros.descricao;
    console.log(this.filtros);
  
    let isFatura = undefined;
    let pago = undefined;

    if (this.filtros.faturas != '0') {
      isFatura = this.filtros.faturas == '1' ? true: false;
    }
    if (this.filtros.pago != '0') {
      pago = this.filtros.pago == '1' ? true : false;
    }
    
  
    this.loadSaidas(undefined, descricao, isFatura, pago);
  }
  



  goEntradas() {
    this.route.navigateByUrl("entrada");
  }
}
