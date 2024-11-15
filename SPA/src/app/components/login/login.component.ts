import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

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
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  }

  onSubmit() {
    // Handle login logic here
    console.log("Login with Email:", this.email, "and Password:", this.password);
    // Example: Update the session after successful login

    this.loginService.doLogin(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);

        // Update userStatus based on the response
        this.userStatus = this.email || 'Guest';

        const sessionData = {
          username: response?.username,
          loggedIn: true,
          role: response?.role
        };
        localStorage.setItem('SessionUtilizadorInfo', JSON.stringify(sessionData));
        console.log("Session data stored in localStorage:", JSON.parse(localStorage.getItem('session')!));
        console.log("Boas ", sessionData.username, ", ", sessionData.role);
        this.cdr.detectChanges();

        // Redirect user to the home page or dashboard
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
}
