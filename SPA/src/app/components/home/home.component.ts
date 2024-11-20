import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { MenubarComponent } from '../menubar/menubar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, RouterModule, CommonModule, MenubarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  role: string | null = null;

  // items: MenuItem[] | undefined;
  // endItems: MenuItem[] | undefined;

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
    this.role = session?.role || null;

    // this.items = [
    //   {
    //     label: 'Home',
    //     icon: 'pi pi-home',
    //     routerLink: ''
    //   },
    //   {
    //     label: 'SubMenus',
    //     icon: 'pi pi-bars',
    //     items: [
    //       {
    //         label: 'User',
    //         icon: 'pi pi-angle-right',
    //         routerLink: '',
    //         visible: this.role === 'Admin'
    //       },
    //       {
    //         label: 'Patient',
    //         icon: 'pi pi-angle-right',
    //         routerLink: '',
    //         visible: this.role === 'Admin'
    //       },
    //       {
    //         label: 'Staff',
    //         icon: 'pi pi-angle-right',
    //         routerLink: 'staff',
    //         visible: this.role === 'Admin'
    //       },
    //       {
    //         label: 'Specialization',
    //         icon: 'pi pi-angle-right',
    //         routerLink: 'specialization',
    //         visible: this.role === 'Admin'
    //       },
    //       {
    //         label: 'Operation Type',
    //         icon: 'pi pi-angle-right',
    //         routerLink: 'operationtype',
    //         visible: this.role === 'Admin'
    //       },
    //       {
    //         label: 'Operation Request',
    //         icon: 'pi pi-angle-right',
    //         routerLink: '',
    //         visible: this.role === 'Admin' || this.role === 'Doctor'
    //       },
    //     ].filter(item => item.visible)
    //   }
    // ];

    // this.endItems = [
    //   {
    //     label: 'LogOut',
    //     icon: 'pi pi-sign-out',
    //     routerLink: ''
    //   }
    // ];

  }

  private getSession() {
    const session = sessionStorage.getItem('SessionUtilizadorInfo');
    return session ? JSON.parse(session) : null;
  }


}
