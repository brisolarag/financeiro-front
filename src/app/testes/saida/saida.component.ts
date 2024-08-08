import { Component } from '@angular/core';
import { Resposta } from '../../models/resposta.model';
import { Saida } from '../../models/saida.model';
import { SaidaService } from '../../services/api/saida.service';

@Component({
  selector: 'app-saida',
  standalone: true,
  imports: [],
  templateUrl: './saida.component.html',
  styleUrl: './saida.component.scss'
})
export class SaidaComponent {
  resposta: Resposta<Saida[]> | undefined;

  constructor(private serviceSaida: SaidaService) { }
  ngOnInit(): void {
    this.loadSaidas();
  }

  get saidas() {
    return this.resposta?.data;
  }

  private async loadSaidas(): Promise<void> {
    try {
      this.resposta = await this.serviceSaida.getSaidas();
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }
}
