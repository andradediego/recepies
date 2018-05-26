import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,  } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.IAppState>) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.store.select('auth').map(
        (authState: fromAuth.IAuthState) => {
          return authState.authenticated;
        }
      );
  }
}
