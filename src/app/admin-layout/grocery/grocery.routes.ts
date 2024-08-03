import { Routes } from '@angular/router';
import { ByMonthComponent } from './by-month/by-month.component';
import { ListComponent } from './list/list.component';

export const GroceryRoutes: Routes = [
  {
    path: 'grocery',
    // component: GroceryComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'by-month', component: ByMonthComponent },
    ],
  },
];
