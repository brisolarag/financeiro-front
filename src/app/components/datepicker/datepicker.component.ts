import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-datepicker',
	standalone: true,
	imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe],
	templateUrl: './datepicker.component.html',
})
export class DatePickerComponent {
  @Input() model: NgbDateStruct | undefined;
  @Input() label?: string;
  @Output() modelChange = new EventEmitter<NgbDateStruct>();

  onDateSelect(date: NgbDateStruct) {
    this.model = date;
    this.modelChange.emit(date);
  }
}