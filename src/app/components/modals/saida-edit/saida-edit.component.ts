import { Component, Input, TemplateRef } from '@angular/core';
import { Saida } from '../../../models/saida.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private modalService: NgbModal) { }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  save() {
    // Logic to save changes
  }


}
