import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarMenuComponent } from '../../shared/components/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
