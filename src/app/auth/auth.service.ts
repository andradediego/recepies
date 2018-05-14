
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private token: string;

  constructor(private route: ActivatedRoute,
    private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      reponse => console.log(reponse)
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
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => {
            this.token = token;
          }
        );
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
