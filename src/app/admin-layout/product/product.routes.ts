import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

export const ProductRoutes: Routes = [
  {
    path: 'product',
    // component: ProductComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
    ],
  },
];
