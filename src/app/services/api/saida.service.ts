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

  async getSaidas(id?: string, descricao?: string, is_fatura?:boolean, pago?: boolean): Promise<Resposta<Saida[]>> {
    const url = this.urlBusca(id, descricao, is_fatura, pago);
    return await firstValueFrom(this.http.get<Resposta<Saida[]>>(url))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao buscar saidas:', error);
        throw error;
      });
  }
  async getFaturas(referencia?: Date): Promise<Resposta<Saida[]>> {
    const url = this.urlBuscaFatura(referencia);
    return await firstValueFrom(this.http.get<Resposta<Saida[]>>(url))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao buscar saidas:', error);
        throw error;
      });
  }

  async delete(id: string): Promise<Resposta<Saida[]>> {
    const url = this.urlDelete(id);
    return await firstValueFrom(this.http.delete<Resposta<Saida[]>>(url))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao deletar saida:', error);
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
    if (is_fatura != null) {
      params.push(this.params_isFatura(is_fatura));
    }
    if (pago != null) {
      params.push(this.params_pago(pago));
    }
    return params.length ? `${this.default_url}?${params.join('&')}` : this.default_url;
  }


  private urlBuscaFatura(ref?: Date) {
    let urlFatura = `${this.default_url}/Fatura`;
    if (ref) {
      const isoString = ref.toISOString();
      const encodedDate = encodeURIComponent(isoString);
      urlFatura = `${urlFatura}?referencia=${encodedDate}`;
    }
    return urlFatura;
  }

  private urlDelete(id: string) {
    return `${this.default_url}/${id}`;
  }



  // posts:

  async novaSaida(venc: Date, valor: string, descricao: string, is_fatura: boolean, pgto?: Date): Promise<Resposta<Saida[]>> {
    const url = "http://localhost:5016/Saida";
    const body = {
      data: this.parseDate2(venc),
      pagamento: this.parseDate2(pgto),
      valor: parseFloat(valor),
      descricao: descricao,
      isFatura: is_fatura
    };
    

    console.log(`url: ${url}`)
    console.log(body)
  
    return await firstValueFrom(this.http.post<Resposta<Saida[]>>(url, body))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao criar nova saída:', error);
        throw error;
      });
  }

  parseDate(ref?: Date) {
    if (ref) {
      const isoString = ref.toISOString();
      return encodeURIComponent(isoString);
    }
    return undefined
  }
  parseDate2(ref?: Date) {
    if (ref) {
      const isoString = ref.toISOString();
      return isoString;
    }
    return undefined
  }
}
