import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent implements OnInit {

  items: MenuItem[] | undefined;
  endItems: MenuItem[] | undefined;
  role: string | null = null;


  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const session = this.getSession();
    this.role = session?.role || null;


    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'SubMenus',
        icon: 'pi pi-bars',
        items: [
          {
            label: 'User',
            icon: 'pi pi-angle-right',
            routerLink: '',
            visible: this.role === 'Admin'
          },
          {
            label: 'Patient',
            icon: 'pi pi-angle-right',
            routerLink: '/patient',
            visible: this.role === 'Admin'
          },
          {
            label: 'Staff',
            icon: 'pi pi-angle-right',
            routerLink: '/staff',
            visible: this.role === 'Admin'
          },
          {
            label: 'Specialization',
            icon: 'pi pi-angle-right',
            routerLink: '/specialization',
            visible: this.role === 'Admin'
          },
          {
            label: 'Operation Type',
            icon: 'pi pi-angle-right',
            routerLink: '/operationtype',
            visible: this.role === 'Admin'
          },
          {
            label: 'Operation Request',
            icon: 'pi pi-angle-right',
            routerLink: '',
            visible: this.role === 'Admin' || this.role === 'Doctor'
          },
          {
            label: 'Operation Planning',
            icon: 'pi pi-angle-right',
            routerLink: '',
            visible: this.role === 'Admin' || this.role === 'Doctor'
          },
          {
            label: '3D Room visualization',
            icon: 'pi pi-angle-right',
            routerLink: '',
            visible: this.role === 'Admin' || this.role === 'Doctor'
          },
        ].filter(item => item.visible)
      }
    ];

    this.endItems = [
      {
        label: session.username,
      },
      {
        label: 'LogOut',
        icon: 'pi pi-sign-out',
        routerLink: '',
        command: () => this.logOff()
      }
    ];

  }

  private getSession() {
    const session = sessionStorage.getItem('SessionUtilizadorInfo');
    return session ? JSON.parse(session) : null;
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
    this.router.navigate(['/']);
  }

}
