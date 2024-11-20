import { Component, OnInit } from '@angular/core';
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


  constructor() {

  }

  ngOnInit(): void {

    const sessionData = {
      username: "email@gmail.com",
      loggedIn: true,
      role: "Admin",
    };

    sessionStorage.setItem('SessionUtilizadorInfo', JSON.stringify(sessionData));

    const session = this.getSession();
    this.role = session?.role || null;


    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ''
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
            routerLink: '',
            visible: this.role === 'Admin'
          },
          {
            label: 'Staff',
            icon: 'pi pi-angle-right',
            routerLink: 'staff',
            visible: this.role === 'Admin'
          },
          {
            label: 'Specialization',
            icon: 'pi pi-angle-right',
            routerLink: 'specialization',
            visible: this.role === 'Admin'
          },
          {
            label: 'Operation Type',
            icon: 'pi pi-angle-right',
            routerLink: 'operationtype',
            visible: this.role === 'Admin'
          },
          {
            label: 'Operation Request',
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
        routerLink: ''
      }
    ];

  }

  private getSession() {
    const session = sessionStorage.getItem('SessionUtilizadorInfo');
    return session ? JSON.parse(session) : null;
  }

}
