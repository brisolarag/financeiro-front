import { Component } from '@angular/core';
import { Resposta } from '../../models/resposta.model';
import { Entrada } from '../../models/entrada.model';
import { EntradaService } from '../../services/api/entrada.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.scss'
})
export class EntradaTesteComponent {
  resposta: Resposta<Entrada[]> | undefined;
  filtros = {
    descricao: '',
    deQuem: ''
  }

  constructor(private serviceEntrada: EntradaService, private route: Router) { }
  ngOnInit(): void {
    this.loadEntradas();
  }

  get entradas() {
    return this.resposta?.data;
  }

  private async loadEntradas(descricao?:string, deQuem?:string): Promise<void> {
    try {
      this.resposta = await this.serviceEntrada.getEntradas(undefined, descricao, deQuem);
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  }

  aplicarFiltros() {
    const descricao = this.filtros.descricao;
    const deQuem = this.filtros.deQuem;
    console.log(this.filtros);
  
    this.loadEntradas(descricao,deQuem);
  }





  goSaidas() {
    this.route.navigateByUrl("saida_teste");
  }
}
