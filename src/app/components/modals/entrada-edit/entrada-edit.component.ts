import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Entrada } from '../../../models/entrada.model';
import { EntradaService } from '../../../services/api/entrada.service';

@Component({
  selector: 'app-entrada-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './entrada-edit.component.html',
  styleUrl: './entrada-edit.component.scss'
})
export class EntradaEditComponent {
  @Input() entrada: Entrada | undefined;
  entradaEdit = {
    descricao: false,
    valor: false,
    data: false
  }


  //            data[0]    valor[1]   desc[2]    
  params:any = [undefined, undefined, undefined]


  constructor(private modalService: NgbModal, private service: EntradaService) { }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  save(venc: HTMLInputElement | undefined, valor: HTMLInputElement | undefined, desc: HTMLInputElement | undefined) {
    this.checkSend(venc,valor,desc);
    const id = this.entrada?.id;
    const vnc = this.params[0];
    const val = this.params[1];
    const dsc = this.params[2];

    if (this.entrada != undefined) {
      this.editarEntrada(id!, vnc, val, dsc);
    }
  }

  async editarEntrada(id:string, 
    venc: string | undefined, 
    valor: number | undefined, 
    descricao: string | undefined) {
    try {
      const entradaEditada = await this.service.editarEntrada(id, venc, valor, descricao);
    } catch (err) {
      console.error('Erro na requisicao',err);
    }
  }

  // venc[0]    valor[1]   desc[2]    isFatura[3]
  checkSend(venc: HTMLInputElement | undefined, valor: HTMLInputElement | undefined, desc: HTMLInputElement | undefined) {
    this.params[0] = this.entradaEdit.data ? this.changeDatas(venc!.value) : undefined;
    this.params[1] = this.entradaEdit.valor ? valor?.value : undefined;
    this.params[2] = this.entradaEdit.descricao ? desc?.value : undefined;
  }


  changeDatas(dataAntes:string | undefined) : string | undefined {
    if (dataAntes) {
      const partes = dataAntes.split('/')
      const dia = partes[0].padStart(2, '0')
      const mes = partes[1].padStart(2, '0')
      const ano = partes[2]
      return `${ano}-${mes}-${dia}`;
    }
    return undefined;
  }


}
