import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Resposta } from '../../models/resposta.model';
import type { Saida } from '../../models/saida.model';

@Injectable({
  providedIn: 'root'
})
export class SaidaService {
  private readonly PORT = '5016';
  private readonly default_url = `http://localhost:${this.PORT}/Saida`;

  constructor(private http: HttpClient) { }

  // http get:
  async getSaidas(id?: string, descricao?: string, is_fatura?: boolean, pago?: boolean, referencia?: string): Promise<Resposta<Saida[]>> {
    const url = this.urlBusca(id, descricao, is_fatura, pago, referencia);
    return await firstValueFrom(this.http.get<Resposta<Saida[]>>(url))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao buscar saidas:', error);
        throw error;
      });
  }

  // http delete:
  async delete(id: string): Promise<Resposta<Saida[]>> {
    const url = this.urlDelete(id);
    return await firstValueFrom(this.http.delete<Resposta<Saida[]>>(url))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao deletar saida:', error);
        throw error;
      });
  }

  // http post:
  async novaSaida(venc: string, valor: number, descricao: string, is_fatura: boolean, pagamento: string | undefined): Promise<Resposta<Saida[]>> {
    const url = this.default_url;
    const body = {
      data: venc,
      valor: Number(valor),
      descricao: descricao,
      isFatura: Boolean(is_fatura),
      pagamento: pagamento
    };

    return await firstValueFrom(this.http.post<Resposta<Saida[]>>(url, body))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao criar nova saída:', error);
        throw error;
      });
  }




  // URLS:

  // URL get
  private urlBusca(id?: string, descricao?: string, is_fatura?: boolean, pago?: boolean, referencia?: string): string {
    let params: string[] = [];
    if (id) {
      params.push(this.params_id(id));
    }
    if (descricao) {
      params.push(this.params_descricao(descricao));
    }
    if (is_fatura != null) {
      params.push(this.params_isFatura(is_fatura));
    }
    if (pago != null) {
      params.push(this.params_pago(pago));
    }
    if (referencia) {
      params.push(this.params_referencia(referencia))
    }
    return params.length ? `${this.default_url}?${params.join('&')}` : this.default_url;
  }

  // URL delete:
  private urlDelete(id: string) {
    return `${this.default_url}/${id}`;
  }


  // parametros url:
  private params_id = (guidId: string): string => `id=${guidId}`;
  private params_descricao = (de_quem: string): string => `descricao=${de_quem}`;
  private params_isFatura = (is_fatura: boolean): string => is_fatura ? `is_fatura=true` : `is_fatura=false`;
  private params_pago = (pago: boolean): string => pago ? `pago=true` : `pago=false`;
  private params_referencia = (referencia: string): string => `referencia=${referencia}`;

}
