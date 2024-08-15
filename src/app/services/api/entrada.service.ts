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

  // http get:
  async getEntradas(id?: string, de_quem?: string): Promise<Resposta<Entrada[]>> {
    const url = this.urlBusca(id, de_quem);
    return await firstValueFrom(this.http.get<Resposta<Entrada[]>>(url))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao buscar entradas:', error);
        throw error;
      });
  }

  // http delete:
  async delete(id: string): Promise<Resposta<Entrada[]>> {
    const url = this.urlDelete(id);
    return await firstValueFrom(this.http.delete<Resposta<Entrada[]>>(url))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao deletar entrada:', error);
        throw error;
      });
  }

  // http post:
  async novaEntrada(venc: string, valor: number, de_quem: string): Promise<Resposta<Entrada[]>> {
    const url = this.default_url;
    const body = {
      data: venc,
      valor: Number(valor),
      deQuem: de_quem
    };

    return await firstValueFrom(this.http.post<Resposta<Entrada[]>>(url, body))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao criar nova saída:', error);
        throw error;
      });
  }

  // http put:
  async editarEntrada(
          id:string, 
          venc: string | undefined, 
          valor: number | undefined, 
          de_quem: string | undefined)
          : Promise<Resposta<Entrada[]>> {
    const url = `${this.default_url}/${id}`;
    const body:any = {};
    if (venc !== undefined) {
      body.data = venc;
    }
    if (valor !== undefined) {
      body.valor = Number(valor);
    }
    if (de_quem !== undefined) {
      body.deQuem = de_quem;
    }

    return await firstValueFrom(this.http.put<Resposta<Entrada[]>>(url, body))
      .then(response => response)
      .catch(error => {
        console.error('Erro ao criar nova entrada:', error);
        throw error;
      });
  }




  // URLS:

  // URL get
  private urlBusca(id?: string, de_quem?: string): string {
    let params: string[] = [];
    if (id) {
      params.push(this.params_id(id));
    }
    if (de_quem) {
      params.push(this.params_deQuem(de_quem));
    }
    return params.length ? `${this.default_url}?${params.join('&')}` : this.default_url;
  }

  // URL delete:
  private urlDelete(id: string) {
    return `${this.default_url}/${id}`;
  }


  // parametros url:
  private params_id = (guidId: string): string => `id=${guidId}`;
  private params_deQuem = (de_quem: string): string => `de_quem=${de_quem}`;
}
