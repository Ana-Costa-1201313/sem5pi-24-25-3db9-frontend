import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  role: string | null = null;

  constructor() {

  }

  ngOnInit(): void {

    const sessionData = {
      username: "Username",
      loggedIn: true,
      role: "Admin",
    };

    sessionStorage.setItem('SessionUtilizadorInfo', JSON.stringify(sessionData));
    const session = this.getSession();
    this.role = session?.role || null; // Extract role

  }

  private getSession() {
    const session = sessionStorage.getItem('SessionUtilizadorInfo');
    return session ? JSON.parse(session) : null;
  }


}
