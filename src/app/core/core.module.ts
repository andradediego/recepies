import { NgModule } from '@angular/core';

import { AppRoutingModule } from './../app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/share.module';
import { AuthGuard } from '../auth/auth-guard.service';
import { FirebaseCredentials } from '../firebase-credentials.service';
import { ServerLinkComponent } from '../shared/server-link.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './../shared/auth.interceptor';
import { LoginInterceptor } from './../shared/login-interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ServerLinkComponent,
    FirebaseCredentials,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {

}
