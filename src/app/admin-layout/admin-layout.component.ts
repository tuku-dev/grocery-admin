import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    DashboardComponent,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {}
