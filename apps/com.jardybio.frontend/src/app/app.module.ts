import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/overlay/notification/notification.component';
import { DomainInterceptor } from './http-interceptor';
import { AllProductComponent } from './pages/dashboard/products/all-product/all-product.component';
import { AuthEffects } from './store/auth/auth.effects';
import * as fromAuth from './store/auth/auth.reducer';
import * as fromNotification from './store/notification/notification.reducer';
import { ProductsEffects } from './store/products/products.effects';
import * as fromProducts from './store/products/products.reducer';

@NgModule({
  declarations: [AppComponent, AllProductComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NotificationComponent,
    StoreModule.forRoot(
      {
        [fromAuth.authFeatureKey]: fromAuth.reducer,
        [fromProducts.productsFeatureKey]: fromProducts.reducer,
        [fromNotification.notificationFeatureKey]: fromNotification.reducer,
      },
      {}
    ),
    EffectsModule.forRoot([AuthEffects, ProductsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DomainInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
