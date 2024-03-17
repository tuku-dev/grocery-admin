import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];
