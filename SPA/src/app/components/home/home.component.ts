import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showLogoffButton: boolean = false;
  constructor(
	private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  // Check if JWT cookie exists
  checkSession(): void {
    const jwt = this.getCookie('jwt');
    // If JWT exists, show the Logoff button
    this.showLogoffButton = jwt ? true : false;
  }

  // Get the value of a cookie by its name
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  // Logoff method
  logOff(): void {
    // Remove the JWT cookie by setting it with an expired date
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    sessionStorage.removeItem('SessionUtilizadorInfo');
    this.showLogoffButton = false; // Hide the Logoff button after logging off
    this.checkSession();
	this.router.navigate(['/']);

  }

  ngOnInit(): void {
    // Check session status when the component is initialized
    this.checkSession();
    this.cdr.detectChanges();
  }
}
