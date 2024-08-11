import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Entrada } from '../../models/entrada.model';
import { Resposta } from '../../models/resposta.model';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private readonly PORT = '5016';
  private readonly default_url = `http://localhost:${this.PORT}/Entrada`;

  constructor(private http: HttpClient) { }

  async getEntradas(id?: string, descricao?: string, deQuem?:string): Promise<Resposta<Entrada[]>> {
    const url = this.urlBusca(id, descricao, deQuem);
    return await firstValueFrom(this.http.get<Resposta<Entrada[]>>(url))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao buscar entradas:', error);
        throw error;
      });
  }

  private params_id = (guidId: string): string => `id=${guidId}`;
  private params_descricao = (descricao: string): string => `descricao=${descricao}`; 
  private params_deQuem = (deQuem: string): string => `deQuem=${deQuem}`; 

  private urlBusca(id?: string, descricao?: string, deQuem?:string): string {
    let params: string[] = [];
    if (id) {
      params.push(this.params_id(id));
    }
    if (descricao) {
      params.push(this.params_descricao(descricao));
    }
    if (deQuem) {
      params.push(this.params_deQuem(deQuem));
    }
    return params.length ? `${this.default_url}?${params.join('&')}` : this.default_url;
  }
}
