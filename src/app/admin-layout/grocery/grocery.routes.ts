import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { GroceryComponent } from './grocery.component';
import { AddComponent } from './add/add.component';
import { ByDateComponent } from './by-date/by-date.component';

export const GroceryRoutes: Routes = [
  {
    path: 'grocery',
    // component: GroceryComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'by-date', component: ByDateComponent },
    ],
  },
];
