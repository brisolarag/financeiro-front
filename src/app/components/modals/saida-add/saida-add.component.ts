import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '../../datepicker/datepicker.component';
import { SaidaService } from '../../../services/api/saida.service';

@Component({
  selector: 'app-saida-add',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePickerComponent],
  templateUrl: './saida-add.component.html',
  styleUrls: ['./saida-add.component.scss'] // Corrigi o erro de digitação aqui
})
export class SaidaAddComponent {
  @Input() data!: Date;
  today: NgbDateStruct = this.getToday();

  form = {
    venc: this.today,
    pagamento: undefined as NgbDateStruct | undefined,
    valor: 0,
    descricao: '',
    isFatura: false,
    enviado: false
  };

  constructor(private modalService: NgbModal, private saidaService: SaidaService) {}

  private getToday(): NgbDateStruct {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1, 
      day: now.getDate()
    };
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  async save() {
    const venc = this.ngbToString(this.form.venc);
    const pagamento = this.ngbToString(this.form.pagamento);
    try {
      await this.criarSaida(venc!, this.form.valor, this.form.descricao, this.form.isFatura, pagamento)
      this.form.enviado = true;
      setTimeout(() => {
        this.form.enviado = false;
      }, 5000);
    } catch (ex) {
      this.form.enviado = false;
      console.log("Erro ao enviar:", ex)
    }
  }

  async criarSaida(venc: string, valor: number, descricao: string, is_fatura: boolean, pagamento: string | undefined) {
    try {
      const novaSaida = this.saidaService.novaSaida(venc,valor,descricao,is_fatura,pagamento);
    } catch (err) {
      console.error('Erro na requisicao',err);
    }
  }


  ngbDateStructToDate(ngbDate: NgbDateStruct): Date {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  private ngbToString(ngb?: NgbDateStruct): string | undefined {
    if (ngb != undefined) {
      const dia = ngb.day.toString().padStart(2, '0');
      const mes = ngb.month.toString().padStart(2, '0');
      const ano = ngb.year;
      return `${ano}-${mes}-${dia}`;
    }
    return undefined
  }

}
