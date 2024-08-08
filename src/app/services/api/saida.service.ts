import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import  { Entrada } from '../../models/entrada.model';
import  { Resposta } from '../../models/resposta.model';
import type { Saida } from '../../models/saida.model';

@Injectable({
  providedIn: 'root'
})
export class SaidaService {
  private readonly PORT = '5016';
  private readonly default_url = `http://localhost:${this.PORT}/Saida`;

  constructor(private http: HttpClient) { }

  async getSaidas(id?: string, de_quem?: string): Promise<Resposta<Saida[]>> {
    const url = this.urlBusca(id, de_quem);
    return await firstValueFrom(this.http.get<Resposta<Saida[]>>(url))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao buscar saidas:', error);
        throw error;
      });
  }

  private params_id = (guidId: string): string => `id=${guidId}`;
  private params_descricao = (de_quem: string): string => `descricao=${de_quem}`;
  private params_isFatura = (is_fatura: boolean): string => is_fatura ? `is_fatura=true` : `is_fatura=false`;
  private params_pago = (pago: boolean): string => pago ? `pago=true` : `pago=false`;

  private urlBusca(id?: string, descricao?: string, is_fatura?: boolean, pago?: boolean): string {
    let params: string[] = [];
    if (id) {
      params.push(this.params_id(id));
    }
    if (descricao) {
      params.push(this.params_descricao(descricao));
    }
    if (is_fatura) {
      params.push(this.params_isFatura(is_fatura));
    }
    if (pago) {
      params.push(this.params_pago(pago));
    }
    return params.length ? `${this.default_url}?${params.join('&')}` : this.default_url;
  }
}
