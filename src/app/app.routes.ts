import { Routes } from '@angular/router';
import { UserLayoutRoutes } from './user-layout/user-layout.routes';
import { AdminLayoutRoutes } from './admin-layout/admin-layout.routes';

export const routes: Routes = [...UserLayoutRoutes, ...AdminLayoutRoutes];
