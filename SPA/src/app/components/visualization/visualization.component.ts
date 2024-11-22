import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-visualization',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      date: [null, Validators.required],
    });
  }

  submitForm() {
    if (this.formGroup.valid) {
      const selectedDate = this.formGroup.get('date')?.value;
      console.log('Selected Date:', selectedDate);

      window.location.href="http://localhost:4201/hospital";
    }
  }
}
