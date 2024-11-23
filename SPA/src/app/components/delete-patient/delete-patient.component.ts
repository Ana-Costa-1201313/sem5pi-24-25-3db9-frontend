import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MenubarComponent } from '../menubar/menubar.component';
import { PatientService } from '../../services/patient.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-delete-patient',
  standalone: true,
  imports: [CardModule, RouterModule, CommonModule, MenubarComponent],
  templateUrl: './delete-patient.component.html',
  styleUrl: './delete-patient.component.css'
})
export class DeletePatientComponent {
  role: string | null = null;
  showLogoffButton: boolean = false;

  constructor(
    private patientService: PatientService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    const session = this.getSession();
    this.role = session?.role || null;

    if (session == null) {
      window.location.href = "";
    }

  }

  openDeleteConfirmation(): void {
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (confirmed) {
      this.deleteAccount();
    }
  }

  deleteAccount(): void {
    const session = this.getSession();
    const email = session?.username;

    if (!email) {
      console.error('No email found in session.');
      return;
    }

    this.patientService.deletePatient_2(email).subscribe({
      next: () => {
        alert('Your account deletion request has been initiated. Please check your email to confirm.');
        this.logOff();
      },      
      error: (err) => {
        console.error('Error while deleting account:', err);
        alert('Failed to initiate account deletion. Please try again.');
      },
    });
  }

  private getSession() {
    const session = sessionStorage.getItem('SessionUtilizadorInfo');
    return session ? JSON.parse(session) : null;
  }

  logOff(): void {
    // Remove the JWT cookie by setting it with an expired date
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    sessionStorage.removeItem('SessionUtilizadorInfo');
    this.router.navigate(['/']);
  }
}
