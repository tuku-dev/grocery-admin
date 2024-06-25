import { Routes } from '@angular/router';
import { ByDateComponent } from './by-date/by-date.component';
import { ListComponent } from './list/list.component';
import { ByMonthComponent } from './by-month/by-month.component';

export const GroceryRoutes: Routes = [
  {
    path: 'grocery',
    // component: GroceryComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'by-date', component: ByDateComponent },
      { path: 'by-month', component: ByMonthComponent },
    ],
  },
];
