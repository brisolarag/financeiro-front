import { Component } from '@angular/core';
import { Resposta } from '../../models/resposta.model';
import { Entrada } from '../../models/entrada.model';
import { EntradaService } from '../../services/api/entrada.service';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.scss'
})
export class EntradaComponent {
  resposta: Resposta<Entrada[]> | undefined;

  constructor(private serviceEntrada: EntradaService) { }
  ngOnInit(): void {
    this.loadEntradas();
  }

  get entradas() {
    return this.resposta?.data;
  }

  private async loadEntradas(): Promise<void> {
    try {
      this.resposta = await this.serviceEntrada.getEntradas();
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }
}
