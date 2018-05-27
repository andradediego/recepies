import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.IAppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler)
  : Observable<HttpEvent<any>> {
    console.log('Intercepted', req);
    return this.store.select('auth')
    .pipe(
      take(1),
      switchMap((authState: fromAuth.IAuthState) => {
        const copiedReq = req.clone({
          params: req.params.set('auth', authState.token)
        });
        return next.handle(copiedReq);
      }));
  }
}
