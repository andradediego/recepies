
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.IAppState>) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      user => {
        console.log(user);
        this.store.dispatch(new AuthActions.SignUp());
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token));
          }
        );
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  signinUser(email: string, password: string) {
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      reponse => {
        console.log(reponse);
        this.store.dispatch(new AuthActions.SignIn());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token));
          }
        );
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}
