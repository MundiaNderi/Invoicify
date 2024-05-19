import { Component } from '@angular/core';
import { navbarData } from './nav-data';
import { Router } from '@angular/router';
import {  NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'invoice-sidenav',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  dashboard = "Dashboard";
  schoolsModule = "Schools"

  collapsed = false;

  navData = navbarData;

    constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
   ngOnInit(): void { } 
}
