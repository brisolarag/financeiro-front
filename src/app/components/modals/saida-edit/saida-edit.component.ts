import { Component, Input, TemplateRef } from '@angular/core';
import { Saida } from '../../../models/saida.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SaidaService } from '../../../services/api/saida.service';

@Component({
  selector: 'app-saida-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './saida-edit.component.html',
  styleUrl: './saida-edit.component.scss'
})
export class SaidaEditComponent {
  @Input() saida: Saida | undefined;
  saidaEdit = {
    descricao: false,
    valor: false,
    vencimento: false,
    pagamento: false
  }

  saidaEditValues = {
    descricao: undefined
  }
  //            venc[0]    valor[1]   desc[2]    isFatura[3]
  params:any = [undefined, undefined, undefined, undefined]


  constructor(private modalService: NgbModal, private service: SaidaService) { }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  save(venc: HTMLInputElement | undefined, valor: HTMLInputElement | undefined, desc: HTMLInputElement | undefined, is_fatura: HTMLInputElement | undefined) {
    this.checkSend(venc,valor,desc,is_fatura);
    const id = this.saida?.id;
    const vnc = this.params[0];
    const val = this.params[1];
    const dsc = this.params[2];
    const pgto = this.params[3];

    if (this.saida != undefined) {
      this.editarSaida(id!, vnc, val, dsc, pgto);
    }
  }

  async editarSaida(id:string, 
    venc: string | undefined, 
    valor: number | undefined, 
    descricao: string | undefined, 
    pagamento: string | undefined) {
    try {
      const saidaEditada = await this.service.editarSaidas(id, venc, valor, descricao, pagamento);
    } catch (err) {
      console.error('Erro na requisicao',err);
    }
  }

  // venc[0]    valor[1]   desc[2]    isFatura[3]
  checkSend(venc: HTMLInputElement | undefined, valor: HTMLInputElement | undefined, desc: HTMLInputElement | undefined, pgto: HTMLInputElement | undefined) {
    this.params[0] = this.saidaEdit.vencimento ? this.changeDatas(venc!.value) : undefined;
    this.params[1] = this.saidaEdit.valor ? valor?.value : undefined;
    this.params[2] = this.saidaEdit.descricao ? desc?.value : undefined;
    this.params[3] = this.saidaEdit.pagamento ? this.changeDatas(pgto!.value) : undefined;
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
