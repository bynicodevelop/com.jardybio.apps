import { inject, NgModule } from '@angular/core';
import {
  Route,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardService } from './services/auth/guard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [
      (route: Route, state: RouterStateSnapshot): boolean =>
        inject(GuardService).canActivate(route, state),
    ],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [
      (route: Route, state: RouterStateSnapshot): boolean =>
        inject(GuardService).canActivate(route, state),
    ],
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
