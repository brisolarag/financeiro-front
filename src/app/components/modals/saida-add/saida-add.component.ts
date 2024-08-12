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
    venc: this.today, // Inicializa com a data de hoje
    pagamento: undefined as NgbDateStruct | undefined,
    valor: undefined as string | undefined,
    descricao: undefined as string | undefined,
    isFatura: false
  };
  constructor(private modalService: NgbModal, private saidaService: SaidaService) {}
  private getToday(): NgbDateStruct {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1, // Months are 0-based in JavaScript Date
      day: now.getDate()
    };
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  async save() {
    await this.criarNovaSaida(this.form.venc, this.form.valor, this.form.descricao!, this.form.isFatura, this.form.pagamento);
  }

  async criarNovaSaida(venc: NgbDateStruct | undefined, valor: string | undefined, descricao: string, isFatura: boolean, pgto?: NgbDateStruct) {
    if (venc === undefined || valor === undefined || !descricao) {
      throw new Error("Campos obrigatórios não preenchidos.");
    }

    const vencimento = this.convertToDate2(venc);
    const pagamento = this.convertToDate(pgto);

    const resposta = await this.saidaService.novaSaida(vencimento, valor, descricao, isFatura, pagamento);
  }

  private convertToDate(dateStruct?: NgbDateStruct): Date | undefined {
    return dateStruct ? new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day) : undefined;
  }
  private convertToDate2(dateStruct: NgbDateStruct): Date {
    return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
  }

}
