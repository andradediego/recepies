// import { Injectable } from '@angular/core';
// import { Effect, Actions } from '@ngrx/effects';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/observable/fromPromise';
// import * as firebase from 'firebase';
// import * as Rx from 'rxjs';

// import * as AuthActions from './auth.actions';

// @Injectable()
// export class AuthEffects {

//   @Effect()
//   authSignup = this.actions$
//   .ofType(AuthActions.TRY_SIGNUP)
//   .map(
//     (action: AuthActions.TrySignup) => {
//       return action.payload;
//     }
//   )
//   .switchMap(
//     (authData: {userName: string, password: string}) => {
//       const observableFromPromise = firebase.auth()
//       .createUserWithEmailAndPassword(
//         authData.userName, authData.password
//       );

//       return observableFromPromise;
//     }
//   ).switchMap(
//     () => {
//       const t = firebase.auth().currentUser.getIdToken();
//       return t;
//     }
//   )
//   .mergeMap(
//     (token: string) => {
//       return [
//         {
//           type: AuthActions.SIGNUP
//         },
//         {
//           type: AuthActions.SET_TOKEN,
//           payload: token
//         }
//       ];
//     }
//   );

//   constructor(private actions$: Actions) {}

// }
