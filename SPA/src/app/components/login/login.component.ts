import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Role } from '../../model/role.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userStatus: string | null = null;

  constructor(
                private router: Router,
                private loginService: LoginService,
                private cdr: ChangeDetectorRef
              ) {
    const userSession = this.getSession();
    if (userSession?.email == 'guest@example.com') {
      this.userStatus = 'Guest';
    } else {
      this.userStatus = userSession.email;
    }
  }

  getSession() {
    const session = localStorage.getItem('SessionUtilizadorInfo');
    return session ? JSON.parse(session) : null;
  }

  onSubmit() {
    // Handle login logic here
    console.log("Login with Email:", this.email, "and Password:", this.password);
    // Example: Update the session after successful login

    this.loginService.doLogin(this.email, this.password).subscribe(
      (response) => {
        //console.log('Login successful:', response);
        //console.log('Login successful:', response?.value);

        // Update userStatus based on the response
        this.userStatus = this.email || 'Guest';

        const sessionData = {
          username: response?.value?.username,
          loggedIn: true,
          role: response?.value?.role,
        };

        // expira quando é fechada a pagina correspondente
        sessionStorage.setItem('SessionUtilizadorInfo', JSON.stringify(sessionData));

        this.cdr.detectChanges();

        this.setJwtCookie(response?.value?.jwt);

        console.log('Cookies:', document.cookie);

        // Redirect user to the home page or dashboard
        //switch (response?.value?.role?.toUpperCase()) {
        //  case Role.Admin:
        //    this.router.navigate(['/dashboard'])

        //}
        //this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);

        // Reset userStatus or show error message
        this.userStatus = 'Login Failed';
        alert('Login failed. Please check your credentials.');
      }
    );
    // Redirect user to home page (or dashboard)
    //this.router.navigate(['/']);
  }

  onRegister() {
    // Navigate to the registration page
    this.router.navigate(['/register']);
  }

  private setJwtCookie(jwt: string | null): void {
    // Set the expiration time to 5 hours from now
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (5 * 60 * 60 * 1000));  // 5 hours in milliseconds

    // Set the JWT token in a cookie with HttpOnly, Secure, SameSite, and expiry
    document.cookie = `jwt=${jwt}; expires=${expirationDate.toUTCString()}; path=/; Secure; HttpOnly; SameSite=Strict`;
  }

  private getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift();
    return undefined;
  }
}
