import { Component, OnInit } from '@angular/core';
import { Specialization } from '../../model/specialization.model';
import { SpecializationService } from '../../services/specialization.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateSpecialization } from '../../model/createSpecialization.model';
import { Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-specialization',
  standalone: true,
  imports: [ButtonModule, TableModule, FormsModule, ReactiveFormsModule, DialogModule, MessagesModule],
  templateUrl: './specialization.component.html',
  styleUrl: './specialization.component.css'
})
export class SpecializationComponent implements OnInit {

  specializationList: Specialization[] = [];
  showCreate = false;
  message: Message[] = [];


  createSpecializationForm: FormGroup;


  constructor(private service: SpecializationService, private fb: FormBuilder) {

    this.createSpecializationForm = this.fb.group({
      name: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    this.service.getSpecializationList().subscribe((spec) => {
      this.specializationList = spec;
    });


  }

  openCreateModal(): void {
    this.showCreate = true;
  }

  addSpecialization(): void {
    if (this.createSpecializationForm.invalid) return;

    this.showCreate = false;

    const request: CreateSpecialization = {
      ...this.createSpecializationForm.value
    };

    this.service.addSpecialization(request).subscribe({
      next: () => {
        // Success message
        this.message = [
          {
            severity: 'success',
            summary: 'Success!',
            detail: 'Your Specialization was added with success',
          },
        ];

        this.createSpecializationForm.reset();

        this.service.getSpecializationList().subscribe((spec) => {
          this.specializationList = spec;
        });
      },
      error: (error) => this.onFailure(error),
    });
  }

  onFailure(error: HttpErrorResponse): void {
    this.message = [
      {
        severity: 'error',
        summary: 'Failure!',
        detail: error.status >= 500 ? 'Server error' : error.error.message
      },
    ];
  }

}
