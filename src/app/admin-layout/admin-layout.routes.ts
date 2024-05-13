import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroceryRoutes } from './grocery/grocery.routes';
import { ProductComponent } from './product/product.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductComponent },
      ...GroceryRoutes,
    ],
  },
];
