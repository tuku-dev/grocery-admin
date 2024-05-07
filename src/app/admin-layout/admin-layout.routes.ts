import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { GroceryComponent } from './grocery/grocery.component';
import { GroceryRoutes } from './grocery/grocery.routes';
import { ProductRoutes } from './product/product.routes';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      ...ProductRoutes,
      ...GroceryRoutes,
    ],
  },
];
