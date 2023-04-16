import { inject, NgModule } from '@angular/core';
import {
  Route,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';

import { ArticleComponent } from './pages/dashboard/articles/article/article.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllProductComponent } from './pages/dashboard/products/all-product/all-product.component';
import { CreateProductComponent } from './pages/dashboard/products/create-product/create-product.component';
import { EditorComponent } from './pages/dashboard/products/editor/editor.component';
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
    children: [
      {
        path: 'products',
        component: AllProductComponent,
      },
      {
        path: 'products/create',
        component: CreateProductComponent,
      },
      {
        path: 'products/:productId',
        component: EditorComponent,
      },
      {
        path: 'products/:productId/article/:id',
        component: ArticleComponent,
      },
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
