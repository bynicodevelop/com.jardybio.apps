import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JwtModule } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/overlay/notification/notification.component';
import { DomainInterceptor } from './http-interceptor';
import { AuthEffects } from './store/auth/auth.effects';
import * as fromAuth from './store/auth/auth.reducer';
import * as fromNotification from './store/notification/notification.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NotificationComponent,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string | null => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['/auth/login'],
      },
    }),
    StoreModule.forRoot(
      {
        [fromAuth.authFeatureKey]: fromAuth.reducer,
        [fromNotification.notificationFeatureKey]: fromNotification.reducer,
      },
      {}
    ),
    EffectsModule.forRoot([AuthEffects]),
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
