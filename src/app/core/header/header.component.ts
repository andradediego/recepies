import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.IAuthState>;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private store: Store<fromApp.IAppState>) { }

  onSaveData() {
    this.dataStorageService
      .storeRecipes()
      .subscribe(
        (response) => {
        // (response: HttpEvent<Object>) => {
          // console.log(response.type === HttpEventType.Sent);
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }
}
