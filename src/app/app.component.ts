import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Entrada } from './models/entrada.model';
import { EntradaService } from './services/api/entrada.service';
import { Resposta } from './models/resposta.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'financeiro-front';
  resposta:Resposta<Entrada[]> | undefined;

  constructor (private serviceEntrada: EntradaService) {}
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
